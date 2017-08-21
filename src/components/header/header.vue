<template>
 <div class="header">
    <div class="content-wrapper">
         <!-- 头像区 -->
        <div class="avatar">
            <img src="" alt="" width='64' height='64' :src="seller.avatar">
        </div>
        <!-- 内容区 -->
        <div class="content">
            <div class="title">
                <span class="brand"></span>
                <span class="name">{{seller.name}}</span>
            </div>
            <div class="description">
                {{seller.description}} / {{seller.deliveryTime}}分钟送达
            </div>
             <div v-if="seller.supports" class="support">  <!--初始化的时候seller为空对象 所以要写v-if -->
                <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                <span class="text">{{seller.supports[0].description}}</span>
            </div>
        </div>
        <!-- 优惠 -->
        <div v-if="seller.supports" class="support-count" @click="showDetail">
            <span class="count">{{seller.supports.length}}个</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
    </div>
    <div class="bulletin-wrapper">
         <!-- 将两个span写在一起可以去除间隙 和font-size同理 -->
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>    
    </div>
    <div class="background">
        <img src="" alt="" width="100%" height="100%" :src="seller.avatar">
     </div>
    <!-- 弹层区域 -->
    <div class="detail" v-show="detailShow" transition="fade">
        <div class="detail-wrapper clearfix">
            <div class="detail-main">
                <h1 class="name">{{seller.name}}</h1>
                <div class="star-wrapper">
                    <star :size="48" :score="seller.score"></star>
                </div>
                <!-- 优惠信息 -->
                <div class="title">
                    <div class="line"></div>
                    <div class="text">优惠信息</div>
                    <div class="line"></div> 
                </div>
                <ul class="supports">
                    <li class="support-item" v-for="item in seller.supports">
                        <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
                        <span class="text">{{seller.supports[$index].description}}</span> 
                    </li>
                </ul>
                <div class="title">
                    <div class="line"></div>
                    <div class="text">商家公告</div>
                    <div class="line"></div> 
                </div>
                <div class="bulletin">
                    <div class="content">
                        {{seller.bulletin}}
                    </div>
                    <div class="content">
                        {{seller.bulletin}}
                    </div>
                </div>
            </div>
        </div>
        <!-- 关闭弹层 -->
        <div class="detail-close" @click="closeDetail">
            <i class="icon-close"></i>    
        </div>   
    </div>
 
 </div>

</template>

<script type="text/ecmascript-6">
 import star from 'components/star/star';

 export default {
    data() {
    return {
            detailShow:false
        };
    },
    methods:{   // 自定义函数
        showDetail(){
            this.detailShow=true;
        },
        closeDetail(){
            this.detailShow=false;
        }
    },
    props:{
        seller:{
            type:''
        }
    },
    created() {  // 实例创建完成后的钩子函数 一般用于获取数据
        this.classMap=['decrease','discount','guarantee','invoice','special']
    },
    components: {  //注册引用的组件
        'star':star
    }
 };
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/mixin.styl"
    .header
        position:relative
        color:#fff
        overflow:hidden
        background:rgba(7,17,27,.5)
        .content-wrapper
            font-size:0
            position:relative
            padding:24px 12px 18px 24px
            .avatar
                display:inline-block
                vertical-align: top
                img
                    border-radius:2px
            .content
                display:inline-block
                margin-left:16px
                .title
                    margin:2px 0 8px 0
                    .brand
                        display:inline-block
                        vertical-align:top
                        width:30px
                        height:18px
                        bg-image('brand')
                        background-size:30px 18px
                        background-repeat:no-repeat
                    .name
                        margin-left:6px
                        line-height:18px
                        font-size:16px
                        font-weight:bold
                .description
                    margin-bottom:10px
                    line-height:12px
                    font-size:12px
                .support
                    .icon
                        display:inline-block
                        vertical-align:top
                        height:12px
                        width:12px
                        margin-right:4px
                        background-size:12px 12px
                        background-repeat:no-repeat
                        &.decrease
                            bg-image('decrease_1')
                        &.discount
                            bg-image('discount_1')
                        &.guarantee
                            bg-image('guarantee_1')
                        &.invoice
                            bg-image('invoice_1')
                        &.special
                            bg-image('special_1')
                    .text
                        line-height:12px
                        font-size:10px
            .support-count
                position:absolute
                padding: 0 8px
                right:12px
                bottom:14px
                height:24px
                line-height:24px
                border-radius:14px
                background:rgba(0,0,0,.2)
                text-align:center
                .count
                    vertical-align:top
                    font-size:10px
                .icon-keyboard_arrow_right
                    margin-left:2px
                    line-height:26px
                    font-size:10px
        .bulletin-wrapper
            position:relative
            height:28px
            line-height:28px
            padding: 0 22px 0 12px
            white-space:nowrap
            overflow:hidden
            text-overflow:ellipsis
            background-color:rgba(7,17,27,.2)
            .bulletin-title
                display:inline-block
                vertical-align:top
                margin-top:8px
                height:12px
                width:22px
                bg-image('bulletin')
                background-size:22px 12px
                background-repeat:no-repeat
            .bulletin-text
                margin: 0 4px
                font-weight:200
                vertical-align: top
                font-size:10px
            .icon-keyboard_arrow_right
                position:absolute
                right:12px
                top:8px
                font-size:10px
        .background
            position:absolute
            top:0
            left:0
            width:100%
            height:100%
            z-index:-1
            overflow:hidden
            filter:blur(10px)
        .detail
            position:fixed
            top:0
            left:0
            z-index:100
            width:100%
            height:100%
            overflow:auto
            background:rgba(7,17,27,.8)
            transition:all 0.5s
            backdrop-filter:blur(10px)
            overflow-scrolling : touch
            &::-webkit-scrollbar
                display:none
            &.fade-transition
                opacity:1
                background:rgba(7,17,27,.8)
            &.fade-enter,&.fade-leave
                opacity:0
                background:rgba(7,17,27,0) 
            .detail-wrapper
                min-height:100%
                width:100%
                .detail-main
                    margin-top:64px
                    padding-bottom:64px
                    .name
                        text-align:center
                        font-weight:700
                        line-height:16px
                        font-size:16px
                    .star-wrapper
                        margin-top:18px
                        padding:2px 0
                        text-align:center
                    .title
                        display:flex
                        width:80%
                        margin:28px auto 24px auto
                        .line
                            flex:1
                            position:relative
                            top:-6px
                            border-bottom:1px solid rgba(255,255,255,.2)
                        .text
                            padding: 0 12px
                            font-size:14px
                            font-weight:700
                    .supports
                        width:80%
                        margin 0 auto
                        .support-item
                            padding 0 12px
                            margin-bottom:12px
                            font-size:0
                            &:last-child
                                margin-bottom:0
                            .icon
                                display:inline-block
                                height:16px
                                width:16px
                                vertical-align:top
                                background-repeat:no-repeat
                                background-size:16px 16px 
                                &.decrease
                                    bg-image('decrease_2')
                                &.discount
                                    bg-image('discount_2')
                                &.guarantee
                                    bg-image('guarantee_2')
                                &.invoice
                                    bg-image('invoice_2')
                                &.special
                                    bg-image('special_2')
                            .text
                                margin-left:6px
                                font-weight:200
                                line-height:16px
                                font-size:12px
                    .bulletin
                        width:80%
                        margin 0 auto
                        .content
                            font-size:12px
                            font-weight:200
                            line-height:24px
            .detail-close
                position:relative
                height:32px
                width:32px
                margin:-64px auto 0 auto
                clear:both
                font-size:32px        
</style>
 