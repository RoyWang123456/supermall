<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="tab-controls" @tabClick="tabClick"
                 ref="tabControl1" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
    @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"
                   ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!--组件不能直接被监听，要想监听必须加上.native修饰符（监听组件根元素的原生事件）-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import HomeRecommendView from "@/views/home/childComps/HomeRecommendView";
import featureView from "@/views/home/childComps/featureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";

import {getHomeMultiData,getHomeGoods} from "network/home"
import {debounce} from "@/common/utils";


export default {
  name: "Home",
  components:{
    HomeSwiper,
    NavBar,
    HomeRecommendView,
    featureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    //回来时进行一次刷新
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY=this.$refs.scroll.getScrollY()
  },
  //存储请求过来的数据
  data(){
    return{
      // result:null
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
    }
  },
  //组件一旦创建就会回调的函数
  created(){
    //请求多个数据 调用函数
    this.getHomeMultiData();
    //请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,500)
    //事件总线监听item中图片加载完成
    this.$bus.$on('itemImageLoad',() => {
      // this.$refs.scroll.refresh();
      refresh()
    })
  },
  methods:{
    /**
     * 事件监听相关的方法
     */
    tabClick(index){
      switch (index){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick(){
      //拿到scroll组件的scrollTo方法
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      // console.log(position);
      //判断BackTop是否显示
      this.isShowBackTop = (-position.y)>1000
      //决定tabControl是否吸顶（position:fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      //$el:拿到tabControl组件的元素，因为组件没有offsetTop属性
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultiData(){
      getHomeMultiData().then(res => {
        // console.log(res);
        //箭头函数中this指向上一层级，在这里，this就是created中的this,那么created中的this就是组件对象，所以
        //this.result拿到的就是data里面的result,则就会把请求过来的数据保存到result中
        // this.result = res;
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        // console.log(res)
        //...把请求到的数据一个一个的保存起来
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1
        //完成下拉加载更多 必须调用，否则只能上拉加载一次，不能进行第三次，第四次的加载
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
  height: 100vh;
  /*子绝父相*/
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
/*在使用浏览器原生滚动时，固定导航的*/
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
/*吸顶效果*/
/*.tab-control{*/
/*  position: sticky;*/
/*  top: 44px;*/
/*  background-color: white;*/
/*  z-index: 9;*/
/*}*/
.content{
  overflow: hidden;
  /*子绝父相*/
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-controls{
  position: relative;
  background-color: white;
  /*z-index只对定位元素起效果*/
  z-index: 9;
}
/*.content{*/
/*  height: calc(100% - 93px);*/
/*  overflow: hidden;*/
/*  margin-top: 44px;*/
/*}*/
</style>
