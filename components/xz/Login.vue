<template>
    <div class="login_container">
      <!-- xz/Login.vue -->
      <!-- 用户名 -->
      <mt-field placeholder="请输入用户名" v-model="uname" class="myinput"></mt-field>
      <!-- 密码 -->
      <mt-field type="password" placeholder="请输入密码" v-model="upwd" class="myinput"></mt-field>
      <!-- 登录按钮 -->
      <mt-button size="large" class="mybuttton" @click="login">登录</mt-button>
    </div>
</template>
<script>
export default {
    data(){
     return {
       uname:"tom",
       upwd:"123"   
     }
    },//data end
    methods:{
      login(){
        // 1.获取用户名和密码
        var u=this.uname;
        var p=this.upwd;
        // 2.创建一个正则表达式
        //   字母数字下划线3~12
         var reg=/^[0-9a-z_]{3,12}$/i;
       // 3.验证用户名 出错提示
       if(!reg.test(u)){
          this.$toast("用户格式不正确")
          return;
       }
        // 4.验证密码 出错提示
       if(!reg.test(p)){
          this.$toast("密码格式不正确")
          return;
       }
        // 5.发送ajax请求
        var url="login";
        var obj={uname:u,upwd:p}
        this.axios.get(url,{params:obj}).then(result=>{
            // console.log(result)
            if(result.data.code>0){
                this.$router.push('./Home');
            }else{
                this.$messagebox("提示",result.data.msg)
            }
        })
      }
    }
}
</script>
<style scoped>
   .login_container{
       padding-top:40px;
       background:#ddd;
   }  
</style>
