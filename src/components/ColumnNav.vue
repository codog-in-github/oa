<template>
    <nav>
        <ul>
            <li
                v-for="(url, i) in urls"
                :key="i"
                class="shadow-card"
                :class="isFocus(url.to)?'focus':''"
                @click="linkTo(url.to)"
            >
                {{url.label}}
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    props:{
        urls:{
            default:()=>[],
        }
    },
    computed:{},
    methods:{
        linkTo(to){
            if(this.$route.path !== to){
                if(this.$route.path.indexOf('/frame/form') !== -1){
                    this.$confirm('Do you want to leave this page', 'warning', {
                        confirmButtonText: 'ok',
                        cancelButtonText: 'cancel',
                        type: 'warning'
                    }).then(() => {
                        this.$router.push(to);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: 'cancel'
                        });          
                    });
                }else{
                    this.$router.push(to);
                }
            }
        },
        isFocus(to){
            return this.$route.path.indexOf(to) != -1;
        }
    },
}
</script>
<style scoped>
li{
    background: #fff;
    cursor: pointer;
    padding: 10px;
}
li + li{
    margin-top: 10px;
}
.focus{
    color: red;
}
</style>