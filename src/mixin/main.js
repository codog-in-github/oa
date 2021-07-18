import { mapState } from "vuex";

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
export const common = {
    computed:{
        ...mapState({
            name:state=>state.loginState.info.name,
            userId:state=>state.loginState.info.id,
        }),
        ...mapState('form',{
            bkgId:state=>state.bkgId,
        }),
        isNewOrder(){
            return Boolean(this.$route.params.bkg_id);
        },
    },
}
