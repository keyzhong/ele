<template>
 <div v-show="showFlag" class="food" transition="move" v-el:food>
     <div class="food-content">
        <div class="image-header">
             <img class="img" :src="food.image" alt="" width="" >
             <div class="back" @click="hide">
                <i class="icon-arrow_lift"></i>  
             </div>
        </div>
        <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
                 <span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
                <span class="new">￥{{food.price}}</span>
                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="buy" v-show="!food.count || food.count===0" @click="addFirst" transition="fade">
                加入购物车
            </div>
            <div class="cartcontrol-wrapper" :food="food">
                <cartcontrol :food="food"></cartcontrol>
            </div>
        </div>
        <split  v-show="food.info"></split>
        <div class="info" v-show="food.info">
            <h1 class="title">商品介绍</h1>
            <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="ratings">
            <h1 class="title">商品评价</h1>
            <div class="ratingselect-wrapper">
                <ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="food.ratings" :desc="desc"></ratingselect>
            </div>
        </div>
     </div>
 </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from "better-scroll";
    import Vue from "vue";
    import cartcontrol from "components/cartcontrol/cartcontrol";
    import split from "components/split/split";
    import ratingselect from "components/ratingselect/ratingselect";

    const POSITIVE = 0;
    const NAGATIVE = 0;
    const ALL = 0;
    
 export default {
    data() {
        return {
            showFlag:false,
            selectType:ALL,
            onlyContent:true,
            desc:{
                all:'全部',
                positive:'推荐',
                negative:'吐槽',
            }
        }

    },
    props: {
        food:{
            type:Object
        }
    },
    components: {
        cartcontrol:cartcontrol,
        split:split,
        ratingselect:ratingselect

    },
    methods:{  // 被外部调用的方法命名不带下划线  私有的方法命名则带下划线 如_show(变成习惯)
        show(){
            this.showFlag=true;
            //  评论区域初始化 保证每次默认值相同
            this.selectType=ALL;
            this.onlyContent=true;

            this.$nextTick( ()=>{ // 调用后dom是重新渲染的 高度才会被计算到
                if(!this.scroll){
                    this.scroll = new BScroll(this.$els.food,{
                        click:true
                    })
                }else{
                   this.scroll.refresh(); 
                }
            });
        },
        hide(){
            this.showFlag=false;
        },
        addFirst(e){ 
            // 备注：这里的点击加入购物车后购物车直接display=none 会导致shopcart组件中
            // let rect = ball.el.getBoundingClientRect(); // 获得此元素相对视口的位置 返回对象包含相对视口偏移的x和y
            // 无法获取准确的位置 因为元素已经消失
            // 解决办法：给消失的元素加上过渡transition
            Vue.set(this.food,"count",1);
            // 调用父组件的event事件
            this.$dispatch('cart.add',e.target);
        }

    },
    computed:{
        
    }
 }
</script>

<style scoped lang="stylus">
    .food
        position:fixed
        left:0
        top:0
        bottom:48px
        z-index:30
        width:100%
        background :#fff
        &.move-transition
            transition:all 0.4s linear
            transform:translate3d(0,0,0)
        &.move-enter,&.move-leave
            transform:translate3d(100%,0,0)
        .image-header
            position :relative
            width:100%
            height:0
            padding-top:100%
            .img
                position:absolute
                top:0
                left:0
                width:100%
                height:100%
            .back
                position:absolute
                top:10px
                left:0
                .icon-arrow_lift
                    display:inline-block
                    padding:10px
                    font-szie:14px
                    color:#fff
        .content
            position :relative
            padding:18px
            .title
                margin-bottom:8px
                font-weight:700
                line-height :14px
                font-size:14px
                color:rgb(7,17,27)
            .detail
                margin-bottom:18px
                line-height:10px
                font-size:0
                .sell-count,.rating
                    font-size:10px
                    color :rgb(146,153,159)
                .sell-count
                    margin-right:12px
            .price
                font-weight:700
                line-height:24px
                .new
                    margin-right:8px
                    font-size:14px
                    color:rgb(240,20,20)
                .old
                    text-decoration:line-through
                    color:rgb(147,153,159)
                    font-size:10px
            .cartcontrol-wrapper
                position:absolute
                right:12px
                bottom:12px
            .buy
                position :absolute
                right:18px
                bottom:18px
                z-index:10
                height:24px
                line-height:24px
                padding:0 12px
                box-sizing:border-box
                font-size:10px
                border-radius:12px
                color:#fff
                background :rgb(0,160,220)
                transition: all 0.3s
                &.fade-transition
                    opacity:1
                &.fade-enter,&.fade-leave
                    opacity:0
        .info
            padding:18px
            .title
                font-size:16px
                line-height:36px
                margin-bottom:8px
            .text
                padding:0 8px
                line-height :24px
                font-weight:200
                color:rgb(77,85,93)
                font-size:12px
        .ratings
            padding:18px
            .title
                line-height:36px
                margin-bottom:6px
                font-size:16px
</style>
