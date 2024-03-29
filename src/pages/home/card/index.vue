<template>
    <div>
        <el-card class="boxCard" shadow="hover" @click="goDetail">
            <div class="content">
                <div class="left">
                    <div class="hospitalName">{{  hospitalInfo.hosname }}</div>
                    <div class="tip">
                        <div class="level">
                            <Pointer class="levelIcon"/>
                            <div class="levelContent">{{  hospitalInfo.param.hostypeString }}</div>
                        </div>
                        <div class="openTime">
                            <Clock class="openTimeIcon"/>
                            <div class="openTimeContent">每天{{  hospitalInfo.bookingRule?.releaseTime }}</div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <img :src="`data:image/jpeg;base64, ${ hospitalInfo.logoData} `" alt="">

                </div>

            </div>

        </el-card>
    </div>
</template>
<script setup lang='ts'>
  import {defineProps} from 'vue'
  import { useRouter } from 'vue-router';

  //创建一个路由对像
  let $router = useRouter();

  //接受父组件传过来的属性
  let props = defineProps(['hospitalInfo'])

  const goDetail=()=>{
    //import { useRouter } from 'vue-router';,let $router = useRouter();
    $router.push({path:"/hospital/register" ,query:{hoscode:props.hospitalInfo.hoscode}})

  }

</script>
<style scoped lang="scss">
.boxCard {
    cursor: pointer;

    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
            width: 70%;

            .tip {

                display: flex;
                justify-content: space-between;
                margin-top: 14px;
                font-size: 12px;
                color: #7f7f7f;
                .level{
                    display: flex;
                   .levelIcon{
                    margin-right: 6px;
                    height: 12px

                   }
                   
                }
                .openTime{
                    display: flex;
                   .openTimeIcon{
                    margin-right: 4px;
                    height: 12px

                   }
                   
                }
            }
        }

        .right {
            img {
                width: 50px
            }
        }

    }

}
</style>