<template>
    <div class="bkg-list">
        <header>
            <el-button
                size="mini"
                type="primary"
                class="el-icon-plus"
                @click="$router.push('/frame/form');"
            >
            NEW ORDER
            </el-button>
            <div class="input-box">
                <title-group
                    title="BKG DATE"
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
                    title="B/L NO"
                >
                    <el-input
                        v-model="condition.blNo"
                        size="mini"
                    ></el-input>
                </title-group>
                <title-group
                    title="BKG STAFF"
                >
                    <el-input
                        v-model="condition.bkgStaff"
                        size="mini"
                    ></el-input>
                </title-group>
                <title-group
                    title="IN SALES"
                >
                    <el-input
                        v-model="condition.inSales"
                        size="mini"
                    ></el-input>
                </title-group>
            </div>
            <el-button
                type="primary"
                size="mini"
                class="el-icon-search"
            >
                SEARCH
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
    justify-content: space-around;
    align-items: flex-end;
    margin-bottom: 1em;
}
.input-box{
    display: flex;
}
.input-box>* + *{
    margin-left: 1em;
}
footer{
    margin-top: 1em;
    text-align: center;
}
</style>