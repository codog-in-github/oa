import { hsAdd, hsUpload } from '@/api/main'
import { pick } from '@/utils/Picker'
import { uploadSingle } from '@/utils/upload'
const configForm = {
    sheets: {
        name: 'el-checkbox-group',
        label: '需填充工作表',
        children: [],
        default: []
    },
    emptyOnly: {
        name: 'el-radio-group',
        label: '仅填充空单元格',
        children: [
            { label: '是', value: 1 },
            { label: '否', value: 0 }
        ],
        default: 1
    }
}
/**
 * @type {import('vue/types').ComponentOptions}
 */
export default {
    data () {
        return {
            description: '',
            hs: '',
            loading: false
        }
    },
    methods: {
        async upload () {
            try {
                const file = await uploadSingle()
                this.loading = true
                const ext = file.name.split('.').at(-1)
                if(['xls', 'xlsx'].includes(ext)){
                    const rep = await hsUpload(file)
                    if(!rep || rep.length === 0) {
                        this.$message.error('no sheet in this excel')
                        throw new Error()
                    }
                    const options = rep.map((name, i) => ({ label: name, value: i }))
                    const defaultVal = []
                    rep.forEach((name, i) => {
                        if(/[Hh][Ss]/.test(name)) {
                            defaultVal.push(i)
                        }
                    });
                    configForm.sheets.children = options
                    configForm.sheets.default = defaultVal
                    const data = await pick(configForm)
                    const fileName = await hsUpload(file, data)
                    window.location.href = '/Oa/Assets/onceExcel?name=' + fileName
                } else {
                    this.$message.error('Please upload excel file. ')
                }
            } catch (error) {
                console.log('error', error);
            } finally {
                this.loading = false
            }
        },
        async add () {
            if(!this.description || !this.hs) {
                throw new Error()
            }
            await hsAdd(this.description, this.hs)
            this.clear()
            this.$message.success('add success')
        },
        clear () {
            this.description = ''
            this.hs = ''
        }
    },
    render () {
        return <div>
            <ElButton type="primary" onClick={this.upload} loading={this.loading}>upload</ElButton>
            <ElForm labelWidth="180px">
                <ElFormItem label="Description">
                    <ElInput value={this.description} onInput={val => this.description = val}></ElInput>
                </ElFormItem>
                <ElFormItem label="HS">
                    <ElInput value={this.hs} onInput={val => this.hs = val}></ElInput>
                </ElFormItem>
            </ElForm>
            <ElButton type="primary" onClick={this.add}>add</ElButton>
            <ElButton onClick={this.clear}>clear</ElButton>
        </div>
    }
}
