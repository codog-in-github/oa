<template>
    <div>
        <span
            v-show="index + '_' + col_id != editCell"
            >
            {{displayVal}}
        </span>
        <component 
            :is="comp"
            v-show="index + '_' + col_id == editCell" 
            :type="type"
            :detail="detail"
            :col_id="col_id"
            :index="index"
            :col="col"
            :data="data"
            :editCell="editCell"
            @blur="$emit('blur')"
            >
        </component>
    </div>
</template>
<script>
export default {
    props:['data', 'type','col_id','editCell','index','col','detail'],
    data(){
        let comp;
        switch(this.type){
            case 'select':
                comp = ()=>import('./multiInput/select');
                break;
            default:
                comp = ()=>import('./multiInput/input');
                break;
        }
        return {
            comp,
        }
    },
    computed:{
        displayVal(){
            switch(this.type){
                case 'select':
                    return this.detail[this.data[this.index][this.col]]=== undefined ? '' : this.detail[this.data[this.index][this.col]].opt;
                default:
                    return this.data[this.index][this.col];
            }
        }
    },
    methods:{
        
    },
    directives:{
        focus(el, {value}){
            // console.log(el.getElementsByTagName('input'));
            if(value.isFocus 
                && [
                    'text',
                    'number',
                    'option',
                ].indexOf(value.type) !== -1
            ) 
                el.getElementsByTagName('input')[0].focus();
        
        },
    },
}
</script>