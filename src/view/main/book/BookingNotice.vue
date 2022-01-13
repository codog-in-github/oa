<template>
    <el-form class="form-body" label-width="120px" ref="form" >
        <el-form-item label="ADDRESS:">
            <el-radio v-model="address" label="本社" ></el-radio>
            <el-radio v-model="address" label="九州営業所"></el-radio>
        </el-form-item>
        <el-form-item label="SHIPPER:"><el-input v-model="shipper" :value="shipper"></el-input></el-form-item>
        <el-form-item label="BOOKING NO:"><el-input v-model="booking_no"></el-input></el-form-item>
        <el-form-item label="VESSEL:"><el-input v-model="vessel"></el-input></el-form-item>
        <el-form-item label="VOY:"><el-input v-model="voy"></el-input></el-form-item>
        <el-form-item label="CARRIER:"><el-input v-model="vessel_carrier"></el-input></el-form-item>
        <el-form-item label="POL:"><el-input v-model="pol"></el-input></el-form-item>
        <el-form-item label="POD:"><el-input v-model="pod"></el-input></el-form-item>
        <el-form-item label="ETD:"><el-input v-model="etd"></el-input></el-form-item>
        <el-form-item label="ETA:"><el-input v-model="eta"></el-input></el-form-item>
        <el-form-item label="CY OPEN:"><el-input v-model="cy_open"></el-input></el-form-item>
        <el-form-item label="CY CUT:"><el-input v-model="cy_cut"></el-input></el-form-item>
        <el-form-item label="DOC CUT:"><el-input v-model="doc_cut"></el-input></el-form-item>
        <!-- <el-form-item label="DOC CUT:"><el-input v-model="doc_cut"></el-input></el-form-item> -->

        <el-form-item v-for="(c,i) in container" :key="i" :label="`CONTAINER${i+1}:`"><el-input v-model="container[i]"></el-input></el-form-item>

        <el-form-item label="COMMON:"><el-input v-model="common"></el-input></el-form-item>
        <el-form-item label="CONSIGNEE:"><el-input v-model="consiginee" type="textarea"></el-input></el-form-item>
        <el-form-item label="REMARK:"><el-input v-model="remarks" type="textarea"></el-input></el-form-item>
    </el-form>
</template>
<script>
import { URL } from '@/api/main'
import { postNewWindow } from '@/utils'
import { common } from '@/mixin/main'
export default {
    mixins: [
        common
    ],
    props: {
        data: {
            default: () => ({})
        }
    },
    data () {
        return {
            loading: false,
            action: URL.BOOKING_NOTICE,
            address: '本社',
            shipper: '',
            booking_no: '',
            vessel: '',
            voy: '',
            vessel_carrier: '',
            pol: '',
            pod: '',
            etd: '',
            eta: '',
            cy_open: '',
            cy_cut: '',
            doc_cut: '',
            container: [],
            common: '',
            consiginee: '',
            remarks: ''
        }
    },
    methods: {
        loadData () {
            this.loading = true
            this.$getBookingNotice(this.$route.params.bkg_id, ({ data }) => {
                let fd = data.data
                this.shipper = fd.trader.shipper
                this.booking_no = fd.bkg.bkg_no
                this.vessel = fd.shipper.vessel_name
                this.voy = fd.shipper.voyage
                this.vessel_carrier = fd.shipper.carrier
                this.pol = fd.loading.port
                this.pod = fd.delivery.port
                this.etd = fd.loading.etd
                this.eta = fd.delivery.eta
                this.cy_open = fd.loading.cy_open
                this.cy_cut = fd.loading.cy_cut
                this.doc_cut = fd.loading.doc_cut
                this.container.splice(0, this.container.length)
                this.container.push(...fd.type.map(item => `${item.container_type} * ${item.quantity}`))
                this.consiginee = fd.container.consiginee
                // this.container = '';
                let remarks = ''
                if (fd.remarks && !/^\s+$/.test(fd.remarks)) {
                    remarks = fd.remarks
                } else {
                    for (let item of fd.detail) {
                        remarks += `${
                            item.vanning_date ? '＊バン詰め： ' : ''
                        }${
                            item.vanning_date.slice(0, 10) || ''
                        } ${
                            item.vanning_during?.split('-')[0] || ''
                        } ${
                            item.chassis || ''
                        }  ${
                            item.expenses || ''
                        }\n${item.booker_place ? 'VAN場所：' + item.booker_place : ''} \n`
                    }
                    remarks += fd.container.remarks
                }
                this.common = fd.container.common
                this.remarks = remarks
                this.dialog.loading = false
            })
        },
        beDownload () {
            postNewWindow(URL.BOOKING_NOTICE, {
                id: this.bkgId,
                address: this.address,
                shipper: this.shipper,
                booking_no: this.booking_no,
                vessel: this.vessel,
                voy: this.voy,
                vessel_carrier: this.vessel_carrier,
                pol: this.pol,
                pod: this.pod,
                etd: this.etd,
                eta: this.eta,
                cy_open: this.cy_open,
                cy_cut: this.cy_cut,
                doc_cut: this.doc_cut,
                container: this.container,
                common: this.common,
                consiginee: this.consiginee,
                remarks: this.remarks
            })
        }
    }
}
</script>
