<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";

export default {
  name: 'App',
  components:{
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
