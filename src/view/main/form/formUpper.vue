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
import FormItemSelector from '../../../components/FormItemSelector.vue';
// import LinkSelect from '../../../components/linkSelect.vue'
// import TitleGroup from '../../../components/titleGroup.vue'

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
    data(){
        return {
            loading:true,
            configs:[],
            value:{},
        }
    },
    methods:{
        changeHandler(data,name){
            this.value[name] = data;
        },
        updatedLoadingState(state){
            this.$emit('loadingChange','upper',state);
        }
    },
    components:{
        // TitleGroup,
        // LinkSelect,
        FormItemSelector,
    }
}
</script>
<style scoped>
.upper{
    position: relative;
}
.upper > *{
    display: flex;
    align-items: flex-end;
}
</style>
