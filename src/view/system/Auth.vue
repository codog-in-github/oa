<template>
    <div class="bg">
        <div class="container">
            <h1>
                <div class="label">权限管理</div>
                <span>
                    <label style="font-size:15px;">角色</label> 
                    <el-select v-model="currentRole">
                        <el-option v-for="(role, i) in roleList" :key="i" :value="role.id" :label="role.name"></el-option>
                    </el-select>
                </span>
            </h1>
            <main>
                <h2><div class="label">菜单</div><el-button type="primary">新增</el-button></h2>
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
                <h2><div class="label">模块</div><el-button type="primary">新增</el-button></h2>
                <el-card v-for="methods in methodList" :key="methods[0].id">
                    <template #header>
                        <div>
                            <span><el-checkbox v-model="methods[0].checked">{{methods[0].target}}</el-checkbox></span>
                        </div>
                    </template>
                    <div class="card-main"> 
                        <div v-for="method in methods" :key="method.c_id"><el-checkbox v-model="method.c_checked">{{method.c_target}}</el-checkbox></div>
                    </div>
                </el-card>
            </main>
        </div>
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
            authList:{},
        }
    },
    computed:{
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
        }
    },
    watch:{
        currentRole(roleId){
            this.currentRoleChange(roleId)
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
</style>