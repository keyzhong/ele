<template>
  <div >
    <v-header :seller="seller">
      
    </v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item" >
        <a v-link="{path:'/ratings'}">评价</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
    <goods></goods>
    <router-view></router-view>   
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header';
  import goods from './components/goods/goods';

  const err_ok = 0; // 便于判断和修改

  export default{
    data() {
      return {
        seller:{}
      }
    },
    created() { // created表示实例已经创建完成之后被调用 一般可以在created函数中调用ajax获取页面初始化所需的数据。
      this.$http.get('/api/seller').then((response) => {
        console.log(response)
        response = response.body;
        if(response.errno===err_ok){
          this.seller=response.data;
          console.log(this.seller);
        }
      })
    },
    components: {  //引用的组件
      'v-header': header,
      'goods' :goods
    }
  };
</script>

<style scoped lang="stylus">
  @import "./common/stylus/mixin.styl";
    .tab
      display:flex
      width:100%
      height:40px
      line-height 40px
      border-1px(rgba(7,17,27,.1))
      .tab-item
        flex:1
        text-align :center
        & > a
          display :block
          font-size:14px
          color :rgb(77, 85, 93)
          &.active
            color:#69c
</style>
