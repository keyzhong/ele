<template>
 <div class="shopcart">
     <div class="content">
         <div class="content-left">
             <div class="logo-wrapper">
                <div class="logo" :class="{'highlight':totalCount>0}">
                    <i class="icon icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
                </div>
                <div class="num" v-show="totalCount>0">{{totalCount}}</div>
             </div>
            <div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
            <div class="desc" >另需配送费￥{{deliveryPrice}}元</div>
         </div>
         <div class="content-right" >
             <div class="pay" :class="payClass">
                 {{payDesc}}
             </div>
         </div>
     </div>
 </div>
</template>

<script type="text/ecmascript-6">
 export default {
 data() {
    return {

    }

    },
    props: {
        selectFoods:{   // 如果props为array或objiect 则为函数
            type:Array,
            default(){
                return [];
            }
        },
        deliveryPrice:{   // 配送费
            type:Number,
            default:0
        },
        minPrice:{      // 起送费
            type:Number,
            default:0
        }
    },
    computed:{
        totalPrice(){
            let total = 0;
            this.selectFoods.forEach((food)=>{
                total+=food.price * food.count
            });
            return total;
        },
        totalCount(){
            let count = 0;
            this.selectFoods.forEach((food)=>{
                count+= food.count
            });
            return count;
        },
        payDesc(){
            if(this.totalPrice === 0){
                return `￥${this.totalPrice}元起送`
            }else if(this.totalPrice < this.minPrice){
                let diff = this.minPrice - this.totalPrice;
                return `还差￥${diff}元起送`;
            }else{
                return '去结算'
            }
        },
        payClass(){
            if(this.totalPrice < this.minPrice){
                return 'not-enough';
            }else{
                return 'enough'
            }

        }
    },
    components: {

    }
 }
</script>

<style scoped lang="stylus">
    .shopcart
        position:fixed
        left:0
        bottom:0
        z-index:2
        background:#ccc
        width:100%
        height:48px
        .content
            display:flex
            background:#141d27
            font-size:0
            color:rgba(255,255,255,.4)
            .content-left
                flex:1
                .logo-wrapper
                    display:inline-block
                    position:relative
                    top:-10px
                    margin: 0 12px
                    padding:6px
                    width:56px
                    height:56px
                    box-sizing:border-box
                    vertical-align:top
                    border-radius:50%
                    background:#141d27
                    .logo
                        height:100%
                        width:100%
                        border-radius:50%
                        background:#2b333b
                        text-align:center
                        &.highlight
                            background:rgb(0,160,220)
                        .icon-shopping_cart
                            font-size:24px
                            line-height:44px
                            &.highlight
                                color:#fff
                    .num
                        position:absolute
                        top:0
                        right:0
                        height:16px
                        width:24px
                        line-height:16px
                        text-align:center
                        border-radius:16px
                        font-size:9px
                        font-weight:700
                        color:#fff
                        background:rgb(240,20,20)
                        box-shadow:0 4px 8px 0 rgba(0,0,0,.4)
                .price
                    display:inline-block
                    vertical-align:top
                    margin-top:12px
                    line-height:24px
                    padding-right:12px
                    box-sizing:border-box
                    color:#fff
                    border-right:1px solid rgba(255,255,255,.1)
                    font-size:16px
                    font-weight:700
                    &.highlight
                        color:rgb(240,20,20)
                .desc
                    display:inline-block
                    vertical-align:top
                    margin-top:12px
                    line-height:24px
                    padding-left:12px
                    box-sizing:border-box
                    font-size:10px
            .content-right
                flex: 0 0 105px
                width:105px
                height:48px
                .pay
                    background:#2b333b
                    line-height:48px
                    text-align :center
                    font-weight:700
                    font-size:12px
                    &.not-enough
                        background:#2b333b
                    &.enough
                        background:#00b43c
                        color:#fff


</style>
