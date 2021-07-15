<template>
    <div class="bkg-list">
        <header>
            <title-group
                title="bkg-date"
            >
                <el-date-picker
                    v-model="condition.bkgDate"
                    size="mini"
                    style="width:auto"
                ></el-date-picker>
            </title-group>
            <title-group
                title="BKG NO"
            >
                <el-input
                    v-model="condition.bkgNo"
                    size="mini"
                ></el-input>
            </title-group>
            <title-group
                title="b/l no"
            >
                <el-input
                    v-model="condition.blNo"
                    size="mini"
                ></el-input>
            </title-group>
            <title-group
                title="bkg staff"
            >
                <el-input
                    v-model="condition.bkgStaff"
                    size="mini"
                ></el-input>
            </title-group>
            <title-group
                title="in sales"
            >
                <el-input
                    v-model="condition.inSales"
                    size="mini"
                ></el-input>
            </title-group>
            <el-button
                type="primary"
                size="mini"
            >
                search
            </el-button>
        </header>
        <main>
            <el-table
                border
            >
                <el-table-column
                    prop="bkgDate"
                    label="BKG DATE"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="bkgNo"
                    label="BKG NO"
                >
                </el-table-column>
                <el-table-column
                    prop="blNo"
                    label="B/L NO"
                >
                </el-table-column>
                <el-table-column
                    prop="bkgType"
                    label="BKG type"
                >
                </el-table-column>
                <el-table-column
                    prop="incoterms"
                    label="incoterms"
                >
                </el-table-column>
                <el-table-column
                    prop="bkgStaff"
                    label="BKG staff"
                >
                </el-table-column>
                <el-table-column
                    prop="IN SALES"
                    label="inSales"
                >
                </el-table-column>
            </el-table>
        </main>
        <footer>
            <el-pagination
                :page-sizes="[10, 50, 100, 500]"
                :page-size="100"
                layout="sizes, prev, pager, next"
                :total="total"
            >
            </el-pagination>
        </footer>
    </div>
</template>
<script>
import TitleGroup from '../../components/titleGroup.vue'
export default {
    data(){
        return {
            condition:{
                bkgDate:null,
                bkgNo:null,
                blNo:null,
                bkgStaff:null,
                inSales:null,
            },
            result:[],
            total:0,
        }
    },
    methods:{
        handleSizeChange(){},
    },
    components: { TitleGroup },
}
</script>
<style scoped>
.bkg-list{
    width: 100%;
    height: 100%;
    background: #fff;
}
header{
    display:flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 1em;
}
header>*:nth-child(n+2){
    margin-left: 1em;
}
footer{
    margin-top: 1em;
    text-align: center;
}
</style>