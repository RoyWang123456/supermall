<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0 //默认0和1都不滚动
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  data(){
    return{
      scroll:null
    }
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll=new BScroll(this.$refs.wrapper,{
      click:true,//button默认可以监听，div默认不可以监听，所以要设为true,使得可以监听
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })
    //2.监听滚动的位置
    if(this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll',(position) => {
        // console.log(position);
        this.$emit('scroll',position)
      })
    }
    //3.监听上拉事件
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    }
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp();
    },
    refresh(){
      // console.log('------')
      //先判断有没有值
      //刚开始计算高度，没有将图片计算在内，所以有一张图片加载完成，执行一次refresh,重新计算高度
      this.scroll && this.scroll.refresh && this.scroll.refresh();
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
