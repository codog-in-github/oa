export const MENU = [
    { to: '-1',
        label: 'データベース',
        toggle: true,
        class: 'el-icon-s-order',
        child: [
            { to: '/calendar', label: 'CUT チェック' },
            { to: '/list/normal', label: 'データベース' },
            { to: '/list/draft', label: 'DRAFT 準備' },
            { to: '/list/ready', label: ' サレンダー 準備' },
            { to: '/list/complete', label: '案件終了' },
            { to: '/list/delete', label: 'リストの削除' }
        ]
    },
    {
        to: '-1',
        label: 'ドライバー情報',
        toggle: true,
        class: 'el-icon-s-order',
        child: [
            { to: '/container-list', label: 'ドライバー情報' }
        ]
    },
    { to: '-1',
        label: '請求書',
        toggle: true,
        class: 'el-icon-s-order',
        child: [
            { to: '/req/0', label: '請求書未発行' },
            { to: '/req/1', label: '請求書発行済' },
            { to: '/req/2', label: '入金済' }
        ]
    }
]

export const OREDER_STAUS = [ 'normal', 'draft', 'ready', 'complete' ]