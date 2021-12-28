<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.show.img" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return{}
      }
    }
  },
  methods:{
    imageLoad(){
      //使用事件总线发射事件
      this.$bus.$emit('itemImageLoad')
    },
    itemClick(){
      this.$router.push('/Detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
.goods-item{
  padding-bottom:35px;
  position: relative;
  width: 48%;
}
.goods-item img{
  width: 100%;
  border-radius: 5px;
}
.goods-info{
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p{
  overflow: hidden;
  margin-bottom: 3px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.price{
  margin-right:20px;
  color: var(--color-high-text);
}
.collect{
  position: relative;
}
.collect::before{
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  top: 0;
  left: -15px;
  background: url("~assets/img/common/collect.svg") 0 0/12px 12px;
}
</style>
