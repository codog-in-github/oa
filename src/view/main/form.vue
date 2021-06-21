<template>
    <div class="form">
        <div class="header">
            <div class="header-left">
                <div><b>管理情報</b> </div>
                <div class="header-input-box">
                    <div>
                        <div>BKG DATE</div>
                        <div>
                            <el-input size="mini"></el-input>
                        </div>
                    </div>
                    <div>
                        <div>BKG  NO.</div>
                        <div>
                            <el-input size="mini"></el-input>
                        </div>
                    </div>
                    <div>
                        <div>BKG TYPE</div>
                        <div>
                            <el-input size="mini"></el-input>
                        </div>
                    </div>
                    <div>
                        <div>INCOTERMS</div>
                        <div>
                            <el-input size="mini"></el-input>
                        </div>
                    </div>
                    <div>
                        <div>BKG STAFF</div>
                        <div>
                            <el-input  size="mini"></el-input>
                        </div>
                    </div>
                    <div>
                        <div>IN SALES</div>
                        <div>
                            <el-input  size="mini"></el-input>
                        </div>
                    </div>
                    <div>
                        <div>DG</div>
                        <div>
                            <el-input  size="mini"></el-input>
                        </div>
                    </div>
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
                <div class="upper"></div>
                <div class="lower"></div>
            </div>
            <div class="center"></div>
            <div class="right"></div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>

<style scoped>
.form{
    background: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
}
.header{
    height: 150px;
    flex-flow: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
}
.body{
    flex-grow: 1;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
}
.left{
    width: 33%;
    flex-flow: 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    
}
.center{
    background:lightseagreen;
    width: 33%;
    flex-flow: 0;
    
}
.right{
    background: limegreen;
    width: 33%;
    flex-flow: 1;
}
.upper{
    background: lightslategrey;
    height: 49%;
    
}
.lower{
    background: lightpink;
    height: 49%;
    
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
</style>