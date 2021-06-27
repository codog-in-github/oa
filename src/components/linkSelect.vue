<template>
    <div class="link">
        <slot name="father">
            <title-group :title="fatherName">
                <el-select
                    :size="size"
                    v-model="fatherValue"
                    @change="childValue=''"
                >
                    <el-option 
                        v-for="option in fatherOptions"
                        :key="option.id || Symbel(0)"
                        :label="option.label"
                        :value="option.value"
                    >
                    </el-option>
                </el-select>
            </title-group>
        </slot>
        <slot name="center">
            <span>/</span>
        </slot>
        <slot name="child">
            <title-group :title="childName">
                <el-select
                    :size="size"
                    v-model="childValue"
                >
                    <el-option 
                        v-for="option in childOptions"
                        :key="option.id || Symbel(0)"
                        :label="option.label"
                        :value="option.value"
                    >
                    </el-option>
                </el-select>
            </title-group>
        </slot>
    </div>
</template>
<script>
import TitleGroup from './titleGroup.vue';
export default {
    props:{
        fatherName:{
            default:'father',
        },
        childName:{
            default:'child',
        },
        options:{
            default:()=>[],
        },
        size:{
            default:'mini',
        },
    },
    computed:{
        fatherOptions(){
            return this.options.filter(i=>i.pid=='');
        },
        childOptions(){
            if(this.fatherValue == '') return [];
            return this.options.filter(i=>i.pid === this.fatherValue);
        }
    },
    data(){
        return {
            childValue:'',
            fatherValue:'',
        }
    },
    components: {  
        TitleGroup,
    },


}
</script>
<style scoped>
.link{
    display: flex;
    width: 100%;
    align-items: flex-end;
}
</style>