<template>
    <!-- goods设置绝对定位 固定视口 -->
<div class="goods">  
     <!-- 侧边栏导航 -->
     <!--v-el获取dom对象 必修用中横线连接 不能用驼峰-->
    <div class="menu-wrapper"  v-el:menu-wrapper>
        <ul>
            <li v-for="item in goods" class="menu-item" :class="{'current':currentIndex===$index}" @click="selectMenu($index,e)">
                <span class="text  border-1px"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
            </li>
        </ul>
    </div>
    <!-- 商品 -->
    <div class="foods-wrapper" v-el:foods-wrapper>
        <ul>
            <li class="food-list food-list-hook" v-for="item in goods" >
                <h1 class="title">{{item.name}}</h1>
                <ul>
                    <li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food,$event)">
                        <div class="icon">
                            <img width="57" height="57" :src="food.icon" alt="">
                        </div>
                        <div class="content">
                            <h2 class="name">{{food.name}}</h2>
                            <p class="desc">{{food.description}}</p>
                            <div class="extra">
                                <span class="count">月售{{food.sellCount}}份</span>
                                <span>好评率{{food.rating}}%</span>
                            </div>
                            <div class="price">
                                <span class="new">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cartcontrol :food="food"></cartcontrol>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <shopcart v-ref:shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>    
    <food :food="selectedFood" v-ref:food></food>
 </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from "better-scroll";
    import shopcart from "components/shopcart/shopcart";
    import cartcontrol from "components/cartcontrol/cartcontrol";
    import food from "components/food/food";
    const err_ok = 0;

 export default {
    data() {
        return {
            goods:[],
            listHeight:[],
            scrollY:0,
            selectedFood:{}
        };

    },
    computed:{
        currentIndex(){   // 计算当前的选项
            for(let i=0; i<this.listHeight.length; i++){
                let height1 =this.listHeight[i];
                let height2 =this.listHeight[i+1];
                if(!height2 ||(this.scrollY>=height1 && this.scrollY<height2)){
                    // console.log('i'+ i)
                    return i;
                }
            }
        },
        selectFoods(){
            let foods = [];
            this.goods.forEach( (good)=> {
                good.foods.forEach( (food) => {
                    if(food.count){
                        foods.push(food);
                    }
                })
            })
            return foods;
        }
    },
    created(){
        this.classMap=['decrease','discount','guarantee','invoice','special'];
        this.$http.get('/api/goods').then((response) => {
            response = response.body
            if(response.errno===err_ok){
                this.goods=response.data;
                this.$nextTick(() => {
                    this._initScroll();
                    this._calculateHeight();
                });  
            }
        });
    },
    methods:{
        _initScroll(){
            this.menuScroll = new BScroll(this.$els.menuWrapper,{   // bscroll默认一些touch click事件
                click:true
            });
            this.foodsScroll = new BScroll(this.$els.foodsWrapper,{
                click:true,
                probeType:3
            });

                this.foodsScroll.on('scroll',(pos)=>{     // 实时监听滚动 获取滚动的Y值
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
        },
        _drop(target){

            // 体验优化 异步执行下落动画
           this.$nextTick(()=>{
                // 访问子组件
                this.$refs.shopcart.drop(target);
            })
        },
           
        _calculateHeight(){
            let foodList = this.$els.foodsWrapper.querySelectorAll('.food-list-hook'); // 每个区间
            let height = 0;
            this.listHeight.push(height);
            for(let i =0; i<foodList.length;i++){
                let item  =foodList[i];
                height+=item.clientHeight;
                this.listHeight.push(height);  // 获得每个区间的高的数组
            }
            console.log(this.listHeight)
        },

        selectMenu(index,e) {
            // if(!e._constructed){
            //     return;
            // }
            let foodList = this.$els.foodsWrapper.querySelectorAll('.food-list-hook');
            let el = foodList[index];
            this.foodsScroll.scrollToElement(el,300)
            console.log(index)
        },
        selectFood(food,event){
            this.selectedFood = food;
            console.log (this.$refs.food)
            this.$refs.food.show();
        }
    },
    events:{
        'cart.add'(target){
            this._drop(target);
        }
    },
    props:{
        seller:{
            type:Object
        }
    },
    components: {
        shopcart:shopcart,
        cartcontrol:cartcontrol,
        food:food
    }
}
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/mixin.styl"

    .goods
        display:flex
        position:absolute
        top:174px
        bottom:46px
        width:100%
        overflow:hidden
        .menu-wrapper
            flex: 0 0 80px
            width:80px
            background:#f3f5f7
            .menu-item
                display:table
                height:54px
                width:56px
                line-height:14px
                font-weight:200
                font-size:0
                padding:0 12px
                &.current
                    position:relative
                    margin-top:-1px
                    z-index:10
                    background:#fff
                    font-weight:700
                    .text
                        border:none
                .icon
                    display:inline-block
                    vertical-align:top
                    height:12px
                    width:12px
                    margin-right:2px
                    background-size:12px 12px
                    background-repeat:no-repeat
                    &.decrease
                        bg-image('decrease_3')
                    &.discount
                        bg-image('discount_3')
                    &.guarantee
                        bg-image('guarantee_3')
                    &.invoice
                        bg-image('invoice_3')
                    &.special
                        bg-image('special_3') 
                .text
                    display:table-cell
                    vertical-align:middle
                    width:56px
                    border-1px(rgba(7,17,27,.1))
                    font-size:12px
        .foods-wrapper
            flex:1
            .title
                padding-left:14px
                height:26px
                line-height:26px
                border-left: 2px solid #d9dde1
                font-size:12px
                color:rgb(147,153,159)
                background:#f3f5f7
            .food-item
                display:flex
                margin: 18px
                padding-bottom:18px
                border-1px(rgba(7,17,27,.1))
                &:last-child
                    border-none()
                    margin-bottom:0
                .icon
                    flex:0 0 57px
                    margin-right:10px
                .content
                    flex:1
                    .name
                        margin:2px 0 8px 2px
                        height:14px
                        line-height:14px
                        font-size:14px
                        color:rgb(7,17,27)
                    .desc , .extra
                        color:rgb(147,153,159)
                        font-size:10px
                    .desc
                        margin-bottom:8px
                        line-height:12px
                    .extra
                        line-height:10px
                        .count
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
                        position :absolute
                        right:0
                        bottom:12px

</style>
