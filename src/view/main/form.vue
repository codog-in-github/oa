<template>
    <div class="form"
        v-loading="loading"
    >
        <form-header
            ref="header"
            @save-data="saveDataHandler"
        ></form-header>
        <div class="body">
            <div class="left">
            <form-upper
                ref="upper"
            ></form-upper>
            <form-lower
                ref="lower"
            ></form-lower>
            </div>
            <form-center
                ref="center"
            ></form-center>
            <container-detail
                ref="detail"
            />
        </div>
    </div>
</template>
<script>
import FormCenter from './form/FormCenter.vue'
import FormHeader from './form/formHeader.vue'
import FormLower from './form/formLower.vue'
import FormUpper from './form/formUpper.vue'
import ContainerDetail from './form/ContainerDetail.vue'
import { common } from '@/mixin/main'

export default {
    data(){
        return {
            loading:false,
            uploadData:{},
        }
    },
    mounted(){
        if(this.$route.params.bkg_id){
            this.setDataHandler();
        }else{
            this.$store.state.form.booker = {}
        }
    },
    methods:{
        loadinHandler(name, state){
            this.loading[name] = state;
        },
        saveDataHandler(){
            this.loading = true;
            const needUpload = [
                'header',
                'upper',
                'lower',
                'center',
                'detail',
            ];
            const saveData = {};
            for(const ref of needUpload){
                if(this.$refs[ref].getData){
                    saveData[ref] = this.$refs[ref].getData();
                    if(saveData[ref] === false){
                        this.loading = false;
                        return ;
                    }
                }
            }
            this.$saveOrder(saveData,()=>{
                this.loading = false;
                this.$notify({
                        title: 'SUCCESS',
                        message: 'SAVE SUCCESSFUL!',
                        type: 'success'
                    });
                setTimeout(() => {
                    this.$router.push(`/frame/form/${saveData.header.id}/edit`)
                }, 1000);
            });
        },
        
        setDataHandler(){
            this.loading = true;
            const needSet = [
                'header',
                'upper',
                'lower',
                'center',
                'detail',
            ];
            this.$getOrder(this.$route.params.bkg_id,({data})=>{
                for(const ref of needSet){
                    if(this.$refs[ref].setData){
                        this.$refs[ref].setData(data.data);
                    }
                }
                this.loading = false;
            });
        },
    },
    beforeRouteEnter(to, from, next){
        next(vm=>{
            vm.$store.commit('form/setBkgId',vm.$route.params.bkg_id)
            next(); 
        })
    },
    mixins:{
        common
    },
    components: { 
        FormHeader,
        FormUpper,
        FormLower,
        FormCenter,
        ContainerDetail,
    },   
}
</script>
<style scoped>
.form{
    background: #545C64;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    font-size: 13px;
    overflow: auto;
}
.header,
.upper,
.lower,
.center,
.right{
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
    flex-shrink: 0;
}
.title{
    font-weight: bold;
    font-size: 16px;
}
.header{
    height: 100px;
    flex-flow: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3px;
}
.body{
    flex-grow: 1;
    height: 1px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
}
.left{
    width: 33%;
    flex-grow: 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    margin-right: 3px;
    flex-shrink: 0;
    
}
.center{
    flex-flow: 0;
    margin-right: 3px;
}
.right{
    flex-grow: 1;
}
.upper{
    margin-bottom: 3px;
    flex-grow: 0;
}
.upper >.title{
    display: block;
}
.lower{
    flex-grow: 1;
    height: 1px;
    overflow: auto;
}
.header-left>div:nth-child(2){
    display: flex;
}
.header{
    overflow:auto;
}
.header-right,
.header-right{
    flex-shrink: 0;
}
.header-input-box > div{
    margin: 0 5px;
}
.container-input-title{
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
}
.container-input-group{
    display: flex;
    margin:  20px 0;
    align-items: center;
}
.container-input-group > *{
    margin: 0 3px;
}
</style>