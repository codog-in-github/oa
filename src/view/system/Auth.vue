<template>
    <div class="bg">
        <div class="container">
            <h1>
                <div class="label">权限管理</div>
                <span>
                    <label style="font-size:15px;">角色</label>
                    <el-select v-model="currentRole" @change="currentRoleChange">
                        <el-option v-for="(role, i) in roleList" :key="i" :value="role.id" :label="role.name"></el-option>
                    </el-select>
                    <el-button v-show="currentRole" type="primary" class="el-icon-ice-tea" @click="changeRoleAuth">保存</el-button>
                </span>
            </h1>
            <main>
                <!-- 菜单权限列表 start -->
                <h2>
                    <div class="label">菜单</div><el-button type="success" class="el-icon-food" @click="openDialog('0')">新增</el-button>
                </h2>
                <el-card v-for="menus in menuList" :key="menus[0].id">
                    <template #header>
                        <div>
                            <el-checkbox v-model="menus[0].checked"><span :class="menus[0].extra.split('|')[1]">{{menus[0].extra.split('|')[0]}}</span></el-checkbox>
                        </div>
                    </template>
                    <div class="card-main">
                        <div v-for="menu in menus" :key="menu.c_id"><el-checkbox v-model="menu.c_checked">{{menu.c_extra}}</el-checkbox></div>
                    </div>
                </el-card>
                <!-- 菜单权限列表 end -->
                <!-- 模块权限列表 start -->
                <h2>
                    <div class="label">接口</div>
                    <el-button type="success" class="el-icon-grape" @click="openDialog('1')">新增</el-button>
                </h2>
                <el-card v-for="methods in methodList" :key="methods[0].id">
                    <template #header>
                        <div>
                            <span><el-checkbox v-model="methods[0].checked">{{methods[0].extra}}</el-checkbox></span>
                        </div>
                    </template>
                    <div class="card-main">
                        <div v-for="method in methods" :key="method.c_id"><el-checkbox v-model="method.c_checked">{{method.c_extra}}</el-checkbox></div>
                    </div>
                </el-card>
                <!-- 模块权限列表 end -->
            </main>
        </div>
        <!-- 新增权限对话框 start -->
        <el-dialog :visible="addDialog.visible" @close="addDialog.visible = false" :title="'新增' + addTypeName" :close-on-click-modal="false">
            <el-form label-width="12em">
                <el-form-item :label="'创建新的父级'+addTypeName">
                    <el-switch v-model="addDialog.addParent" @change="clearParent" />
                </el-form-item>
                <el-form-item v-if="addDialog.addParent" :label="'父' + addTypeName + '显示名称'">
                    <el-input v-model="addDialog.data.parent.extra"></el-input>
                </el-form-item>
                <el-form-item v-if="addDialog.addParent" :label="'父' + addTypeName + '地址'">
                    <el-input v-model="addDialog.data.parent.target"></el-input>
                </el-form-item>
                <el-form-item v-else :label="'请选择父级'+addTypeName">
                    <el-select v-model="addDialog.data.parent.id">
                        <el-option v-for="opt in addDialog.options" :key="opt.id" :value="opt.id" :label="opt.extra"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="'子' + addTypeName + '显示名称'">
                    <el-input v-model="addDialog.data.child.extra"></el-input>
                </el-form-item>
                <el-form-item :label="'子' + addTypeName + '地址'">
                    <el-input v-model="addDialog.data.child.target"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="addMenu" type="primary">添加</el-button>
                <el-button @click="addDialog.visible = false">取消</el-button>
            </template>
        </el-dialog>
        <!-- 新增权限对话框 end -->
    </div>
</template>

<script>
import { debounce, objectToArray } from '@/utils'
import { addMenu, changeRoleAuth, getAuthList, getParentAuth, getRoleAuthList, getRoleList } from '@/api/main'
export default {
    data () {
        return {
            currentRole: '',
            roleList: [],
            methodList: [],
            menuList: [],
            addDialog: {
                visible: false,
                loading: false,
                type: '1',
                addParent: false,
                options: [],
                data: {
                    parent: {
                        id: '',
                        target: '',
                        extra: ''
                    },
                    child: {
                        target: '',
                        extra: ''
                    }
                }
            }

        }
    },

    computed: {
        addTypeName () {
            return ['菜单', '接口'][this.addDialog.type]
        }
    },

    mounted () {
        getRoleList().then(roleList => { this.roleList = roleList })
        getAuthList().then(authList => {
            this.methodList = objectToArray(authList.method_list).map(
                item => item.map(
                    i => ({
                        ...i,
                        checked: false,
                        c_checked: false
                    })
                )
            )
            this.menuList = objectToArray(authList.menu_list).map(
                item => item.map(
                    i => ({
                        ...i,
                        checked: false,
                        c_checked: false
                    })
                )
            )
        })
        // 防抖函数包装
        this.currentRoleChange = debounce(this.currentRoleChange, this)
    },
    methods: {
        async currentRoleChange (currentRole) {
            try {
                const authList = await getRoleAuthList(currentRole)
                for (const group of this.methodList) {
                    for (const i of group) {
                        i.checked = authList.indexOf(i.id) !== -1
                        i.c_checked = authList.indexOf(i.c_id) !== -1
                    }
                }
                for (const group of this.menuList) {
                    for (const i of group) {
                        i.checked = authList.indexOf(i.id) !== -1
                        i.c_checked = authList.indexOf(i.c_id) !== -1
                    }
                }
            } catch (error) {
                console.log('currentRoleChange error :', error)
            }
        },

        async openDialog (type) {
            try {
                this.addDialog.type = type
                this.addDialog.visible = true
                this.addDialog.loading = true
                const authList = await getParentAuth(type)
                this.addDialog.options = authList
            } catch (error) {
            }
        },

        clearParent () {
            this.addDialog.data.parent.target = ''
            this.addDialog.data.parent.id = ''
            this.addDialog.data.parent.extra = ''
        },

        async addMenu () {
            try {
                this.addDialog.visible = false
                const type = this.addDialog.type
                const parent = this.addDialog.data.parent
                const child = this.addDialog.data.child
                const varName = ['menuList', 'methodList'][type]
                const params = {
                    type,
                    parent,
                    child
                }
                const [pid, id] = await addMenu(params)
                const p = this[varName].filter(item => item[0].id === pid)
                if (p.length > 0) {
                    p[0].push({
                        ...p[0][0],
                        c_id: id,
                        c_target: child.target,
                        c_extra: child.extra,
                        c_checked: false
                    })
                } else {
                    this[varName].push([{
                        ...parent,
                        id,
                        checked: false,
                        c_id: id,
                        c_target: child.target,
                        c_extra: child.extra,
                        c_checked: false
                    }])
                }
            } catch (error) {
            }
        },

        async changeRoleAuth () {
            const ids = []
            for (const group of this.menuList) {
                group[0].checked && ids.push(group[0].id)
                for (const child of group) {
                    child.c_checked && ids.push(child.c_id)
                }
            }
            for (const group of this.methodList) {
                group[0].checked && ids.push(group[0].id)
                for (const child of group) {
                    child.c_checked && ids.push(child.c_id)
                }
            }
            try {
                await changeRoleAuth({
                    role_id: this.currentRole,
                    ids: ids.join(',')
                })
                this.$message.success('修改成功')
            } catch (error) {
            }
        }
    }

}
</script>

<style lang="less" scope>
@import '../../assets/css/common.less';

.card-main{
    display: flex;
    flex-flow: wrap row;

    & > *{
        padding: 0.5em;
    }
}

.el-input{
    width: auto;
}

.el-button[class*="el-icon"] span{
    margin-left: .3em;
}
</style>
