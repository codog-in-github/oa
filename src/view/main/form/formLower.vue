<template>
    <div class="lower">
        <div class="title">
            船社情報
        </div>
        <div>
            <link-select
                fatherName="CARRIER"
                childName="C/STAFF"
                childType='suggest'
            ></link-select>
            <el-button size="mini" type="primary">NEW ADD</el-button>
        </div>
        <div>
            <title-group title="SERVICE">
                <el-input size="mini"></el-input>
            </title-group>
            <link-select
                fatherName="VESSEL NAME"
                childName="VOYAGE"
                childType='suggest'
            ></link-select>
            <!-- <title-group title="VESSEL NAME">
                <el-input size="mini"></el-input>
            </title-group>
            <div>/</div>
            <title-group title="VOYAGE">
                <el-input size="mini"></el-input>
            </title-group> -->
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
</template>
<script>
import LinkSelect from '../../../components/linkSelect.vue'
import TitleGroup from '../../../components/titleGroup.vue'

export default{ 
    computed:{
    },
    data(){
        return {
        }
    },
    components:{
        TitleGroup,
        LinkSelect,
    }
}
</script>
<style scoped>
.lower > *{
    display: flex;
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
.loading > div,
.delivery > div{
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
}
.loading > div >*,
.delivery > div >*{
    margin: 0 2px;
}
</style>
