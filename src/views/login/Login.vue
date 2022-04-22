<template>
  <div class="login-container">
    <el-form ref="formRef" :model="loginForm" :rules="loginRules" class="login-form">
      <div class="title-container">
        <h3 class="title">{{ APP_DATA.TITLE }}</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          @keyup.enter="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        class="login-form__btn"
        size="large"
        :loading="loading"
        type="primary"
        @click.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, toRefs, reactive, nextTick } from 'vue'
import { validUsername } from '@/utils/validate'

const router = useRouter()
const validateUsername = (rule, value, callback) => {
  if (!validUsername(value)) {
    callback(new Error('请输入正确的用户名'))
  } else {
    callback()
  }
}
const validatePassword = (rule, value, callback) => {
  if (value.length <= 0) {
    callback(new Error('密码不能为空'))
  } else {
    callback()
  }
}
const state = reactive({
  APP_DATA: config,
  loginForm: {
    username: '',
    password: ''
  },
  loginRules: {
    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
    password: [{ required: true, trigger: 'blur', validator: validatePassword }]
  }
})
const loading = ref(false)
const passwordType = ref('password')
const password = ref(null) // 页面中定义的ref
const formRef = ref()
const showPwd = () => {
  if (passwordType.value === 'password') {
    passwordType.value = ''
  } else {
    passwordType.value = 'password'
  }
  nextTick(() => {
    password.value.focus()
  })
}
const handleLogin = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true
        // const data = await store.dispatch('user/login', state.loginForm)
        // if (data.code !== 200) {
        //   loading.value = false
        //   return
        // }
        setTimeout(() => {
          loading.value = false
          router.push('/')
        }, 1000)
      } catch (e) {
        console.log(e)
        loading.value = false
      }
    }
  })
}

const { APP_DATA, loginForm, loginRules } = toRefs(state)
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      box-shadow: none;
      &:focus,
      &:hover,
      &:active {
        box-shadow: none;
      }

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    &.is-error {
      .el-input__inner,
      .el-input__inner:focus {
        box-shadow: none;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    &__btn {
      width: 100%;
      margin-bottom: 30px;
    }
  }

  .svg-container {
    font-size: 16px;
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
