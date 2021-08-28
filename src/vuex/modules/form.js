// import Vue from 'vue'
import { getRandomID } from "@/assets/js/utils";

const emptyContainer = {
    id:0,
    common:'',
    container_type:'',
    quantity:'',
    delete_at:''
};

export default {
    namespaced:true,
    state:{
        bkgId:null,
        container:[],
        common:'',
        booker:{},
    },
    mutations:{
        setBkgId(state, id){
            state.bkgId = id || getRandomID();
        },
        containerAddNew(state){
            const newContainer = {...emptyContainer};
            newContainer.id = getRandomID();
            state.container.push(newContainer);
        },
        containerRemoveByIndex(state, index){
            if(index>=0 && index < state.container.length){
                state.container[index].delete_at = 'del'
            }
        }, 
        containerClear(state){
            state.container.splice(0,state.container.length);
        },
        containerPushArray(state,arr){
            const newContainer = {...emptyContainer};
            newContainer.id = getRandomID();
            state.container.push(...arr);
        },
    },
    actions:{
    },
};