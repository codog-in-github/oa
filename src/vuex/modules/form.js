// import Vue from 'vue'

const emptyContainer = {
    id:0,
    container_type:'',
    quantity:'',
};

export default {
    namespaced:true,
    state:{
        bkgId:null,
        containerTypeIds:[],
        container:[],
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
        containerAddNew(state){
            state.container.push({...emptyContainer});
        },
        containerRemoveById(state, id){
            let i =state.container.indexOf(id);
            if(i !==-1){
                state.container.splice(i,1);
            }
        },
        containerRemoveByIndex(state, index){
            if(index>=0 && index < state.container.length){
                state.container.splice(index,1);
            }
        },
        containerClear(state){
            state.container.splice(0,state.container.length);
            console.log(state.container);
        },
    },
    actions:{
    },
};