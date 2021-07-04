<template>
    <div class="form">
        <form-header></form-header>
        <div class="body">
            <div class="left">
            <form-upper></form-upper>
            <form-lower></form-lower>
            </div>
            <div class="center">
                <div class="title">コンテナ情報</div>
                <div>
                    <div class="lable">COMMON</div>
                    <el-input size="mini"></el-input>
                </div>
                <div>
                    <div class="lable">VAN PLACE</div>
                    <el-input size="mini"></el-input>
                </div>
                <div>
                    <el-button size="mini" type="primary">VANNING PLACE ADD</el-button>
                </div>
                <div class="container-input-title">
                    <span>Conntainer type</span><span>QUANTITY</span>
                </div>
                <div class="container-input-group">
                    <span>1</span>
                    <el-input size="mini"></el-input>
                    <el-input size="mini"></el-input>
                </div>
                <div class="container-input-group">
                    <span>2</span>
                    <el-input size="mini"></el-input>
                    <el-input size="mini"></el-input>
                </div>
                <div class="container-input-group">
                    <span>3</span>
                    <el-input size="mini"></el-input>
                    <el-input size="mini"></el-input>
                </div>
                <div class="container-input-group">
                    <span>4</span>
                    <el-input size="mini"></el-input>
                    <el-input size="mini"></el-input>
                </div>
                <div class="container-input-group">
                    <span>5</span>
                    <el-input size="mini"></el-input>
                    <el-input size="mini"></el-input>
                </div>
                <div>
                    <el-button type="primary">ENTER</el-button>
                </div>
                <div class="title">
                    REMARKS(備考)
                </div>
                <div>
                    <el-input type="textarea" value="BKGのみ"></el-input>
                </div>
            </div>
            <div class="right">
                <div class="title">
                    コンテナ＆ドレージ詳細情報
                </div>
                <div>
                    <el-button type="primary" size="mini">button1</el-button>
                    <el-button type="primary" size="mini">button2</el-button>
                    <el-button type="primary" size="mini">button3</el-button>
                    <el-button type="primary" size="mini">button4</el-button>
                    <el-button type="primary" size="mini">button5</el-button>
                    <el-button type="primary" size="mini">button6</el-button>
                    <el-button type="primary" size="mini">button7</el-button>
                </div>
                <br/>
                <hr/>
                <br/>
                <div>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FormHeader from './form/formHeader.vue'
import FormLower from './form/formLower.vue'
import FormUpper from './form/formUpper.vue'

export default {
    components: { 
        FormHeader,
        FormUpper,
        FormLower
    },
    
}
</script>
<style scoped>
.form{
    background: #545C64;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    font-size: 13px;
    overflow: auto;
}
.header,
.upper,
.lower,
.center,
.right{
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
    flex-shrink: 0;
}
.title{
    font-weight: bold;
    font-size: 16px;
}
.header{
    height: 100px;
    flex-flow: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3px;
}
.body{
    flex-grow: 1;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    overflow: auto;
}
.left{
    width: 33%;
    flex-grow: 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    margin-right: 3px;
    flex-shrink: 0;
    
}
.center{
    flex-flow: 0;
    margin-right: 3px;
}
.right{
    flex-grow: 1;
}
.upper{
    margin-bottom: 3px;
    flex-grow: 0;
}
.upper >.title{
    display: block;
}
.lower > div,
.upper > div,
.loading > div,
.delivery > div{
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
}
.lower > div >*,
.upper > div >*,
.loading > div >*,
.delivery > div >*{
    margin: 0 2px;
}
.lower{
    flex-grow: 1;
    overflow: auto;
}
.header-left>div:nth-child(2){
    display: flex;
}
.header{
    overflow:auto;
}
.header-right,
.header-right{
    flex-shrink: 0;
}
.header-input-box > div{
    margin: 0 5px;
}
.container-input-title{
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
}
.container-input-group{
    display: flex;
    margin:  20px 0;
    align-items: center;
}
.container-input-group > *{
    margin: 0 3px;
}
</style>