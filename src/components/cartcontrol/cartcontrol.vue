<template>
 <div class="cartcontrol">
     <div class="cart-decrese " v-show="food.count>0" @click="decreaseCart" transition="move">
         <span class="inner icon-remove_circle_outline"></span>
     </div>
     <div class="cart-count" v-show="food.count>0">
         {{food.count}}
     </div>
     <div class="cart-add icon-add_circle" @click="addCart"></div>
 </div>
</template>

<script type="text/ecmascript-6">

    import vue from "vue";

export default {

    data() {
        return {
            }
    },
    props: {
        food:{
            typeof:Object
        }
    },
    created(){
       
    },
    methods:{
        addCart(event){  // 添加商品进购物车
            if(!this.food.count){
                //this.food.count=1;  //不能这么写（无法检测新增属性变化） 当给一个观测对象添加一个不存在属性时 vue无法检测
                                        // 需要调用Vue的一个接口 vue.set('target','key',value)
                vue.set(this.food,'count',1)
            }else{
                this.food.count++;
            }
            // vue1.0中 vm.$dispatch 和 vm.$broadcast 被弃用，改用$emit,$on
            // 子组件通过$emit来触发事件，将参数传递出去
            // this.$emit('card-add',event.target);  ==> vue2这样写
            this.$dispatch('cart.add',event.target);

        },
        decreaseCart(){   // 从购物车删除商品
            if(this.food.count===0){
                return;
            }
            this.food.count--;
        }
        
    },
   
    components: {

    }
 }
</script>

<style scoped lang="stylus">
    .cartcontrol
        font-size:0
        .cart-decrese
            display :inline-block
            padding:6px
            transition :all 0.4s linear
            .inner
                font-size:24px
                line-height:24px
                color:rgb(0,160,220)
                transform:rotate(0)
                transition :all 0.4s linear
            &.move-transition 
                opacity:1
                transform :translate3d(0,0,0)
            &.move-enter , &.move-leave
                opacity:0
                transform :translate3d(24px,0,0)
                .inner
                    transform:rotate(180deg)
        .cart-count
            display :inline-block
            vertical-align :top
            width:12px
            padding-top:6px
            line-height:24px
            text-align :center
            color:rgb(147,153,159) 
            font-size:10px
        .cart-add
            display :inline-block
            font-size:24px
            line-height:24px
            padding:6px
            color:rgb(0,160,220)

</style>
