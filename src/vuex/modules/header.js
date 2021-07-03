export default {
    namespaced:true,
    state:{
        bkgDate: new Date(),
        bkgNo:'',
        blNo:'',
        bkgType:'',
        incoterms:'',
        bkgStaff:'',
        inSales:'',
        dg:'',
    },
    mutations:{
        setState(state, payload){
            if(payload?.key){
                state[payload.key] = payload.value;
            }
        },
    },
    actions:{
    },
};