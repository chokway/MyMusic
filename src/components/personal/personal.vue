<template lang="html">
  <transition name="fadeIn">
    <div class="personal" v-show="showPersonal">
      <div class="sidebar-con" >
        <div class="head">
          <div class="avatar">
            <img src="./timg.jpg" alt="">
          </div>
          <div class="name">
            飘飖流风
          </div>
        </div>
        <div class="menu">
          <ul>
            <li class="menu-item">
              <router-link to="">
                <i class="iconfont">&#xe60a;</i>
                <span>我的消息</span>
              </router-link>
            </li>
            <li class="menu-item">
              <router-link to="">
                <i class="iconfont">&#xe608;</i>
                <span>商城</span>
              </router-link>
            </li>
            <li class="menu-item">
              <router-link to="">
                <i class="iconfont">&#xe90b;</i>
                <span>我的好友</span>
              </router-link>
            </li>
            <li class="menu-item">
              <router-link to="">
                <i class="iconfont">&#xe60b;</i>
                <span>附近的人</span>
              </router-link>
            </li>
            <li class="menu-item">
              <router-link to="">
                <i class="iconfont">&#xe650;</i>
                <span>听歌识曲</span>
              </router-link>
            </li>
            <li class="menu-item">
              <router-link to="">
                <i class="iconfont">&#xe64f;</i>
                <span>定时停止播放</span>
              </router-link>
            </li>
            <li class="menu-item">
              <router-link to="">
                <i class="iconfont">&#xe643;</i>
                <span>设置</span>
              </router-link>
            </li>
            <li class="menu-item">
              <router-link to="">
                <i class="iconfont">&#xe646;</i>
                <span>关于我</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="mask" v-show="showPersonal" @click="hidePersonal"></div>
    </div>
  </transition>

</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {}
  },
  methods: {
    hidePersonal() {
      this.$store.dispatch('setShowPersonal', false)
    }
  },
  computed: {
    ...mapGetters([
      'showPersonal'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .fadeIn-enter-active, .fadeIn-leave-active{
    transition: all 0.5s ease-in;
  }
  .fadeIn-enter, .fadeIn-leave-active{
    transform: translateX(-80%);
    opacity: 0;
  }
  .personal {
      .sidebar-con {
        width: 80%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        .head {
          flex: 0 0 10rem;
          padding-left: .6rem;
          background: url("./beach.jpg") no-repeat fixed;
          box-sizing: border-box;
          .avatar {
            padding-top: 3rem;
            img {
              width: 4.3rem;
              height: 4.3rem;
              border-radius: 4.3rem;
            }
          }
          .name {
            margin-top: .75rem;
            font-size: 1.1rem;
          }
        }
        .menu {
          flex:1;
          background-color: #6F8A91;
          padding-left: .6rem;
          display: -webkit-flex;
          display: flex;
          height: 100vh;
          box-sizing: border-box;
          .menu-item {
            flex: 1;
            width: 100%;
            height: 3rem;
            line-height: 3rem;
            a{
              display: block;
              .iconfont {
                font-size: 1.1rem;
              }
              span {
                cursor: pointer;
              }
            }
            &:hover {
              .iconfont, span {
                color: #fff;
              }
            }
          }
        }
      }
      .mask {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0,0,0,.6);
        width: 100%;
        z-index: 998;
        margin: 0 auto;
      }
  }
</style>
