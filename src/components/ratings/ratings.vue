<template>
 <div class="ratings" v-el:ratings>
     <div class="rating-content">
        <div class="overview">
            <div class="overview-left">
                <h1 class="score">{{seller.score}}</h1>
                <div class="title">综合评分</div>
                <div class="rank">高于周边商家{{seller.rankRate}}%</div>
            </div>
            <div class="overview-right">
                <div class="score-wrapper">
                    <span class="title">服务态度</span>
                    <star class="star" :size='36' :score='seller.serviceScore'></star>
                    <span class="score">{{seller.serviceScore}}</span>
                </div>
                <div class="score-wrapper">
                    <span class="title">商品评分</span>
                    <star class="star" :size='36' :score='seller.foodScore'></star>
                    <span class="score">{{seller.foodScore}}</span>
                </div>
                <div class="delivery-wrapper">
                    <span class="title">送达时间</span>
                    <span class="time"> {{seller.deliveryTime}}分钟</span>
                </div>
            </div>
        </div>
        <split></split>
        <!-- 评论区 -->
        <h1 class="rating-title">商品评价</h1>
        <ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings" :desc="desc"></ratingselect>
        <div class="rating-wrapper">
            <ul>
                <li v-for="rating in ratings" class="rating-item border-1px" v-show="needShow(rating.rateType,rating.text)">
                    <div class="avatar">
                        <img :src="rating.avatar" alt="" width="28" height="26" class="img">
                    </div>
                    <div class="content">
                        <h1 class="name">{{rating.username}}</h1>
                        <div class="star-wrapper">
                            <star class="star" :size="24" :score="rating.score"></star>
                            <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                        </div>
                        <p class="text">{{rating.text}}</p>
                        <div class="recommend" v-show="rating.recommend.length">
                            <i class="icon-thumb_up"></i>
                            <span v-for="item in rating.recommend" class="item">{{rating.recommend[$index]}}</span>
                        </div>
                        <div class="time">
                            {{rating.rateTime | formatDate}}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
 </div>
</template>

<script type="text/ecmascript-6">
    import {formatDate} from "common/js/date";
    import star from 'components/star/star';
    import split from "components/split/split";
    import ratingselect from "components/ratingselect/ratingselect";
    import BScroll from "better-scroll";

    const ALL = 2;
    const ERR_OK = 0;

 export default {
    data() {
        return {
            ratings:[],
            selectType:ALL,
            onlyContent:true,

        }

    },
    created(){
        this.$http.get('/api/ratings').then( (res) =>{
            res = res.body;
            if(res.errno === ERR_OK){
                this.ratings = res.data;
                this.$nextTick(() => {
                    console.log(0)
                    this.scroll = new BScroll(this.$els.ratings,{
                        click:true
                    });
                });
            }
        });
    },
    events:{  // 子组件触发事件传递参数过来
        'ratingType-select'(type){
            this.selectType=type;
            this.$nextTick( ()=>{  // 改变数据的时候 Vue DOM更新是异步的 下一个时间周期（$nextTick触发之后）DOM才会更新 
                this.scroll.refresh(); 
            })
        },
        'onlyContent-select'(onlyContent){
            this.onlyContent=onlyContent;
            this.$nextTick( ()=>{ 
                this.scroll.refresh(); 
            })
             
        }
    },
    props:{
        seller:{
            typeof:Object
        }
    },
    filters:{
        formatDate(time){
            let date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm");
        }
    },
    components: {
        star:star,
        split:split,
        ratingselect,ratingselect
    },
    methods:{
        needShow(type,text){
            if(this.onlyContent && !text){  // 只看有内容 并且 传进来的的rating没有内容
                return false;
            }
            if(this.selectType === ALL){ // 选中显示所有的
                return true;
            }else{
                return type ===this.selectType;// 返回这条类型和选择类型相同的
            }
        }
    }
 }
</script>

<style scoped lang="stylus">

    @import "../../common/stylus/mixin"

    .ratings
        position:absolute
        top:174px
        left:0
        bottom:0
        width:100%
        overflow:hidden
        .overview
            display:flex
            padding:18px 0
            .overview-left
                flex:0 0 137px
                text-align:center
                border-right:1px solid rgba(7,17,27,.2)
                vertical-align :middle
                font-size:0
                padding:6px 0
                @media only screen and (max-device-width:320px)
                    flex:0 0 120px
                    width:120px          
                .score
                    line-height:28px
                    font-size:24px
                    color:rgb(255,153,0)
                    margin-bottom:6px
                .title
                    line-height:22px
                    font-size:12px
                    color:rgb(7,17,27)
                    margin-bottom:8px
                .rank
                    line-height:10px
                    font-size:10px
                    color:rgb(147,153,159)
            .overview-right
                flex:1 
                padding:6px 0 6px 24px
                @media only screen and (max-device-width:320px)
                    padding-left:6px
                .score-wrapper
                    margin-bottom:8px
                    font-size:0
                    .title
                        display:inline-block 
                        vertical-align:top
                        line-height:18px
                        color:rgb(7,17,27)
                        font-size:12px
                    .star
                        display:inline-block
                        vertical-align:top
                        margin:0 12px
                    .score
                        display:inline-block
                        vertical-align:top
                        line-height:18px
                        color:rgb(255,153,0)
                        font-size:12px
                .delivery-wrapper
                    font-size:0
                    .title
                        line-height:18px
                        color:rgb(7,17,27)
                        font-size:12px
                    .time
                        margin-left:12px
                        font-size:12px
                        color:rgb(147,153,159)
                        line-height:18px

        .rating-wrapper
            padding:0 18px
            .rating-item
                display:flex
                padding:18px 0
                border-1px(rgba(7,17,27,.1))
                .avatar
                    flex: 0 0 28px
                    width:28px
                    margin-right:12px
                    overflow :hidden
                    img
                        border-radius:50%
                .content
                    flex:1
                    position:relative
                    .name
                        line-height:12px
                        font-size:10px
                        color:rgb(7,17,27)
                        margin-bottom:4px
                    .star-wrapper
                        font-size:0
                        margin-bottom:6px
                        .star
                            display:inline-block
                            vertical-align:top
                            margin-right:10px
                        .delivery
                            vertical-align:top
                            color:rgb(147,153,159)
                            line-height:12px
                            font-size:10px
                    .text
                        color:rgb(7,17,27)
                        line-height:18px
                        font-size:12px
                        margin-bottom:8px
                    .recommend
                        line-height:16px
                        font-size:0
                        .icon-thumb_up,.item
                            display:inline-block
                            margin-bottom:4px
                            font-size:10px
                        .icon-thumb_up
                            color:rgb(0,160,220)
                        .item
                            margin:0 4px 4px 4px
                            border-radius:1px
                            padding:0 6px
                            background:#fff
                            color:rgb(147,153,159)
                            border:1px solid (rgba(7,17,27,.1))
                    .time
                        position:absolute
                        right:0
                        top:0
                        line-height:12px
                        font-size:10px
                        color:rgb(147,153,159)
        .rating-title
            font-size:16px
            line-height:36px
            padding:18px 0 0 18px
            margin-bottom:8px

  </style>
