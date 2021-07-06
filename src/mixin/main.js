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
            }
        },
        childVal(newVal, OldVal){
            if(newVal !== OldVal){
                this.$emit('change', newVal, this.config.child.params_name);
            }
        },
    },
};