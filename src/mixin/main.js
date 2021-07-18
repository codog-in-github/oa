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
