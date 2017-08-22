<template>
 <div class="shopcart">
    <div class="content" @click="toggleList">
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
         <div class="content-right" @click.stop.prevent="pay">
             <div class="pay" :class="payClass">
                 {{payDesc}}
             </div>
         </div>
    </div>
    <div class="ball-container">
        <div class="ball" v-for="ball in balls" v-show="ball.show" transition="drop" >
            <div class="inner inner-hook" ></div>
        </div>
    </div> 
    <!-- 购物车详情     -->
    <div class="shopcart-list" v-show="listShow" transition="fold">
        <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" v-el:list-content>
            <ul>
                <li class="food border-1px" v-for="food in selectFoods">
                    <span class="name">{{food.name}}</span>
                    <div class="price">
                        <span>￥{{food.price*food.count}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol :food="food"></cartcontrol>
                    </div>
                    
                </li>  
            </ul>
        </div>
    </div>  
    <div class="list-mask" v-show="listShow" transition="fade" @click="hideList"></div>  
 </div>
 
</template>

<script type="text/ecmascript-6">
    import BScroll from "better-scroll";
    import cartcontrol from "components/cartcontrol/cartcontrol";
 export default {
    data() {
        return {
            balls:[
                {
                    show:false
                }
            ],
            dropBalls:[],  // 下落后的小球
            fold:true,   // 购物车是否展开  //fold =>折叠
        }

    },
    props: {
        selectFoods:{   // 如果props为array或objiect 则default为函数
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
        },
        listShow(){
            if(!this.totalCount){
                this.fold = true;
                return false;
            }
            let show =!this.fold;
            if(show){
                this.$nextTick( ()=>{
            console.log(this.$els)
                    if(!this.scroll){
                        this.scroll= new BScroll(this.$els.listContent,{
                            click:true
                        });

                    }else{
                        this.scroll.refresh();
                    }
                })
            }
            console.log('show'+show)
            return show;
        }

    },
    components: {
        cartcontrol:cartcontrol
    },
    methods:{
        drop(el){  // 点击后将球设置显示
            for(let i=0;i<this.balls.length; i++){
                let ball =this.balls[i];
                if(!ball.show){
                    ball.show=true;
                    ball.el = el;
                    this.dropBalls.push(ball)
                    return;
                }
            }
        },
        toggleList(){
             if(!this.totalCount){
                 return ;
             }
             this.fold = !this.fold;
             console.log(this.fold)
        },
        empty(){
            this.selectFoods.forEach( (food)=>{
                food.count = 0;
            })
        },
        hideList(){
            this.fold=true;
        },
        pay(){
            if(this.totalPrice<this.minPrice){
                return ;
            }
            window.alert(`支付${this.totalPrice}元`);
        }
    },
    transitions:{  // vue提供 transition的钩子
        drop:{      // transition的名称
            beforeEnter(el){
                console.log('beforeEnter');
                let count = this.balls.length;
                while(count--){
                    let ball =this.balls[count];
                    if(ball.show){
                        let rect = ball.el.getBoundingClientRect(); // 获得此元素相对视口的位置 返回对象包含相对视口偏移的x和y
                        let x = rect.left-32;
                        let y =-(window.innerHeight-rect.top-22);
                        el.style.display='';
                        console.log(y)
                        el.style.webkitTransform=`translate3d(0,${y}px,0)`;
                        el.style.transform=`translate3d(0,${y}px,0)`;
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform=`translate3d(${x}px,0,0)`;
                        inner.style.transform=`translate3d(${x}px,0,0)`;
                    }
                }
            },
            enter(el){
                console.log('enter')
                /* eslint-disabled no-unused-vars*/  // 因为rf没有被引用 防止eslint报错
                let rf = el.offsetHeight;// 触发浏览器重绘
                this.$nextTick(()=>{
                    el.style.display='';
                    el.style.webkitTransform='translate3d(0,0,0)';
                    el.style.transform='translate3d(0,0,0)';
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform='translate3d(0,0,0)';
                    inner.style.transform='translate3d(0,0,0)'; 
                })
            },
            afterEnter(el){
                console.log('afterEnter')
                let ball =this.dropBalls.shift();
                ball.show=false;
                el.style.display='none';
            }
        }
    }
 }
</script>

<style scoped lang="stylus">
    @import '../../common/stylus/mixin.styl'
    .shopcart
        position:fixed
        left:0
        bottom:0
        z-index:200
        background:#ccc
        width:100%
        height:48px
        .content
            position:relative
            display:flex
            background:#141d27
            font-size:0
            color:rgba(255,255,255,.4)
            z-index:42
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


        .ball-container
            .ball
                position:fixed
                left:32px
                bottom:22px
                z-index:200
                &.drop-transition
                    transition:all 0.4s cubic-bezier(.14,-0.12,.82,.23)
                    .inner
                        width :16px
                        height:16px
                        border-radius:50%
                        background:rgb(0,160,220)
                        transition: all 0.4s linear

        .shopcart-list
            position :absolute
            top:0
            left:0
            z-index:41
            width:100%
            background:#fff
            &.fold-transition
                transition:all 0.5s
                transform:translate3d(0,-100%,0)
                &.fold-enter,&.fold-leave
                    transform:translate3d(0,0,0)
            .list-header
                height:40px
                font-weight:200
                font-size:24px
                line-height:40px
                padding:0 18px
                background:#f3f5f7
                border-bottom:1px solid rgba(7,17,27,.1)
                .title
                    float:left
                    font-size:14px
                    color:rgb(7,17,27)
                .empty
                    float:right
                    font-size:12px
                    color:rgb(0,160,220)
            .list-content
                padding:0 18px
                max-height:217px
                background:#fff
                overflow:hidden
                .food
                    position:relative
                    padding: 12px 0
                    box-sizing:border-box
                    border-1px(rgba(7,17,27,.1))
                    .name
                        line-height:24px
                        font-size:14px
                        color:rgb(7,17,27)
                    .price
                        position:absolute
                        right:90px
                        bottom:12px
                        line-height:24px
                        font-size:14px
                        font-weight:700
                        color:rgb(240,20,20)
                    .cartcontrol-wrapper
                        position:absolute
                        right:0
                        bottom:6px    




    .list-mask
        position:fixed
        top:0
        left:0
        width:100%
        height:100%
        z-index:2
        transition:all 0.5s
        &.fade-transition
            opacity:1
            background:rgba(7,17,27,.6)
            &.fade-enter,&.fade-leave
                opacity:0
                background:rgba(7,17,27,0)
</style>
