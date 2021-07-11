<template>
    <div class="detail">
        <div class="flag">1</div>
        <div class="inputs">
            <form-item-selector 
                v-for="config in detailConfigs"
                :config="config"
                :key="config.id"
                :value="value[config.params_name]"
                @change="changeHandler"
            ></form-item-selector>
        </div>
        <div class="buttons">
            <el-button
                v-if="isEdited"
                type="success" 
                size="mini"
            >SAVE</el-button>
            <el-button 
                type="primary" 
                size="mini"
                @click="$emit('add')"
            >ADD</el-button>
            <el-button 
                type="primary" 
                size="mini"
                @click="$emit('copy',detailId)"
            >COPY</el-button>
            <el-button type="danger" size="mini">DEL</el-button>
        </div>
    </div>
</template>
<script>
import {formBoard} from '@/mixin/main';
export default {
    props:[
        'detailConfigs',
        'detailId'
    ],
    mixins:[
        formBoard,
    ]
}
</script>
<style scoped>
.detail{
    display: flex;
    justify-content: space-around;
    border: solid #000 1px;
}
.detail+.detail{
    margin-top: 4px;
}
.flag{
    flex: 0 0 2em;    
}
.inputs{
    width: 1px;
    flex: 1 1 10px;
    display: flex;
    flex-flow: wrap;
}
.inputs>div{
    width: 10em;
    flex: 0 0 auto;
}
.vanning_during-48{
    width: auto !important;
}
.buttons{
    display: flex;
    flex-flow: column;
    flex: 0 0  4em;
    align-items:inherit;
    justify-content: space-between;
}
.buttons>*{
    margin-left: 0;
}
</style>