<template>

<div class="old-table">
    <h1 class="title">
        <button>prev+2</button>
        <button>prev+1</button>
        <div class="title">week {{weekFlag}}</div>
        <button>next+1</button>
        <button>next+2</button>
    </h1>
    <table style="width:100%;" cellspacing="0" border="1">
        <tr class="tbale-title" >
            <td colspan="2">Mon.</td>
            <td colspan="2">Tue.</td>
            <td colspan="2">Wed.</td>
            <td colspan="2">Thur.</td>
            <td colspan="2">Fri.</td>
            <td colspan="2">Sat.</td>
            <td colspan="2">Sun.</td>
        </tr>
        <tr v-for="{el , row} in showData" :key="row">
            <td v-for="{id, start, end, content} in el"
                :key="id"
                :colspan="end-start+1"
                :class="{
                    do:content
                }">
                {{content}}
            </td>
        </tr>
    </table>
</div>

</template>
<script>
export default {
    computed: {
        showData () {
            let d = []
            let m = new Map()
            this.todos.forEach(el => {
                let i = 0
                while (m.has(i)) {
                    if (m.get(i) < el.start) break
                    i++
                }
                if (!m.has(i)) {
                    m.set(i, -1)
                    d[i] = { el: [], row: i }
                }
                // 生成空td
                for (let f = m.get(i) + 1;f < el.start;f++) {
                    d[i].el.push({ id: Symbol(0), start: f, end: f, content: '' })
                }

                m.set(i, el.end)
                d[i].el.push(el)
            })
            let end = 14
            // 补充剩余空td
            for (let i in d) {
                for (let f = m.get(parseInt(i)) + 1; f < end; f++) {
                    d[i].el.push({ id: Symbol(0), start: f, end: f, content: '' })
                }
            }
            return d
        }
    },
    data () {
        return {
            todos: [
                { id: 1, start: 0, end: 3, content: 'xx月xx日\nxxxxxx\nxxx' },
                { id: 2, start: 1, end: 3, content: 'xx月xx日\nxxxxxx\nxxx' },
                { id: 3, start: 3, end: 5, content: 'xx月xx日\nxxxxxx\nxxx' },
                { id: 4, start: 2, end: 5, content: 'xx月xx日\nxxxxxx\nxxx' },
                { id: 5, start: 5, end: 6, content: 'xx月xx日\nxxxxxx\nxxx' },
                { id: 6, start: 5, end: 9, content: 'xx月xx日\nxxxxxx\nxxx' },
                { id: 7, start: 6, end: 6, content: 'xx月xx日\nxxxxxx\nxxx' },
                { id: 8, start: 7, end: 12, content: 'xx月xx日\nxxxxxx\nxxx' }
            ],
            weekFlag: 0
        }
    },
    methods: {
    }
}
</script>
<style scoped>
.old-table{
    text-align: center;
    width: 100%;
    color: #000;
}
.title{
    display: flex;
    justify-content: center;
    align-items: center;
}
.do{
    background: pink;
}
table{
    table-layout: fixed
}
tr{
    height: 60px;
}
.table-title{
    font-weight: bold;
}
.title > *{
    margin:  0 30px;
}
.title > button{
    padding: 10px 20px;
    border-radius: 3px;
    background: #D7983C;
    color: #fff;
}
.title > button:hover{
    background: #F0CB93;
    color: #000;
}
</style>
