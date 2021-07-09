<template>
    <div class="lower"
        v-loading="loading">
        <div class="title">
            船社情報
        </div>
        <form-item-selector 
            v-for="config in configs['shipper']"
            :config="config"
            :key="config.id"
            :value="value[config.params_name]"
            @change="changeHandler"
        ></form-item-selector>
        <div class="prot-message" style="align-items:flex-start;">
            <div class="loading">
                <div class="title">
                    PORT OF LOADING<br/><br/>
                </div>
                <form-item-selector 
                    v-for="config in configs['port_of_loading']"
                    :config="config"
                    :key="config.id"
                    :value="value[config.params_name]"
                    @change="changeHandler"
                ></form-item-selector>
            </div>
            <div class="delivery">
                <div class="title">
                    PORT OF DELIVERY<br/><br/>
                </div>
                
                <form-item-selector 
                    v-for="config in configs['port_of_delovery']"
                    :config="config"
                    :key="config.id"
                    :value="value[config.params_name]"
                    @change="changeHandler"
                ></form-item-selector>
                </div>
        </div>
    </div>
</template>
<script>
// import TitleGroup from '../../../components/titleGroup.vue'
import { formBoard } from '@/mixin/main.js'

export default{ 
    created(){
        this.$shipperConfig(({data})=>{
            this.configs = data.data;
            this.loading = false
        })
    },
    computed:{
    },
    mixins:[
        formBoard,
    ],
}
</script>
<style scoped>
.lower > *{
    display: flex;
}
.loading{
    background: red;
    color: #fff;
    padding: 10px;
}
.delivery{
    background: lightblue;
    color: #000;
    padding: 10px;
}
.loading > div,
.delivery > div{
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
}
.loading > div >*,
.delivery > div >*{
    margin: 0 2px;
}
</style>
