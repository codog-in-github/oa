<template>
    <div class="form">
        <div class="header">
            <div class="header-left">
                <div><b>管理情報</b> </div>
                <div class="header-input-box">
                    <title-group title="BKG DATE">
                        <el-input size="mini"></el-input>
                    </title-group>
                    <title-group title="BKG  NO.">
                        <el-input size="mini"></el-input>
                    </title-group>
                    <title-group title="BKG TYPE">
                        <el-input size="mini"></el-input>
                    </title-group>
                    <title-group title="INCOTERMS">
                        <el-input size="mini"></el-input>
                    </title-group>
                    <title-group title="BKG STAFF">
                        <el-input size="mini"></el-input>
                    </title-group>
                    <title-group title="IN SALES">
                        <el-input size="mini"></el-input>
                    </title-group>
                    <title-group title="DG">
                        <el-input size="mini"></el-input>
                    </title-group>
                </div>
            </div>
            <div class="header-right">
                <el-button size="mini" type="primary">BKG登録</el-button>
                <el-button size="mini" type="primary">BKG削除</el-button>
                <el-button size="mini" type="primary">BKG編集</el-button>
                <el-button size="mini" type="primary">各種申請〇〇登録</el-button>
                <br>
                <br>
                <el-button size="mini" type="primary">各種書類作成</el-button>
                <el-button size="mini" type="primary">メール作成</el-button>
                <el-button size="mini" type="primary">コスト確認</el-button>
                <el-button size="mini" type="primary">&nbsp;</el-button>
            </div>
        </div>
        <div class="body">
            <div class="left">
                <div class="upper">
                    <div class="title">取引業者情報</div>
                    <div>
                        <title-group title="BOOKER">
                            <el-input size="mini"></el-input>
                        </title-group>
                        <div>/</div>
                        <title-group title="B/STAFF">
                            <el-input size="mini"></el-input>
                        </title-group>
                        <el-button size="mini" type="primary">NEW ADD</el-button>
                    </div>
                    <div>
                        <title-group title="SHIPPER">
                            <el-input size="mini"></el-input>
                        </title-group>
                    </div>
                    <div>
                        <title-group title="FORWARDER">
                            <el-input size="mini"></el-input>
                        </title-group>
                        <div>/</div>
                        <title-group title="F/STAFF">
                            <el-input size="mini"></el-input>
                        </title-group>
                        <el-button size="mini" type="primary">NEW ADD</el-button>
                    </div>
                    <div>
                        <title-group title="CONSIGNEE">
                            <el-input size="mini"></el-input>
                        </title-group>
                    </div>
                    <div>
                        
                        <title-group title="DRAYAGE">
                            <el-input size="mini"></el-input>
                        </title-group>
                        <div>/</div>
                        <title-group title="D/STAFF">
                            <el-input size="mini"></el-input>
                        </title-group>
                        <el-button size="mini" type="primary">NEW ADD</el-button>
                    </div>
                </div>
                <div class="lower">
                    <div class="title">
                        船社情報
                    </div>
                    <div>
                        <title-group title="CARRIER">
                            <el-input size="mini"></el-input>
                        </title-group>
                        <div>/</div>
                        <title-group title="C/STAFF">
                            <el-input size="mini"></el-input>
                        </title-group>
                        <el-button size="mini" type="primary">NEW ADD</el-button>
                    </div>
                    <div>
                        <title-group title="SERVICE">
                            <el-input size="mini"></el-input>
                        </title-group>
                        <title-group title="VESSEL NAME">
                            <el-input size="mini"></el-input>
                        </title-group>
                        <div>/</div>
                        <title-group title="VOYAGE">
                            <el-input size="mini"></el-input>
                        </title-group>
                    </div>
                    <div class="prot-message" style="align-items:flex-start;">
                        <div class="loading">
                            <div class="title">
                                PORT OF LOADING<br/><br/>
                            </div>
                            <div>
                                <title-group title="COUNTRY">
                                    <el-input size="mini"></el-input>
                                </title-group>
                                <title-group title="PORT">
                                    <el-input size="mini"></el-input>
                                </title-group>
                            </div>
                            <div>
                                <title-group title="ETA">
                                    <el-input size="mini"></el-input>
                                </title-group>
                                <title-group title="ETD">
                                    <el-input size="mini"></el-input>
                                </title-group>
                                </div>
                            <div>
                                <title-group title="CY OPEN">
                                    <el-input size="mini"></el-input>
                                </title-group>
                                <title-group title="CY CUT">
                                    <el-input size="mini"></el-input>
                                </title-group>
                            </div>
                            <div style="justify-content:flex-end;">
                                <title-group title="DOC CUT">
                                    <el-input size="mini"></el-input>
                                </title-group>
                            </div>
                        </div>
                        <div class="delivery">
                            <div class="title">
                                PORT OF DELIVERY<br/><br/>
                            </div>
                            <div>
                                <title-group title="COUNTRY">
                                    <el-input size="mini"></el-input>
                                </title-group>
                                <title-group title="PORT">
                                    <el-input size="mini"></el-input>
                                </title-group>
                            </div>
                            <div>
                                <title-group title="ETA">
                                    <el-input size="mini"></el-input>
                                </title-group>
                            </div>
                            <div>
                                <title-group title="FREE TIME DEM">
                                    <el-input size="mini"></el-input>
                                </title-group>
                                <title-group title="FREE TIME DET">
                                    <el-input size="mini"></el-input>
                                </title-group>
                            </div>
                            </div>
                    </div>
                </div>
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
import TitleGroup from '../../components/titleGroup.vue'

export default {
  components: { TitleGroup },
    
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
.loading{
    background: red;
    color: #fff;
    padding: 10px;
}
.delivery{
    background: lightblue;
    color: #000;
    padding: 10px;
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