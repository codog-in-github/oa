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
                            <el-checkbox><span :class="menus[0].extra.split('|')[1]">{{menus[0].extra.split('|')[0]}}</span></el-checkbox>
                        </div>
                    </template>
                    <div class="card-main">
                        <div v-for="menu in menus" :key="menu.c_id"><el-checkbox>{{menu.c_extra}}</el-checkbox></div>
                    </div>
                </el-card>
                <h2><div class="label">模块</div><el-button type="primary">新增</el-button></h2>
                <el-card v-for="methods in methodList" :key="methods[0].id">
                    <template #header>
                        <div>
                            <span><el-checkbox>{{methods[0].target}}</el-checkbox></span>
                        </div>
                    </template>
                    <div class="card-main">
                        <div v-for="method in methods" :key="method.c_id"><el-checkbox>{{method.c_target}}</el-checkbox></div>
                    </div>
                </el-card>
            </main>
        </div>
    </div>
</template>

<script>
import { objectToArray } from '@/assets/js/utils'
export default {
    data(){
        return {
            currentRole:'',
            roleList:[],
            methodList:[],
            menuList:[]
        }
    },
    mounted(){
        this.$getRoleList( roleList => {
            this.roleList = roleList.data.data
        })
        this.$getAuthList( authList => {
            this.methodList = objectToArray(authList.data.data.method_list)
            this.menuList = objectToArray(authList.data.data.menu_list)

            console.log('this.methodList ', this.methodList)
            console.log('this.menuList ', this.menuList)
        })
    }
}
</script>

<style lang="less" scope>
@import '../../assets/css/common.less';

.card-main{
    display: flex;
    flex-flow: wrap row;

    &>*{
        padding: 0.5em;
    }
}
</style>