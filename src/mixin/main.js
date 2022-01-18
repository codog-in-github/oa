import { getOptions } from '@/api/main'
import { mapState } from 'vuex'

export const getOptionsAnsyc = {
    methods: {
        async getOptionsAnsyc (selectId, options, pid = '') {
            if (options.loaded !== true) {
                options.loaded = true
                const localOpt = localStorage.getItem(`options_${selectId}_${pid || ''}`)
                if (localOpt) {
                    // 检测是否本地缓存
                    options.item = JSON.parse(localOpt)
                } else {
                    options.loading = true
                    const optData = await getOptions(selectId, pid)
                    options.item.splice(0, options.item.length)
                    options.item.push(...optData)
                    localStorage.setItem(`options_${selectId}_${pid || ''}`, JSON.stringify(optData))
                    localStorage.setItem('options', localStorage.getItem('options') + `|options_${selectId}_${pid || ''}`)
                    options.loading = false
                }
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
