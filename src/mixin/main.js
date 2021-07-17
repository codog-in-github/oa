export const formItem = {
    data(){
        return {
            val : '',
        }
    },
    created(){
        this.val = this.defaultValue || '';
    },
    watch:{
        val(newVal, OldVal){
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
            childLoading:false,
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
                    //异步请求二级联动选项
                    this.childLoading = true;
                    this['$' + this.asyncMethod](
                        newVal,
                        ({data})=>{
                            this.config.child.detail = data.data;
                            this.childLoading= false;
                        }
                    );
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
            isEdited:false,
        }
    },
    methods:{
        changeHandler(data,name){
            this.value[name] = data;
            this.isEdited = true;
        },
        getUploadData(){
            return {
                
            };
        }
    },
    components:{
        FormItemSelector,
    }
}

export const getOptionsAnsyc = {
    methods:{
        getOptionsAnsyc(selectId , options, pid){
            if(options.loaded !== true){
                options.loaded = true;
                this.$getOptions(selectId, options, pid);
            }
        },
    }
}