<template>
<div class="root">
  <router-view></router-view>
  </div>
</template>

<script>
import { checkLoginStatus, clearStrage } from './api/main'

export default {
    name: 'App',

    components: {},
    beforeCreate () {
        clearStrage().then(last => {
            if (last !== localStorage.getItem('last')) {
                localStorage.clear()
                localStorage.setItem('last', last)
            }
        })

        checkLoginStatus().then(userInfo => {
            this.$store.commit('updateUserInfo', userInfo)
        })
    },
    methods: {

    }
}
</script>
