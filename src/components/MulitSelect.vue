<template>
    <el-form-item label-width="250px">
        <template #label>
            <el-autocomplete v-model.lazy="data.label" @focus="getOptionsAnsyc(11, options.label)" :fetch-suggestions="querySearch" @select="({value})=>$emit('select',value)">
                <template #prepend><el-button class="el-icon-remove" style="color:red" @click="$emit('deleteCol')"></el-button></template>
            </el-autocomplete>
        </template>
        <el-input v-if="inputType === 'input'" v-model="data.value"></el-input>
        <el-input v-if="inputType === 'rate'" v-model="val">
            <template #prepend>
                <el-select v-model="currency">
                    <el-option label="$" value="USD"></el-option>
                </el-select>
            </template>
            <template #append>￥</template>
        </el-input>
    </el-form-item>
</template>
<script>
import { getOptionsAnsyc } from '@/mixin/main'

const RATE = 'RATE'

export default {
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    },
    data () {
        return {
            rate: ['JPY', ''],
            options: {
                label: { item: [], loading: false }
            }
        }
    },
    computed: {
        inputType () {
            switch (this.data.label) {
                case RATE:
                    return 'rate'
                default:
                    return 'input'
            }
        },
        currency: {
            get () {
                return this.rate[0]
            },
            set (value) {
                this.$set(this.rate, 0, value)
                this.data.value = this.rate.join('|')
            }
        },
        val: {
            get () {
                return this.rate[1]
            },
            set (value) {
                this.$set(this.rate, 1, value)
                this.data.value = this.rate.join('|')
            }
        }
    },
    mounted () {
        if (this.inputType === 'rate') {
            const tmp = this.data.value.split('|')
            this.$set(this.rate, 0, tmp[0])
            this.$set(this.rate, 1, tmp[1] || '')
        }
    },
    methods: {
        querySearch (search, cb) {
            cb(this.options.label.item)
        }
    },
    mixins: [
        getOptionsAnsyc
    ]
}
</script>
<style lang="less" scoped>
/deep/  .el-select .el-input {
    width: 130px;
}
/deep/ .input-with-select .el-input-group__prepend {
    background-color: #fff;
}
</style>
