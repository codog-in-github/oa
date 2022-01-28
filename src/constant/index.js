export const MENU = [
    { to: '-1',
        label: 'データベース',
        toggle: true,
        class: 'el-icon-s-order',
        child: [
            { to: '/frame/list/normal', label: 'データベース' },
            { to: '/frame/list/draft', label: 'DRAFT 準備' },
            { to: '/frame/list/ready', label: ' サレンダー 準備' },
            { to: '/frame/list/complete', label: '案件終了' },
            { to: '/frame/list/delete', label: 'リストの削除' }
        ]
    },
    {
        to: '-1',
        label: 'ドライバー情報',
        toggle: true,
        class: 'el-icon-s-order',
        child: [
            { to: '/frame/container-list', label: 'ドライバー情報' }
        ]
    },
    { to: '-1',
        label: '請求書',
        toggle: true,
        class: 'el-icon-s-order',
        child: [
            { to: '/frame/req/0', label: '請求書未発行' },
            { to: '/frame/req/1', label: '請求書発行済' },
            { to: '/frame/req/2', label: '入金済' }
        ]
    }
]

export const OREDER_STAUS = [ 'normal', 'draft', 'ready', 'complete' ]
