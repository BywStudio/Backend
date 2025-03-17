<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import http from '@/http/request.js'

const router = useRouter()
const isSignUp = ref(true)

const form = ref({
  user_name: '',
  phone: '',
  password: '',
  confirm_password: ''
})

function submit() {
  // 登录情况下
  if(!form.value.phone || !form.value.password) {
    return ElMessage({
      type: 'warning',
      message: '请输入手机号和密码'
    })
  }
  if(form.value.phone.length !== 11) {
      return ElMessage({
        type: 'error',
        message: '手机号必须为11位'
      })
  }
  if(!form.value.password) {
    return ElMessage({
      type: 'warning',
      message: '请输入密码并且不少于6位'
    })
  }
  if(form.value.password.length < 6) {
    return ElMessage({
      type: 'warning',
      message: '密码不能少于6位'
    })
  }
  if(isSignUp.value === true) {
    http.post('/users/login', form.value).then((req, res) => {
      if(req.data.code === 200) {
        ElMessage({
          type: 'success',
          message: '登录成功'
        })
        setTimeout(() => {
          router.push({name: 'home'})
        }, 3000);
      }else if(req.data.code === 400){
        return ElMessage({
          type: 'error',
          message: '还没有账号哦, 点击去注册吧'
        })
      }else {
        return ElMessage({
          type: 'error',
          message: '手机号或密码错误'
        })
      }
    })
  }
  // 注册情况下
  if(isSignUp.value === false){
    // 判断用户名、手机号
    if(!form.value.user_name || !form.value.phone) {
      return ElMessage({
        type: 'warning',
        message: '用户名和手机号不能为空'
      })
    }
    // 真正的手机号需要用正则判断
    if(form.value.phone.length !== 11) {
      return ElMessage({
        type: 'error',
        message: '手机号必须为11位'
      })
    }
    // 判断密码
    if(form.value.password.length < 6 && form.value.confirm_password.length < 6){
      return ElMessage({
        type: 'error',
        message: '密码不能小于6位'
      })
    }
    if(form.value.password !== form.value.confirm_password){
      return ElMessage({
        type: 'error',
        message: '两次密码输入不一致'
      })
    }
    http.post('/users/create', form.value).then((req, res) => {
      if(req.data === '用户已存在') {
        ElMessage({
          type: 'error',
          message: '用户已存在, 可以直接登录哦'
        })
      }else {
        ElMessage({
          type: 'success',
          message: '注册成功'
        })
      }
    })
    // localStorage.setItem("phone", form.value.phone)
    // localStorage.setItem("password", form.value.password)
  }
}

</script>

<template>
  <div class="html">
    <div class="container">
      <div class="title">
        <h1>{{ isSignUp ? 'Hello Friend' : 'Sign Up'}}</h1>
        <h2>{{ isSignUp ? '登录' : '注册'}}</h2>
        <el-button 
          type="primary" 
          @click="isSignUp = !isSignUp" 
          round
          style="background-color: inherit"
        >
          {{ isSignUp ? '注册' : '登录'}}
        </el-button>
      </div>
      <div class="form">
        <h1>{{ isSignUp ? 'Sign In' : 'Hello Friend'}}</h1>
          <a href="#" v-if="isSignUp">忘记密码?</a>
          <p v-else>Create Account</p>
        <el-form class="input" action="post">
          <el-form-item>
            <el-input placeholder="用户名" v-model="form.user_name" v-if="!isSignUp"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="手机号" v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="密码" v-model="form.password" type="password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="确认密码" v-model="form.confirm_password" v-if="!isSignUp" type="password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" id="button" plain @click="submit">{{ isSignUp ? '登录' : '注册'}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.html {
  position: relative;
  min-width: 100vw;
  min-height: 100vh;
  background: linear-gradient(to right bottom, rgb(92, 76, 212), #3ba8a6);
  .container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: #000;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 45rem;
    max-height: 30rem;
    background-color: #fff;
    border-radius: 20px;
    // border: 1px solid #ddd;
    margin: auto;
    display: flex;
    justify-content: space-between;
    box-shadow: -20px 16px 20px rgb(92, 76, 212);
    .title {
      color: #fff;
      background-color: rgb(33, 64, 203);
      width: 40%;
      border-radius: 20px 30% 25% 20px;
      text-align: center; 
      padding-top: 10rem;
      h2 {
        margin-top: 1.5rem;
        margin-bottom: 5rem;
      }
    }
    .form {
      width: 60%;
      border-radius: 0 20px 20px 0;
      padding-top: 5rem;
      text-align: center;
      // background-color: pink;
      h1 {
        margin-bottom: 2rem;
      }
      .v-enter-active,
      .v-leave-active {
        transition: all 0.5s ease-in-out;
      }
      .v-enter-from,
      .v-leave-to {
        opacity: 0;
      }
      a {
        color: #7d7a7a;
        display: block;
        margin-bottom: 2rem;
        &:hover {
          color: #000;
          transition: all ease-in-out 0.5s;
        }
      }
      p {
        margin-bottom: 2rem;
        color: #7d7a7a;
      }
      .input {
        margin: 0 auto;
        width: 70%;
        #button {
          margin: 0 auto;
          margin-top: 1rem;
        }
      }
    }
  }
}

</style>