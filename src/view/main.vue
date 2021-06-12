<template>
  <div>
    <div><el-button type="warning" @click="doLogout">logout</el-button></div>
    <div>
        <edit-table :col='col' :data='data'/>
    </div>
  </div>
</template>
<script>
import { logout, getTableConfig } from "@/axios/main";
import EditTable from '../components/editTable.vue';

export default {
  data() {
    return {
        col:[],
        data:[]
    }
  },
  created(){
      getTableConfig(
          'main',
          (data)=>{
              this.col = data;
          },
          this.$store,
          this.$router
      );
  },
  methods: {
    doLogout() {
      logout(this.$store, this.$router);
    },
  },
  components: {
    EditTable
  },
};
</script>