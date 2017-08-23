<template>
 <div class="ratingselect">
     <div class="rating-type">
         <span class="all">{{desc.all}}</span>  
         <span class="positive">{{desc.positive}}</span>  
         <span class="negative">{{desc.negative}}</span>  
     </div>
     <div class="switch">
         <i class="icon-check_circle"></i>
         <span class="text">只看有内容的评价</span>    
     </div>
 </div>
</template>

<script type="text/ecmascript-6">

    const POSITIVE = 0;
    const NAGATIVE = 0;
    const ALL = 0;

 export default {
 data() {
    return {

    }

    },
    props: {   // 传入的配置
        ratings:{ // 评价
            type:Array,
            default(){
                return [];
            }
        },
        selectType:{  // 评价类型
            type:Number,
            default:ALL
        },
        onlyContent:{ // 只看有内容的
            type:Boolean,
            default:false
        },
        desc:{  // 标签名称
            type:Object,
            default(){
                return {
                    all:'全部',
                    positive:'满意',
                    negative:'不满意'
                }
            }
        }

    },
    components: {

    }
 }
</script>

<style scoped lang="stylus">
    .ratingselect
        padding:12px 0
        .rating-type
            font-size:0
            padding-bottom:18px
            .all,.positive,.negative
                display:inline-block
                width:60px
                height:32px
                text-align:center
                font-size:12px
                line-height:32px
            .all
                margin-right:8px
                background:rgb(0,160,220)
                color:#fff
            .positive
                margin-right:8px
                background:rgba(0,160,220,.2)
                color:rgb(77,85,93)
            .negative
                background:rgba(77,85,93,.2)
                color:rgb(77,85,93)


 
</style>
