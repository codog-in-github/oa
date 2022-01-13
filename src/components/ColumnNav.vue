<template>
    <nav class="column-nav">
        <ul>
            <div v-for="(url, i) in urls" :key="i" :class="url.toggle?'grow':'shrink'">
                <li :class="(isFocus(url.to)?'focus':'normal')" class="parent-li" @click="linkTo(url)">
                    <span><span class="icon" :class="url.class || ''"></span>{{url.label}}</span>
                    <div v-if="url.child" class="arrow" :class="url.toggle?'el-icon-caret-bottom':'el-icon-caret-left'"></div>
                </li>
                <div v-if="url.child" class="child" >
                    <li v-for="(child, i) in url.child"
                        :key="i"
                        class="child-li"
                        :class="(isFocus(child.to)?'focus':'normal') + ` ${child.class || ''}`"
                        @click.stop="linkTo(child)"
                    >
                        <span>{{child.label}}</span>
                    </li>
                </div>
            </div>

        </ul>
    </nav>
</template>
<script>
export default {
    props: {
        urls: {
            default: () => []
        }
    },
    computed: {},
    methods: {
        linkTo (url) {
            const { to, child } = url
            if (child) {
                url.toggle = !url.toggle
            } else if (this.$route.path !== to) {
                if (this.$route.path.indexOf('/frame/form') !== -1 && this.$route.params.mode !== 'view') {
                    this.$confirm('Do you want to leave this page', 'warning', {
                        confirmButtonText: 'ok',
                        cancelButtonText: 'cancel',
                        type: 'warning'
                    }).then(() => {
                        this.$router.push(to)
                    }).catch(() => {
                        // this.$message({
                        //     type: 'info',
                        //     message: 'cancel'
                        // });
                    })
                } else {
                    this.$router.push(to)
                }
            }
        },
        isFocus (to) {
            return this.$route.path.indexOf(to) !== -1
        }
    }
}
</script>
<style lang="less" scoped>
@deep-background: #1B1B1B;
@color-white: #fff;
@light-background: #313131;
@label-height: 50px;

.column-nav li{
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 14px;
    height: @label-height;
    color: @color-white;
    background: @light-background;
    cursor: pointer;
    line-height: @label-height;
    box-sizing: border-box;
    position: relative;

    &:hover{
        background: @deep-background !important;
        color: @color-white !important;
    }

    &:nth-child(n+2){
        border-top: #343434 1px solid;
    }
}

.parent-li{
    padding-left: 1em;
    padding-right: 2em;
    .icon{
        margin-right: .5em;
    }
}
.child-li{
    padding-left: 4em;
}
ul>div +div{
        border-top: #343434 1px solid;
}

.focus{
    position: relative;
    background: @deep-background;

    &::after{
        content: "";
        display: block;
        position:absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 4px;
        background: #2390FF;
    }
}
.arrow{
    color: @color-white;
    margin-left: 30px;
}
.shrink >li {
    background: #434343;
}
.shrink .child li{
    height: 0;
}
.child li{
    overflow:hidden;
    transition: height .3s;
}
</style>
