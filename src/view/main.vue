<template>
  <div>
    <div><el-button type="warning" @click="doLogout">logout</el-button></div>
    <div>
        <edit-table :cols='cols' :data='data'/>
    </div>
  </div>
</template>
<script>
import { logout, getTableConfig, getTableData } from "@/api/main";
import EditTable from '../components/editTable.vue';

export default {
  data() {
    return {
        tableId:1,
        cols:[],
        data:[]
    }
  },
  created(){
      getTableConfig(
          this.tableId,
          (data)=>{
              this.cols = data;
          },
          this.$store,
          this.$router
      ).then(()=>getTableData(
          this.tableId,
          this.cols,
          (data)=>{
              this.data = data;
          },
          this.$store,
          this.$router
      ));
      
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