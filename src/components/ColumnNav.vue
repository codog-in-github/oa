<template>
    <nav class="column-nav">
        <ul>
            <div
                v-for="(url, i) in urls"
                :key="i"
            >
                <li
                    class="shadow-card"
                    :class="(isFocus(url.to)?'focus':'normal') + ` ${url.class || ''}`"
                    @click="linkTo(url)"
                >
                    {{url.label}}
                </li>
                <div v-if="url.child" class="child" :style="url.toggle?'max-height:300px;':''">
                    <li v-for="(child, i) in url.child"
                        :key="i"
                        class="shadow-card"
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
    background: #fff;
    cursor: pointer;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    transition:  background .2s,color .2s;
}
li:hover{
    background: #409EFF;
    color: #fff;
}
li + li{
    margin-top: 10px;
}
.focus{
    color: red;
}
.normal{
    color: black;
}
.child{
    margin-top: .5em;
    max-height: 0;
    overflow:hidden;
    transition: max-height .5s;
    padding: 0 .5em;
}
</style>