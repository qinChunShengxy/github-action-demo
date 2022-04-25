<template>
  <div class="navbar">
    <hamburger id="hamburger-container" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <div class="right-menu__user">
        <img src="@/assets/default_user.png" />
        <span>张无忌</span>
      </div>
      <div class="right-menu__out" @click="logout">
        <i class="el-icon-switch-button" />
        <span>退出</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'

const router = useRouter()
const logout = async () => {
  // await store.dispatch('user/logout')
  router.push('/login')
}

const toggleSideBar = () => {}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  // display: flex;
  // padding: 0 20px;
  // justify-content: space-between;
  // background-image: url('@/assets/navbar_bg.png');
  // background-size: cover;
  // background-position: center center;
  // border-bottom: 1px solid #2f96e1;
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    // color: #fff;
    float: right;
    display: flex;
    align-items: center;
    height: 100%;
    padding-right: 25px;
    &__user {
      display: flex;
      align-items: center;
      padding-right: 40px;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 8px;
      }
    }
    &__out {
      cursor: pointer;
      transition: all 0.5s;
      i {
        padding-right: 5px;
      }
      &:hover {
        color: #5cb6ff;
      }
    }
  }
}
</style>
