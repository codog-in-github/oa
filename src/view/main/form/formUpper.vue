<template>
   <div class="upper" v-loading="loading"> 
       <div class="title">取引業者情報</div>
        <div class="header-input-box">
            <form-item-selector 
                v-for="config in configs"
                :config="config"
                :key="config.id"
                :value="value[config.params_name]"
                @change="changeHandler"
            ></form-item-selector>
        </div>
    </div>
</template>
<script>
import { formBoard } from '@/mixin/main.js';

export default{ 
    created(){
        this.loading = true;
        this.$traderConfig(({data})=>{
            this.configs = data.data;
            this.loading = false;
        });
    },
    updated(){
    },
    computed:{
    },
    mixins:[
        formBoard,
    ],
}
</script>
<style scoped>
.upper{
    position: relative;
}
</style>
