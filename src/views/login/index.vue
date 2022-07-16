<template>
  <!-- Login -->
  <div id="login">
    <div id="login-form">
      <h1>登陆界面</h1>
      <label for="name"><i class="el-icon-user-solid" style="color: #c1c1c1"></i></label>
      <input type="text" placeholder="用户名" id="name" autocapitalize="off" v-model.trim=name aria-autocomplete="off">
      <p style="visibility: hidden">用户名为必填选项</p>
      <label for="password"><i class="el-icon-right" style="color: #c1c1c1"></i></label>
      <input type="password" placeholder="密码" id="password" autocapitalize="off" v-model.trim="password">
      <p style="visibility: hidden">密码为必填选项</p>
      <div>
        <el-button type="primary" v-on:click="inputInfo">登录</el-button>
        <el-button type="info" v-on:click="resetInfo">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      name: '',
      password: '',
    }
  },
  methods: {
    // 清空当前填写信息
    resetInfo: function () {
      this.name = "";
      this.password = "";
    },
    // 验证信息是否正确
    inputInfo: function () {
    //   if (this.name !== "admin@qq.com") {
    //     this.password = "";
    //     return 'err';
    //   }
    //   if (this.password !== "12345678") {
    //     this.password = "";
    //     return 'err';
    //   }
      // 返回上面 , 提交信息
    //   this.requestInfo();
      // 跳转到 /home
      this.$router.push("/main");
    }
  },
  computed: {

  },
  mounted() {
    // css transition 样式
    let input = document.querySelectorAll("input");
    let label = document.querySelectorAll("label")
    let is = document.querySelectorAll("i");
    for (let i = 0; i < input.length; i++) {
      input[i].addEventListener("click", function () {
        input[i].style.width = '70%';
        input[i].style.transition = '1s';
        label[i].style.width = '70%';
        label[i].style.transition = '1s';
        is[i].style.color = '#037db3';
      })
      input[i].addEventListener("blur", function () {
        input[i].style.width = '60%';
        input[i].style.transition = '1s';
        label[i].style.width = '60%';
        label[i].style.transition = '1s';
        is[i].style.color = '#c1c1c1';
      })
    }
    document.onkeydown=(e)=>{
        if(e.keyCode==13){
            this.inputInfo();
        }
    }
  },
  watch: {
    // 动态监测,验证 input 中 值的输入
    name: function f() {
      let p = document.querySelectorAll("p");
      if (this.name.length < 1) {
        p[0].innerHTML = "用户名称应大于 1 ";
      }
      if (this.name.length >= 1) {
        p[0].style.visibility = "hidden";
      }
      if (this.name.length === 0) {
        p[0].style.visibility = "visible";
      }
    },
    password: function f() {
      let p = document.querySelectorAll("p");
      if (this.password.length < 8) {
        p[1].style.visibility = "visible";
        p[1].innerHTML = "用户密码应大于 8 ";
      }
      if (this.password.length >= 8) {
        p[1].style.visibility = "hidden";
      }
      if (this.password.length === 0) {
        p[1].innerHTML = "请重新输入密码";
        p[1].style.visibility = "visible";
      }
    }
  }
}
</script>

<style lang="less" scoped>
#login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  // 背景图片样式
  background-image: url("../../../public/static/login.jpg");

//   background-image: url("/public/static/img/login.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}

#login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50vw;
  min-width: 300px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  // 表单 box-shadow 样式 好看
  box-shadow: 0 15px 25px rgba(0, 0, 0, .5);

  h1 {
    width: 60%;
    margin: 50px auto 0;
    color: #c1c1c1;
    text-align: center;
  }

  input {
    width: 60%;
    margin: 0 auto;
    // 注意 border outline 默认值
    outline: none;
    border: none;
    padding: 10px;
    border-bottom: 1px solid #fff;
    background: transparent;
    color: white;
  }

  label {
    width: 60%;
    margin: 0 auto;
    position: relative;
    top: 30px;
    left: -15px;
  }

  div {
    width: 60%;
    margin: 10px auto;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  button {
    // rgba
    background-color: rgba(9, 108, 144, 0.5);
    margin: 10px 25px 40px 25px;
  }

  p {
    width: 60%;
    margin: 8px auto;
    position: relative;
    left: -15px;
    color: #ff0000;
    font-size: 8px;
  }
}
// 浏览器兼容 , 针对谷歌浏览器 默认设置的 奇怪样式
input {
  -webkit-text-fill-color: #ffffff !important;
  transition: background-color 5000s ease-in-out ,width 1s ease-out!important;
}

</style>