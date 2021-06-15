<template>
    <el-input
            v-model="data[index][col]"
            @blur="$emit('blur')"
            v-focus="{
                isFocus:index + '_' + col_id  == editCell,
                type,
            }"
            />
</template>
<script>

export default {
    props:['data', 'type','col_id','editCell','index','col'],
    
    directives:{
        focus(el, {value}){
            // console.log(el.getElementsByTagName('input'));
            if(value.isFocus 
                && [
                    'text',
                ].indexOf(value.type) !== -1
            ) 
                el.getElementsByTagName('input')[0].focus();
        
        },
    },
}
</script>