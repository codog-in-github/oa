<template>
    <div class="bkg-list">
        <header>
            <div class="input-box">
                <el-input v-model="condition.bkg_no" placeholder="BKG NO" size="mini" />
                <el-input v-model="condition.bl_no" placeholder="B/L NO" size="mini" />
                <el-input v-model="condition.pol" placeholder="POL" size="mini" />
                <el-input v-model="condition.pod" placeholder="POD" size="mini" />
                <el-input v-model="condition.booker" placeholder="BOOKER" size="mini" />
                <el-input v-model="condition.dg" placeholder="社内管理番号" size="mini" />
                <el-button size="mini" @click="clearCondition" type="primary" class="el-icon-refresh-right">CLEAR</el-button>
                <el-button type="primary" size="mini" class="el-icon-search" @click="reLoad">SEARCH</el-button>
            </div>
        </header>
        <main>
            <el-table
                border
                stripe
                size="mini"
                :data="list"
                :header-cell-style="{
                    background:'#409eff',
                    color:'#fff',
                    fontSize:'16px'
                }"
                height="100%"
            >
                <el-table-column
                    prop="show_cy_cut"
                    label="CUT DATE"
                    sortable
                    :formatter="dateFormat"
                    width="130px"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="bkg_date"
                    label="BKG DATE"
                    sortable
                    :formatter="dateFormat"
                    width="130px"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="booker"
                    label="BOOKER"
                >
                </el-table-column>
                <el-table-column
                    prop="ld"
                    label="POL/POD"
                >
                </el-table-column>
                <el-table-column
                    prop="bkg_no"
                    label="BKG NO"
                >
                </el-table-column>
                <el-table-column
                    prop="quantity"
                    label="QUANTITY"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="container_type"
                    label="CONTAINER TYPE"
                >
                </el-table-column>
                <el-table-column
                    label="状態"
                    width="350px"
                >
                    <template slot-scope="scope">
                        <el-select
                            v-if="!showRestore"
                            v-model="scope.row.state"
                            multiple
                            @change="changeState(scope.row.id, scope.row.state)"
                            @focus="getOptionsAnsyc(10, options.state)"
                            class="state"
                        >
                            <el-option
                                v-for="{id, value, label} in options.state.item"
                                :key="id"
                                :value="value"
                                :label="label"
                            ></el-option>
                        </el-select>
                        <div
                            v-else
                        >{{scope.row.state.join('|')}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="OPERATION"
                    width="320px"
                >
                    <template  slot-scope="scope">
                        <div style="text-align:center;">
                            <el-button
                                type="primary"
                                size="mini"
                                class="el-icon-view"
                                @click="detailClickHandler(scope.row.id)"
                            >
                                DETAIL
                            </el-button>
                             <el-button
                                v-if="showPrevious"
                                type="primary"
                                size="mini"
                                class="el-icon-d-arrow-left"
                                @click="changeStep(scope.row.id, scope.$index, false)"
                            >
                                PREV
                            </el-button>
                             <el-button
                                v-if="showNext"
                                type="primary"
                                size="mini"
                                class="el-icon-d-arrow-right"
                                @click="changeStep(scope.row.id, scope.$index)"
                            >
                                NEXT
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </main>
        <footer>
            <el-pagination
                background
                :page-sizes="[10, 50, 100]"
                :page-size="page_size"
                layout="sizes,total, prev, pager, next"
                :total="total"
                @size-change="sizeChangeHandler"
                @current-change="pageChangeHandler"
            >
            </el-pagination>
        </footer>
        <el-dialog :visible="newOrder" @close="newOrder = false" @open="copy_no = ''" title="NEW ORDER">
            BKG NO:<el-input v-model="copy_no"></el-input>
            <template #footer>
                <el-button @click="getOrderID" type="primary">{{copy_no === ''? 'ADD' : 'COPY'}}</el-button>
                <el-button @click="newOrder = false">CANCLE</el-button>
            </template>
        </el-dialog>
        <request-book ref="rb" :show="rbShow" @close="rbShow = false" :readonly="false"/>
    </div>
</template>
<script>
import { getOptionsAnsyc } from '@/mixin/main'
import RequestBook from './book/RequestBook.vue'
import { changeOrderRequestStep, changeOrderState, deleteOrder, getBkgList, getOrderId, hasRequestbook } from '@/api/main'
export default {
    mixins: [
        getOptionsAnsyc
    ],
    components: { RequestBook },
    data () {
        return {
            condition: {
                // cy_cut:null,
                bkg_no: '',
                bl_no: '',
                pod: '',
                pol: '',
                booker: '',
                dg: ''
            },
            page_size: 50,
            page: 1,
            total: 0,
            list: [],
            options: {
                state: { item: [], loading: false }
            },
            stateChangeTimer: -1,
            newOrder: false,

            selectId: '',
            copy_no: '',

            rbShow: false
        }
    },
    computed: {
        showNewOrder () {
            return this.$route.params.state != 'delete'
        },
        showNext () {
            return this.$route.params.state == '0' ||
                this.$route.params.state == '1'
        },
        showPrevious () {
            return this.$route.params.state == '1' ||
                this.$route.params.state == '2'
        },
        showRestore () {
            return this.$route.params.state == 'delete'
        }
    },
    mounted () {
        this.reLoad()
    },
    methods: {
        async reLoad () {
            try {
                const bkgList = await getBkgList({
                    condition: this.condition,
                    page_size: this.page_size,
                    page: (this.page || 1) - 1,
                    req_state: this.$route.params.state || ''
                })

                this.list = bkgList.list.map(i => {
                    if (!i.state) {
                        i.state = []
                    } else {
                        i.state = i.state.split('|')
                    }
                    return i
                })

                this.total = parseInt(bkgList.total)
                this.page = bkgList.page
            } catch (e) {
                console.log('e :', e)
            }
        },

        dateFormat (row, column, cellValue) {
            return cellValue.substr(0, 10)
        },
        sizeChangeHandler (size) {
            this.page_size = size
            this.reLoad()
        },
        pageChangeHandler (current) {
            this.page = current
            this.reLoad()
        },
        doEdit (id) {
            this.$router.push(`/frame/form/${id}/edit`)
        },
        displayDetail (id) {
            this.$router.push(`/frame/form/${id}/view`)
        },
        async deleteHandler (id, index, isDelete = true) {
            try {
                await deleteOrder(id, isDelete)
                this.list.splice(index, 1)
            } catch (error) {
            }
        },
        clearCondition () {
            for (const k in this.condition) {
                this.condition[k] = ''
            }
            this.reLoad()
        },
        async changeStep (id, index, isNext = true) {
            const step = [
                '0',
                '1',
                '2'
            ]
            try {
                await changeOrderRequestStep(
                    id,
                    step[step.indexOf(this.$route.params.state) + (isNext ? 1 : -1)],
                )
                this.list.splice(index, 1)
            } catch (error) {
            }
        },
        changeState (id, val) {
            clearTimeout(this.stateChangeTimer)
            this.stateChangeTimer = setTimeout(async () => {
                try {
                    await changeOrderState(id, val.join('|'))
                    this.$message.success('CHANGE SUCCESS')
                } catch (error) {
                }
            }, 1000)
        },
        addNewOrder () {
            this.newOrder = true
            // this.$router.push('/frame/form');
        },
        async detailClickHandler (rowId) {
            try {
                await hasRequestbook(rowId)
                this.displayRequestbook(rowId)
            } catch (error) {
                this.selectId = rowId
                this.newOrder = true
            }
        },
        async getOrderID () {
            const rowBkgId = this.selectId
            if (this.copy_no === '') {
                this.displayRequestbook(rowBkgId)
            } else {
                try {
                    const id = await getOrderId(this.copy_no)
                    this.displayRequestbook(rowBkgId, id)
                } catch (error) {
                }
            }
        },
        displayRequestbook (bkgId, copyId) {
            this.rbShow = true
            this.$refs.rb.loadData(bkgId, copyId, true)
        }
    }
}
</script>
<style lang="less" scoped>
.bkg-list{
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;

    * {
        flex: 0 0 auto;
    }

    main{
        flex: 1 1 auto;
        height: 1px;
        overflow: auto !important;
    }
}
header{
    line-height: 2rem;

    .el-input{
        width: 10%;
    }
}
.header-row{
    background: gray;
}
.input-box> *:nth-child(n+2){
    margin-left: 1em;
}

footer{
    margin-top: 1em;
    text-align: right;
}
.state{
    width: 100% ;

    /deep/ .el-tag {
        font-size: 20px;
        color: #000;
    }
}
/deep/.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell{
    background: #f2f2f4;
}
</style>
