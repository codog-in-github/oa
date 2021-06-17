<template>
    <div class="container">
        <div class="header">
            <el-menu
            default-active="1"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="/calender">calender</el-menu-item>
            <el-submenu index="2">
                <template slot="title">some moduel</template>
                <el-menu-item index="2-1">some moduel</el-menu-item>
                <el-menu-item index="2-2">some moduel</el-menu-item>
                <el-menu-item index="2-3">some moduel</el-menu-item>
            </el-submenu>
            </el-menu>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    
    methods: {
      handleSelect(key) {
        this.$router.push(key)
      }
    }
}
</script>