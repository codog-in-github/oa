<template>
  <div class=""></div>
</template>

<script>
export default {
  name: "App",
  components: {},
  created(){
    let p = new Promise((resolve,reject)=>{
      let xhr = new XMLHttpRequest();
      xhr.open('GET','http://127.0.0.1:81/oa/');
      xhr.withCredentials = true;
      xhr.send();
      xhr.onreadystatechange = function(){
        if(this.readyState  == 4){
          if(this.status>=200 && this.status<300){
            resolve(this.responseText);
          }else{
            reject('error');
          }
        }
      }
    });

    p.then((data)=>{
      console.log(data);
    },(reason)=>{
      console.log(reason);
    });
  },
  methods:{
    open() {
        this.$alert('checkyourmessage', 'OASystem', {
      confirmButtonText: '确定',
      callback: action => {
        this.$message({
          type: '',
          message: `action: ${ action }`
        });
      }
    });
    }
  }
};
</script>

<style>
</style>
