<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <ul>
      <li>eeee</li>
      <li>eeee</li>
      <li>eeee</li>
      <li>eeee</li>
      <li>eeee</li>
      <li>eeee</li>
    </ul>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import {getDetail,Goods} from "@/network/detail";

export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
  },
  data(){
    return{
      iid:null,
      topImages:[],
      goods:null
    }
  },
  created() {
    //保存传入的iid
    this.iid=this.$route.params.iid
    //根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res)
      //获取顶部图片轮播数据
      const data=res.data.result
      this.topImages = data.itemInfo.topImages
      //获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
    })
  }
}
</script>

<style scoped>

</style>
