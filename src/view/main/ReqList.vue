<template>
    <div class="bkg-list">
        <header>
            <div class="input-box" style="margin-bottom:1em;">
                <el-input v-model="condition.bkg_no" placeholder="BKG NO"     size="mini" />
                <el-input v-model="condition.bl_no"  placeholder="B/L NO"     size="mini" />
                <el-input v-model="condition.pol"    placeholder="POL"        size="mini" />
                <el-input v-model="condition.pod"    placeholder="POD"        size="mini" />
                <el-input v-model="condition.booker" placeholder="BOOKER"     size="mini" />
                <el-input v-model="condition.dg"     placeholder="社内管理番号" size="mini" />
                <el-button size="mini" type="primary" @click="clearCondition" >CLEAR</el-button>
                <el-button size="mini"                @click="reLoad">SEARCH</el-button>
            </div>
        </header>
        <main>
            <el-table
                border
                size              ="mini"
                height            ="100%"
                :data             ="list"
                :span-method      ="arraySpanMethod"
                :row-class-name   ="rowClassName"
                :header-cell-style="{
                    background:'#409eff',
                    color     :'#fff',
                    fontSize  :'16px'
                }"
            >
                <el-table-column prop="company_no" label="管理番号" width="100px" align="center" fixed />
                <el-table-column
                    prop      ="show_cy_cut"
                    label     ="CUT"
                    :formatter="dateFormat"
                    width     ="100px"
                    align     ="center"
                />
                <el-table-column
                    prop="bkg_date"
                    label="BKG"
                    :formatter="dateFormat"
                    width="100px"
                    align="center"
                />
                <el-table-column prop="booker"         label="BOOKER" />
                <el-table-column prop="ld"             label="POL/POD"/>
                <el-table-column prop="bkg_no"         label="BKG NO" />
                <el-table-column prop="quantity"       label="QTY"     width="50px"/>
                <el-table-column prop="container_type" label="CT TYPE" width="100px"/>
                <el-table-column label="入出金データ" align="center">
                    <el-table-column label="名前" align="center">
                        <el-input slot-scope="{row}" v-model="row.name" :readonly="isDisabled(row)"/>
                    </el-table-column>
                    <el-table-column label="金額" align="center">
                        <template slot-scope="{row}">
                            <el-input v-model.number="row.price" :readonly="isDisabled(row)" />
                        </template>
                    </el-table-column>
                    <el-table-column label="時間" align="center">
                        <el-date-picker slot-scope="{row}" v-model="row.date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:100%;" :readonly="isDisabled(row)" />
                    </el-table-column>
                    <el-table-column label="操作する" align="center">
                        <el-table-column label="OPT" width="100" align="center" >
                            <template slot-scope="{row}" >
                                <el-button v-if="row.completeRowSpan !== 0" type="primary" :disabled="isDisabled(row)" @click.stop="add(row)">ADD</el-button>
                                <el-button v-else                           type="danger"  :disabled="isDisabled(row)" @click.stop="del(row)">DEL</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="完" width="100" align="center" >
                            <el-button
                                slot-scope ="{row}"
                                v-if  ="
                                    (row.bkgRowSpan !== 0 && row.state == 1) ||
                                    (row.bkgRowSpan === 0 && row.parent.state == 2) ||
                                    ((row.parent || row).state == 3)
                                "
                                type="danger"
                                @click.stop="doComplete(row, true)">
                                返
                            </el-button>
                            <el-button
                                slot-scope ="{row}"
                                v-else
                                type="primay"
                                @click.stop="doComplete(row)">
                                完
                            </el-button>
                        </el-table-column>
                        <el-table-column label="保存する" width="100" align="center" >
                            <el-button slot-scope="{row}" @click.stop="changeDetail(row)">保存する</el-button>
                        </el-table-column>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </main>
        <footer>
            <el-pagination
                background
                :page-sizes    ="[10, 50, 100]"
                :page-size     ="page_size"
                layout         ="sizes, total, prev, pager, next"
                :total         ="total"
                @size-change   ="sizeChangeHandler"
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

import RequestBook from './book/RequestBook.vue'
import { changeOrderRequestStep, getReqList, getOrderId, hasRequestbook, changeRequestDetail } from '@/api/main'

const PRICE_TYPE_EXPEND = 0
const PRICE_TYPE_INCOME = 1

export default {
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
            page_size: 10,
            page: 1,
            total: 0,
            list: [],
            stateChangeTimer: -1,
            newOrder: false,

            selectId: '',
            copy_no: '',

            rbShow: false,

            PRICE_TYPE_EXPEND,
            PRICE_TYPE_INCOME
        }
    },
    mounted () {
        this.reLoad()
    },
    methods: {
        async reLoad () {
            try {
                const bkgList = await getReqList({
                    condition: this.condition,
                    page_size: this.page_size,
                    page: (this.page || 1) - 1,
                    req_state: this.$route.params.state || ''
                })

                const { list, total, page } = bkgList

                const formatted = []
                let isEven = true
                for (const bkg of list) {
                    isEven = !isEven
                    bkg.isEven = isEven
                    bkg.expendChildren = []
                    bkg.bkgRowSpan = 1
                    bkg.completeRowSpan = 1
                    formatted.push(bkg)
                    if (bkg.expend_detail) {
                        let isFirst = true
                        for (const item of bkg.expend_detail.split('|')) {
                            const [ price, date, name ] = item.split(',')
                            if (isFirst) {
                                bkg.price = price
                                bkg.date = date
                                bkg.name = name
                                bkg.type = PRICE_TYPE_EXPEND
                            } else {
                                bkg.bkgRowSpan++
                                bkg.completeRowSpan++
                                const row = {
                                    ...bkg,
                                    price,
                                    date,
                                    name,
                                    parent: bkg,
                                    bkgRowSpan: 0,
                                    completeRowSpan: 0,
                                    type: PRICE_TYPE_EXPEND
                                }
                                bkg.expendChildren.push(row)
                                formatted.push(row)
                            }
                            isFirst = false
                        }
                    } else {
                        bkg.price = ''
                        bkg.date = ''
                        bkg.type = PRICE_TYPE_EXPEND
                        bkg.name = bkg.short_name
                    }
                    bkg.incomeChildren = []
                    if (bkg.income_detail) {
                        for (const item of bkg.income_detail.split('|')) {
                            bkg.bkgRowSpan++
                            const [ price, date, name ] = item.split(',')
                            const row = {
                                ...bkg,
                                price,
                                date,
                                name,
                                parent: bkg,
                                bkgRowSpan: 0,
                                completeRowSpan: 0,
                                type: PRICE_TYPE_INCOME
                            }
                            bkg.incomeChildren.push(row)
                            bkg.incomeChildren[0].completeRowSpan++
                            formatted.push(row)
                        }
                    } else {
                        bkg.bkgRowSpan++
                        const row = {
                            ...bkg,
                            price: bkg.total,
                            date: '',
                            name: bkg.short_name,
                            parent: bkg,
                            bkgRowSpan: 0,
                            completeRowSpan: 1,
                            type: PRICE_TYPE_INCOME
                        }
                        bkg.incomeChildren.push(row)
                        formatted.push(row)
                    }
                }

                this.list = formatted
                this.total = parseInt(total)
                this.page = page
            } catch (e) {
                console.log('e :', e)
            }
        },

        arraySpanMethod ({ row, columnIndex }) {
            if (columnIndex < 8 || columnIndex === 13) {
                return [row.bkgRowSpan, 1]
            } else if (columnIndex === 12) {
                return [row.completeRowSpan, 1]
            }
        },

        add (row) {
            const newRow = {
                ...row,
                date: '',
                price: '',
                name: row.short_name,
                bkgRowSpan: 0,
                completeRowSpan: 0,
                parent: row.parent || row
            }
            let lastRow
            if (row.bkgRowSpan !== 0) {
                row.completeRowSpan++
                lastRow = row.expendChildren[row.expendChildren.length - 1] || row
                row.expendChildren.push(newRow)
            } else {
                row.incomeChildren[0].completeRowSpan++
                lastRow = row.incomeChildren[row.incomeChildren.length - 1]
                row.incomeChildren.push(newRow)
            }
            (row.parent || row).bkgRowSpan++
            const index = this.list.indexOf(lastRow)
            this.list.splice(index + 1, 0, newRow)
        },

        del (row) {
            const expendIndex = row.parent.expendChildren.indexOf(row)
            if (expendIndex !== -1) {
                row.parent.completeRowSpan--
                row.parent.expendChildren.splice(expendIndex, 1)
            } else {
                row.parent.incomeChildren[0].completeRowSpan--
                const incomeIndex = row.parent.expendChildren.indexOf(row)
                row.parent.incomeChildren.splice(incomeIndex, 1)
            }
            const index = this.list.indexOf(row)
            row.parent.bkgRowSpan--
            this.list.splice(index, 1)
        },

        async changeDetail (row) {
            try {
                const { id } = row
                const expend = [{
                    price: row.price,
                    date: row.date,
                    name: row.name
                }].concat(
                    row.expendChildren
                        .filter(expend => expend.price || expend.date || expend.name)
                        .map(({ price = '', date = '', name = '' }) => ({ price, date, name }))
                )
                const income = row.incomeChildren
                    .filter(income => income.price || income.date)
                    .map(({ price = '', date = '', name = '' }) => ({ price, date, name }))
                await changeRequestDetail({ expend, income, id })
                this.$message.success('SAVE SUCCESS')
            } catch (error) {
            }
        },

        isDisabled (row) {
            const { state } = row.parent || row
            if (row.type === PRICE_TYPE_INCOME) {
                return state == 2 || state == 3
            } else {
                return state == 1 || state == 3
            }
        },

        dateFormat (_, __, cellValue) {
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
            this.$router.push(`/form/${id}/edit`)
        },

        displayDetail (id) {
            this.$router.push(`/form/${id}/view`)
        },

        clearCondition () {
            for (const k in this.condition) {
                this.condition[k] = ''
            }
            this.reLoad()
        },

        rowClassName ({ row }) {
            return row.isEven ? 'even' : ''
        },

        async doComplete (row, isback = false) {
            try {
                const parent = row.parent || row
                let state = Number(parent.state) || 0
                if (row.bkgRowSpan !== 0) {
                    state += 1 * (isback ? -1 : 1)
                } else {
                    state += 2 * (isback ? -1 : 1)
                }
                if (isback) {
                    await this.$confirm('返？')
                } else if (state === 3) {
                    await this.$confirm('完？')
                } else {
                    await this.$confirm('check？')
                }
                await changeOrderRequestStep(parent.id, state)
                if (state === 3) {
                    const index = this.list.indexOf(parent)
                    this.list.splice(index, 1 + parent.expendChildren.length + parent.incomeChildren.length)
                } else {
                    parent.state = state
                }
            } catch (error) {
            }
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

/deep/ .even{
    background: #f2f2f4 !important;
}
</style>
