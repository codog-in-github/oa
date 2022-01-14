import { mapState } from 'vuex'

export const getOptionsAnsyc = {
    methods: {
        async getOptionsAnsyc (selectId, options, pid) {
            if (options.loaded !== true) {
                options.loaded = true
                this.$getOptions(selectId, options, pid)
                // const localOpt = localStorage.getItem(`options_${selectId}_${fatherOptionsId || ''}`)
                // if (localOpt) {
                //     // 检测是否本地缓存
                //     options.item.splice(0, options.item.length)
                //     options.item.push(...JSON.parse(localOpt))
                // } else {
                //     options.loading = true
                //     this.$api.queue = () => axios.get(`${OPTIONS_LIST}/sid/${selectId}/pid/${fatherOptionsId || ''}`)
                //     this.$api.queue = ({ data }) => {
                //         options.item.splice(0, options.item.length)
                //         options.item.push(...data.data)
                //         localStorage.setItem(`options_${selectId}_${fatherOptionsId || ''}`, JSON.stringify(data.data))
                //         localStorage.setItem('options', localStorage.getItem('options') + `|options_${selectId}_${fatherOptionsId || ''}`)
                //         options.loading = false
                //     }
                // }
            }
        }
    }
}

export const common = {
    computed: {
        ...mapState({
            name: state => state.loginState.info.name,
            userId: state => state.loginState.info.id
        }),
        ...mapState('form', {
            bkgId: state => state.bkgId
        }),
        isNewOrder () {
            return !this.$route.params.bkg_id
        },
        isCopy () {
            return this.$route.params.mode === 'copy'
        }
    }
}
