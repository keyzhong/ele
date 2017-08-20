<template>
 <div class="star" :class="starType">
     <span v-for="itemClass in itemClasses" class="star-item" track-by="$index" :class="itemClass"></span>
 </div>
</template>

<script type="text/ecmascript-6">

    const len=5;
    const cls_on="on";// 定义常亮 方便以后批量修改
    const cls_off="off";
    const cls_half="half";

 export default {
    data() {
        return {

        }
    },
    props:{  // 需要传入此组件的数据
        size:{    // 图片的size  48/36/24
            type:Number
        },
        score:{  // 店铺得分
            type:Number
        }
    },
    computed:{  // 计算
        starType(){
            return 'star-' + this.size;
        },
        itemClasses() {
            let result =[];                             // 结果数组
            let score = Math.floor(this.score*2)/2;     // 分数
            let hasDecimal =score %1 !==0;              // 是否有小数
            let integer = Math.floor(score);            // 整数

            for(let i =0; i<integer;i++){
                result.push(cls_on);                    // 全星
            }
            if(hasDecimal){                             //半星 最多一个
                result.push(cls_half);
            }
            while(result.length<len){
                result.push(cls_off);
            }
            return result;
        }
    },
    components: {

    }
 }
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixin.styl'

    .star
        font-size:0
        .star-item
            display:inline-block
            background-repeat:no-repeat 
        &.star-48
            .star-item
                width:20px
                height:20px
                margin-right:22px
                background-size:20px 20px
                &:last-child
                    margin-right:0
                &.on
                    bg-image('star48_on')
                &.half
                    bg-image('star48_half')
                &.off
                    bg-image('star48_off')
        &.star-36
            .star-item
                width:15px
                height:15px
                margin-right:16px
                background-size:15px 15px
                &:last-child
                    margin-right:0
                &.on
                    bg-image('star36_on')
                &.half
                    bg-image('star36_half')
                &.off
                    bg-image('star36_off')
        &.star-24
            .star-item
                width:10px
                height:10px
                margin-right:3px
                background-size:10px 10px
                &:last-child
                    margin-right:0
                &.on
                    bg-image('star24_on')
                &.half
                    bg-image('star24_half')
                &.off
                    bg-image('star24_off')
</style>
