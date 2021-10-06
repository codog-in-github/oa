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
                </span>
            </h1>
            <main>
                <!-- 菜单权限列表 start -->
                <h2><div class="label">菜单</div><el-button type="primary" @click="openDialog('0')">新增</el-button></h2>
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
                <h2><div class="label">模块</div><el-button type="primary" @click="openDialog('1')">新增</el-button></h2>
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
        <el-dialog :visible="addDialog.visible" @close="addDialog.visible = false" :title="'新增' + addTypeName">
            <el-form label-width="12em">
                <el-form-item :label="'创建新的父级'+addTypeName">
                    <el-switch v-model="addDialog.addParent" />
                </el-form-item>
                <el-form-item v-if="addDialog.addParent" :label="'父' + addTypeName + '显示名称'">
                    <el-input v-model="addDialog.data.parentExtra"></el-input>
                </el-form-item>
                <el-form-item v-if="addDialog.addParent" :label="'父' + addTypeName + '地址'">
                    <el-input v-model="addDialog.data.parentTarge"></el-input>
                </el-form-item>
                <el-form-item v-else :label="'请选择父级'+addTypeName">
                    <el-select v-model="addDialog.data.parentId">
                        <el-option v-for="opt in addDialog.options" :key="opt.id" :value="opt.id" :label="opt.extra"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="'子' + addTypeName + '显示名称'">
                    <el-input v-model="addDialog.data.childExtra"></el-input>
                </el-form-item>
                <el-form-item :label="'子' + addTypeName + '地址'">
                    <el-input v-model="addDialog.data.childTarge"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 新增权限对话框 end -->
    </div>
</template>

<script>
import { debounce, objectToArray } from '@/assets/js/utils'
export default {
    data(){
        return {
            currentRole:'',
            roleList:[],
            methodList:[],
            menuList:[],
            addDialog:{
                visible: false,
                loading: false,
                type: '1',
                addParent:false,
                options:[],
                data:{
                    parentId:'',
                    parentTarge:'',
                    parentExtra:'',
                    childTarge:'',
                    childExtra:'',
                }
            },

        }
    },
    computed:{
        addTypeName(){
            return ['菜单', '模块/方法'][this.addDialog.type]
        }
    },
    mounted(){
        this.$getRoleList( roleList => {
            this.roleList = roleList.data.data
        })
        this.$getAuthList( authList => {
            this.methodList = objectToArray(authList.data.data.method_list).map(
                item=>item.map(
                    i=>({
                        ...i,
                        checked:false, 
                        c_checked:false,
                    })
                )
            )
            this.menuList = objectToArray(authList.data.data.menu_list).map(
                item=>item.map(
                    i=>({
                        ...i,
                        checked:false,
                        c_checked:false,
                    })
                )
            )
        })
        // 防抖函数包装
        this.currentRoleChange = debounce(this.currentRoleChange, this) 
    },
    methods:{
        currentRoleChange(roleId){
            this.$getRoleAuth(roleId, authList => {
                for(const group of this.methodList){
                    for(const i of group){
                        i.checked =  authList.data.data.indexOf(i.id) !== -1
                        i.c_checked = authList.data.data.indexOf(i.c_id) !== -1
                    }
                }
                for(const group of this.menuList){
                    for(const i of group){
                        i.checked = authList.data.data.indexOf(i.id) !== -1
                        i.c_checked = authList.data.data.indexOf(i.c_id) !== -1
                    }
                }
            })
        },
        openDialog(type){
            this.addDialog.type = type
            this.addDialog.visible = true
            this.addDialog.loading = true
            this.$getParentAuth(type, authList => {
                this.addDialog.loading = false
                this.addDialog.options = authList.data.data
            });
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
</style>