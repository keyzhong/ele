<template>
 <div class="ratingselect">
     <div class="rating-type">
         <span @click="select(2,$event)" class="all block" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>  
         <span @click="select(0,$event)" class="positive block" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>  
         <span @click="select(1,$event)" class="negative block" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>  
     </div>
     <div class="switch" :class="{'on':this.onlyContent===true}" @click="toggleContent">
         <i class="icon-check_circle"></i>
         <span class="text">只看有内容的评价</span>    
     </div>
 </div>
</template>

<script type="text/ecmascript-6">

    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;

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
    computed:{
        positives(){
            return this.ratings.filter((rating)=>{
                return rating.rateType===POSITIVE;
            })
        },
        negatives(){
            return this.ratings.filter((rating)=>{
                return rating.rateType===NEGATIVE;
            })
        }
    },
    methods:{
        select(type,e){
            this.selectType=type;  // 基本类型的修改不会影响父组件的值 需要触发事件
            this.$dispatch('ratingType-select',type);
        },
        toggleContent(){
            this.onlyContent=!this.onlyContent;
            this.$dispatch('onlyContent-select',this.onlyContent);
        }
    },
    components: {

    }
 }
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/mixin"
    .ratingselect
        .rating-type
            padding:8px 0 26px 0
            margin:0 18px
            font-size:0
            border-1px(rgba(7,17,27,.3))
            .block
                padding:8px 12px
                font-size:12px
                line-height:16px
                margin-right:8px
                border-radius:1px
                color:rgb(77,85,93)
                &.active
                    color:#fff
                &.all
                    background:rgba(0,160,220,.2)
                    color:#fff
                    &.active
                        background:rgb(0,160,220)
                &.positive
                    background:rgba(0,160,220,.2)
                    &.active
                        background:rgb(0,160,220)
                &.negative
                    background:rgba(77,85,93,.2)
                    &.active
                        background:rgb(77,85,93)
                .count
                    font-size:8px
                    margin-left:2px
                    line-height:16px
        .switch
            padding:18px 12px
            line-height:24px;
            border-bottom:1px solid rgba(7,17,27,.3)
            color:rgb(147,153,159)
            font-size:0
            &.on
                .icon-check_circle
                    color:#00c850
            .icon-check_circle
                display:inline-block
                vertical-align:top
                margin-right:4px
                font-size:24px
            .text
                font-size:12px





 
</style>
