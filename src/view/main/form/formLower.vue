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
        <div class="port-message">
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
.lower{
    display: flex;
    flex-flow: wrap;
    align-content: flex-start;
}
.lower > *{
    width: 100%;
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
.port-message{
    display: flex;
    justify-content: space-around;
}
.port-message > div{
    width: 45%;

}
.service-18{
    max-width: 30%;
    margin-right: 10px;
}
.vessel_name-19{
    max-width: 60%;
}
</style>
