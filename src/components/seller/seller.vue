<template>
    <div class="seller" v-el:seller>
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc border-1px">
                    <star :size="36" :score="seller.score"></star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}份</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favorite" @click="toggleFavorite">
                    <span class="icon-favorite" :class="{'active':favorite}"></span>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <split></split>
            <!-- 公告与活动 -->
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper border-1px">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul class="supports">
                    <li class="support-item border-1px" v-for="item in seller.supports">
                        <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
                        <span class="text">{{seller.supports[$index].description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" v-el:pic-wrapper>
                    <ul class="pic-list" v-el:pic-list>
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img :src="pic" alt="" height="90" width="120">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="info">
                <h1 class="title border-1px">商家信息</h1>
                <ul>
                    <li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

    <script type="text/ecmascript-6">
    import BScroll from "better-scroll";
    import star from "components/star/star";
    import split from "components/split/split";
    import {saveToLocal,loadFromLocal} from  "common/js/store";



export default {
    data() {
        return {
            favorite:(()=>{
                return loadFromLocal(this.seller.id,'favorite',false)
            })(),
            
        }
    },
    props: {
        seller: {
            typeof: Object
        }

    },
    computed:{
        favoriteText(){
            return this.favorite ? '已收藏' : '收藏';
        }
    },
    components: {
        star: star,
        split: split
    },
    watch: {
        'seller'() { // 监听到seller变化则执行此函数
            this._initScroll();
            this._initPics();
        }
    },
    methods: {
        _initScroll() {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$els.seller, {
                    click: true
                });
            } else {
                this.scroll.refresh();
            }
        },
        _initPics(){
             if(this.seller.pics){
                console.log('ul')
                let picWidth = 120;
                let margin = 6;
                let width = (picWidth + margin) * this.seller.pics.length - margin;
                this.$els.picList.style.width = width + 'px';
                
                this.$nextTick(() => {
                    if(!this.picScroll){
                        this.picScroll = new BScroll(this.$els.picWrapper,{
                            click:true,
                            scrollX:true,
                            eventPassthrough:'vertical' // eventPassthrough希望在另一个方向保留原生的滚动 值为vertical 或者 horizontal
                        });
                    }else{
                        this.picScroll.refresh();
                    }
                });
            }
        },
        toggleFavorite(e){
            this.favorite = !this.favorite;
            saveToLocal(this.seller.id , 'favorite', this.favorite);
        }
    },
    created() {  // 实例创建完成后的钩子函数 一般用于获取数据 //不能保证DOM被渲染
        this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    ready() { // 确认DOM被渲染好 能够安全使用DOM 
        // 因为seller是异步获取 所以渲染DOM的时候并没有获取seller 所以计算的高度是错误的 这时候需要使用watch监听 
        // ready在watch前执行
        this._initScroll();
        this._initPics();
        
       
    }
}
</script>

<style scoped lang="stylus">

    @import "../../common/stylus/mixin"
    .seller
        position:absolute
        top:174px
        left:0
        bottom:0
        width:100%
        overflow:hidden
        .seller-content
            .overview
                padding:18px
                position:relative
                .title
                    margin-bottom:8px
                    color:rgb(7,17,27);
                    line-height:14px
                    font-size:14px
                .desc
                    padding-bottom:18px
                    font-size:0
                    border-1px(rgba(7,17,27,.1))
                    .star
                        display:inline-block
                        vertical-align:top
                        margin-right: 8px 
                    .text
                        display:inline-block
                        vertical-align:top
                        margin-right:12px
                        font-size:10px
                        line-height:16px
                        color:rgb(77,85,93)
                .remark
                       padding:18px 0 0 0
                       display:flex
                       .block
                            flex:1
                            text-align:center
                            border-right:1px solid rgba(rgba(7,17,27,.1))
                            &:last-child
                                border:none
                            h2 
                                margin-bottom:4px
                                line-height:10px
                                color:rgb(147,153,159)
                                font-size:10px
                            .content
                                line-height:24px
                                font-size:10px
                                .stress
                                    font-weight:200
                                    color:rgb(7,17,27)
                                    font-size:24px
                .favorite
                    position:absolute
                    right:11px
                    top:18px
                    width:50px
                    text-align:center
                    .icon-favorite
                        display:block
                        line-height:24px
                        color:#d4d6d9
                        font-size:24px
                        margin-bottom:4px
                        &.active
                            color:rgb(240,20,20)
                    .text
                        line-height:10px
                        color:rgb(77,85,93)
                        font-size:12px
                    
            .bulletin
                padding:18px 18px 0 18px
                .title
                    margin-bottom:8px
                    color:rgb(7,17,27);
                    line-height:14px
                    font-size:14px
                .content-wrapper
                    padding: 0 12px 16px 12px
                    border-1px(rgba(7,17,27,.1))
                    .content
                        line-height:24px
                        font-size:12px
                        color:rgb(240,20,20)   
                        font-weight:200
                .supports
                    .support-item
                        padding:16px 12px
                        font-size:0
                        border-1px(rgba(7,17,27,.1)) 
                        &:last-child
                            border-none()
                        .icon
                            display:inline-block
                            height:16px
                            width:16px
                            vertical-align:top
                            margin-right:6px
                            background-repeat:no-repeat
                            background-size:16px 16px 
                            &.decrease
                                bg-image('decrease_4')
                            &.discount
                                bg-image('discount_4')
                            &.guarantee
                                bg-image('guarantee_4')
                            &.invoice
                                bg-image('invoice_4')
                            &.special
                                bg-image('special_4')
                        .text
                            display:inline-block
                            vertical-align:top
                            line-height:14px
                            font-size:12px
                            color:rgb(7,17,27)

    
            .pics
                padding:18px
                .title
                    margin-bottom:12px
                    color:rgb(7,17,27);
                    line-height:14px
                    font-size:14px
                .pic-wrapper
                    width:100%
                    overflow:hidden
                    white-space:nowrap
                    .pic-list
                        font-size:0
                        .pic-item
                            display:inline-block
                            margin-right:6px
                            width:120px
                            height:90px
                            &:last-child
                                margin-right:0

            .info
                padding:18px 18px 0 18px
                color:rgb(7,17,27);
                .title
                    padding-bottom:12px
                    line-height:14px
                    font-size:14px
                    border-1px(rgba(7,17,27,.1))
                .info-item
                    padding:16px 12px
                    font-weight:200
                    line-height:16px
                    border-1px(rgba(7,17,27,.1))
                    font-size:12px
                    &:last-child
                        border-one()
</style>
