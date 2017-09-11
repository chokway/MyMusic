<template lang="html">
  <div class="header">
    <div class="side" @click="showPersonal">
      <i class="iconfont">&#xe675;</i>
    </div>
    <div class="main">
      <div class="nav-item">
        <router-link to="/mine">
          我的
        </router-link>
      </div>
      <div class="nav-item">
        <router-link to="/recommend">
          推荐
        </router-link>
      </div>
      <div class="nav-item">
        <router-link to="/charts">
          排行榜
        </router-link>
      </div>
    </div>
    <div class="side">
      <router-link to="/search">
        <i class="iconfont">&#xe660;</i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{}
  },
  methods: {
    showPersonal() {
      this.$store.dispatch('setShowPersonal', true);
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    background-color: #555555;
    font-size: 18px;
    height: 4rem;
    text-align: center;
    display: flex;
    justify-content: space-between;
    .side {
      line-height: 4rem;
      flex:  0 0 3rem;
      .iconfont {
        font-size: 1.5rem;
      }
    }
    .main {
      flex: 1;
      display: -webkit-flex;
      display: flex;
      margin: 0 3rem;
      .nav-item {
        flex: 1;
        line-height: 4rem;
        a{
          font-size: 1.1rem;
          color: #a2a2a2;
          &.active {
            color: #EDED57;
          }
        }
      }
    }
  }
</style>
