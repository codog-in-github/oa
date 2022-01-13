<template>
   <div class="upper">
       <div class="title">取引業者情報</div>
        <div class="header-input-box">
            <div class="group">
                <title-group
                    title="BOOKER">
                    <el-autocomplete
                        v-model="booker"
                        size="mini"
                        @focus="getOptionsAnsyc(8, options.booker)"
                        @change="setBStaffDefaultVal"
                        @select="val=>{booker=val.booker;shipper=val.booker;}"
                        :fetch-suggestions="querySearch"

                    >
                    <template slot-scope="{ item }">
                        {{ item.booker }}
                    </template>
                    </el-autocomplete>
                </title-group>
                <span class="delimiter">&sol;</span>
                <title-group
                    title="B/STAFF">
                    <el-input
                        size="mini"
                        v-model="b_staff"
                    ></el-input>
                </title-group>
            </div>
            <title-group
                title="SHIPPER">
                <el-input
                    size="mini"
                    v-model="shipper"
                ></el-input>
            </title-group>
            <div class="group">
                <title-group
                    title="通関会社">
                    <el-select
                        v-model="forwarder"
                        @focus="getOptionsAnsyc(7, options.forwarder)"
                        @change="setFStaffDefaultVal"
                        size="mini">
                        <el-option
                            v-for="{id, value, label} in options.forwarder.item"
                            :key="id"
                            :value="value"
                            :label="label"
                        ></el-option>
                    </el-select>
                </title-group>
                <span class="delimiter">&sol;</span>
                <title-group
                    title="F/STAFF">
                    <el-input
                        size="mini"
                        v-model="f_staff"
                    ></el-input>
                </title-group>
            </div>
            <title-group
                title="CONSIGNEE">
                <el-input
                    size="mini"
                    v-model="consignee"
                ></el-input>
            </title-group>
            <div class="group">
                <title-group
                    title="BOOKING先">
                    <!-- <el-input
                        v-model="drayage"
                        size="mini">
                    </el-input> -->
                        <el-autocomplete
                            v-model="drayage"
                            @focus="getOptionsAnsyc(5, options.drayage)"
                            @select="setDStaff"
                            :fetch-suggestions="queryDrayageSearch"
                            size="mini">
                        </el-autocomplete>
                </title-group>
                <span class="delimiter">&sol;</span>
                <title-group
                    title="D/STAFF">
                    <el-input
                        size="mini"
                        v-model="d_staff"
                    ></el-input>
                </title-group>
            </div>
        </div>
    </div>
</template>
<script>
import { getOptionsAnsyc } from '@/mixin/main.js'
import { findInArray } from '@/assets/js/utils'
import TitleGroup from '@/components/titleGroup.vue'

export default {
    data () {
        return {
            booker: null,
            b_staff: null,
            shipper: '荷主名がBOOKERと異なる場合のみ、記入してください。',
            forwarder: null,
            f_staff: null,
            consignee: null,
            drayage: null,
            d_staff: null,

            options: {
                booker: { item: [], loading: false },
                forwarder: { item: [], loading: false },
                drayage: { item: [], loading: false }
            }
        }
    },
    methods: {
        querySearch (str, cb) {
            cb(this.options.booker.item.filter(item => item.booker.indexOf(str || '') !== -1))
        },
        queryDrayageSearch (str, cb) {
            cb(this.options.drayage.item.filter(item => item.label.indexOf(str || '') !== -1))
        },
        setDStaff () {
            this.d_staff = findInArray(
                'extra',
                this.drayage,
                this.options.drayage.item,
                'label',
            )
        },
        getData () {
            return {
                booker: this.booker,
                b_staff: this.b_staff,
                shipper: this.shipper,
                forwarder: this.forwarder,
                f_staff: this.f_staff,
                consignee: this.consignee,
                drayage: this.drayage,
                d_staff: this.d_staff
            }
        },
        setData ({ trader, booker }) {
            this.booker = trader.booker
            this.b_staff = trader.b_staff
            this.shipper = trader.shipper
            this.forwarder = trader.forwarder
            this.f_staff = trader.f_staff
            this.consignee = trader.consignee
            this.drayage = trader.drayage
            this.d_staff = trader.d_staff
            if (booker) {
                this.$store.state.form.booker = booker
            }
        },
        setBStaffDefaultVal () {
            let bookerInfo = false
            for (const item of this.options.booker.item) {
                if (item['booker'] === this.booker) {
                    bookerInfo = item
                    break
                }
            }
            if (bookerInfo) {
                this.b_staff = bookerInfo.staff
                this.$store.state.form.booker = bookerInfo
                this.$eventBus.$emit('bookerChange', bookerInfo)
            } else {
                this.$store.state.form.booker = {}
            }
        },
        setFStaffDefaultVal () {
            this.f_staff = findInArray('extra',
                this.forwarder,
                this.options.forwarder.item,
                'value'
            )
        }
    },
    mixins: [
        getOptionsAnsyc
    ],
    components: {
        TitleGroup
    }
}
</script>
<style scoped>
</style>
