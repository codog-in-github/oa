<template>
    <nav class="column-nav">
        <ul>
            <div
                v-for="(url, i) in urls"
                :key="i"
                :class="url.toggle?'grow':'shrink'"
            >
                <li
                    :class="(isFocus(url.to)?'focus':'normal') + ` ${url.class || ''}`"
                    @click="linkTo(url)"
                >
                    {{url.label}}
                </li>
                <div v-if="url.child" class="child" >
                    <li v-for="(child, i) in url.child"
                        :key="i"
                        :class="(isFocus(child.to)?'focus':'normal') + ` ${child.class || ''}`"
                        @click.stop="linkTo(child)"
                    >
                        {{child.label}}
                    </li>
                </div>
            </div>
            
                
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
        linkTo(url){
            const { to, child } = url;
            if(child){
                url.toggle = !url.toggle;
            }
            else if(this.$route.path !== to){
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
.column-nav li{
    display: block;
}
li{
    font-size: 14px;
    width: 100%;
    height: 50px;
    color: #FFFFFF;
    background: #313131;
    cursor: pointer;
    line-height: 50px;
    padding-left: 57px;
    box-sizing: border-box;
    position: relative;
}
ul>div +div,
li+li{
    border-top: #343434 1px solid;
}
li[class*="el-icon"]{
    padding-left: 40px;
}
.shrink >li:hover,
li:hover{
    background: #1B1B1B;
    color: #fff;
}
.focus{
    position: relative;
    background: #1B1B1B;
}
.focus::after{
    content: "";
    display: block;
    position:absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 4px;
    background: #2390FF;
    
}
.normal{   

}
.grow{
    /* max-height: 200px; */
}
.shrink >li {
    background: #434343;
}
.shrink .child li{
    height: 0;
}
.child li{
    overflow:hidden;
    transition: height .3s;
}
</style>