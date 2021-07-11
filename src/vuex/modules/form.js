// import Vue from 'vue'
export default {
    namespaced:true,
    state:{
        bkgId:null,
        containerTypeIds:[],
    },
    mutations:{
        addContainerTypeId(state,id){
            if(state.containerTypeIds.indexOf(id)===-1){
                state.containerTypeIds.push(id);
            }
        },
        removeContainerTypeId(state,id){
            let i =state.containerTypeIds.indexOf(id);
            if(i===-1){
                state.containerTypeIds.splice(i,1);
            }
        },
        clearContainerTypeId(state){
            state.containerTypeIds=[];
        },
        setBkgId(state, id){
            state.bkgId = id;
        },
    },
    actions:{
    },
};