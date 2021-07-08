export const formItem = {
    data(){
        return {
            val : this.value
        }
    },
    created(){
        this.$emit('change',
            this.defaultValue() || '', 
            this.config.params_name
        );
    },
    watch:{
        value(newVal, OldVal){
            if(newVal !== OldVal){
                this.$emit('change',
                    newVal || '', 
                    this.config.params_name
                );
            }
        },
    },
};

export const doubleFormItem = {  
    data(){
        return {
            val:this.value,
            childVal:this.childValue,
        }
    },
    mounted(){
        this.$emit('change', this.val || '', this.config.params_name);
        this.$emit('change', this.ChildVal || '', this.config.child.params_name);
    },
    watch:{
        val(newVal, OldVal){
            if(newVal !== OldVal){
                this.$emit('change', newVal, this.config.params_name);
                this.childVal = '';
                if(this.asyncMethod){
                    this['$' + this.asyncMethod](newVal,({data})=>{
                        this.config.child.detail = data.data;
                    });
                }
            }
        },
        childVal(newVal, OldVal){
            if(newVal !== OldVal){
                this.$emit('change', newVal, this.config.child.params_name);
            }
        },
    },
};
import FormItemSelector from '@/components/FormItemSelector.vue';

export const formBoard = {
    
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