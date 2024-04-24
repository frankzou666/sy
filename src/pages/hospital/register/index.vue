<!-- 预约挂号 -->
<template>
  <div class="P-register">
    <div class="top">
      <div class="title">{{ hospitalStore.hospitalInfo?.hospital?.hosname }}</div>
      <div class="level">
        <div class="levelIcon">
          <Pointer class="levelIcon" />
        </div>
        <div>{{ hospitalStore.hospitalInfo?.hospital?.param.hostypeString }}</div>
      </div>
    </div>

    <!-- 医院详情 -->
    <div class="content">
      <div class="left">
        <img :src="`data:image/jpeg;base64, ${hospitalStore.hospitalInfo?.hospital?.logoData} `" alt="">
      </div>
      <div class="right">
        <div>挂号规则:</div>
        <div class="time common">预约周期:&nbsp&nbsp&nbsp{{ hospitalStore.hospitalInfo?.bookingRule?.cycle }}天;
          放号时间:&nbsp&nbsp&nbsp{{ hospitalStore.hospitalInfo?.bookingRule?.releaseTime }}; 停挂时间:&nbsp&nbsp&nbsp{{
        hospitalStore.hospitalInfo?.bookingRule?.stopTime }}</div>
        <div class="address common">
          具体地址:&nbsp&nbsp&nbsp{{ hospitalStore.hospitalInfo?.hospital?.param?.fullAddress }}
        </div>
        <div class="route common">
          具体路线:&nbsp&nbsp&nbsp{{ hospitalStore.hospitalInfo?.hospital?.route }}
        </div>
        <div class="quite common">
          退号时间:&nbsp&nbsp&nbsp就诊前一个工作日{{ hospitalStore.hospitalInfo.bookingRule?.quitTime }}前取消
        </div>
        <div class="rule common">
          医院预约规则:
        </div>
        <div class="ruleInfo common" v-for="(item, index) in hospitalStore.hospitalInfo?.bookingRule?.rule"
          :key="index">
          {{ item }}
        </div>
      </div>


    </div>

    <!-- 医院科室详情数据 -->
    <div class="department">
      <div class="leftNav">
        <ul>
          <li :class="{ activeItem: index === depActive }" v-for="(item, index) in hospitalStore.hospitalDepartmentInfoArr"
            :key="item.depcode" @click="handleDepClick(index, item.depname)">
            {{ item.depname }}
          </li>
        </ul>
      </div>
      <div class="rightDepInfo">
        <div class="showDepartMent" v-for="(item, index) in hospitalStore.hospitalDepartmentInfoArr">
          <h2 class="currH2">{{ item.depname }}</h2>
          <!-- 每个大科室的小科室 -->
          <ul class="itemChildList">
            <li v-for="(itemChild, index) in item.children" @click="goRegisterStep1(itemChild)">
              {{ itemChild.depname }}
            </li>
          </ul>
        </div>f
      </div>
    </div>


  </div>
</template>
<script setup lang='ts'>
import { onMounted, onBeforeMount, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import useDetailStore from '@/store/modules/hospitalDetail.ts'
import useUserStore from '@/store/modules/user.ts'



let $route = useRoute()
let $router = useRouter()
let hoscode = $route.query.hoscode
let userStore = useUserStore()


let hospitalStore = useDetailStore()

//控制当前点的活动，科室亮度
let depActive = ref<number>(0)

onBeforeMount(() => {
  hospitalStore.getHospital(hoscode)

})

//点科室的时候科理
const handleDepClick = (index: number, depname: string) => {
  let allH2 = document.querySelectorAll(".currH2")
  let curH2: Element = document.createElement('h2');
  depActive.value = index
  //allH2[index].scrollIntoView()
  allH2.forEach(item => { if (item.innerHTML === depname) { curH2 = item } })
  //让滚动条到最上位置 
  if (curH2 !== undefined) {
    curH2.scrollIntoView({ 'behavior': 'smooth' })
  }

}

//跳到挂号1,传参
const  goRegisterStep1= (item:any) => {
  
  $router.push({path:"/hospital/registerstep1",query:{hoscode:$route.query.hoscode,depcode:item.depcode}})

}







</script>


<style scoped lang="scss">
.activeItem {
  color: red;
  border-left: 1px solid red;
  background-color: #fff;
}

.common {
  margin-top: 20px;
  font-size: 15px;
  color: #7f7f7f;

}

.P-register {
  margin-left: 20px;

  .top {
    display: flex;
    margin-top: 30px;

    .title {
      font-size: 20px;
    }

    .level {
      display: flex;
      align-items: center;
      margin-left: 10px;
      color: #7f7f7f;

      font-size: 14px;

      .levelIcon {
        width: 16px;
      }
    }
  }

  .content {
    display: flex;
    margin-top: 20px;

    .left {
      width: 80px;

      img {
        width: 80px;
        height: 80px;
      }
    }

    .right {
      padding-left: 20px;
      flex: 1;

      .time {}

      .address {}
    }
  }

  .department {
    width: 100%;
    height: 500px;
    margin-top: 30px;
    display: flex;

    .leftNav {
      width: 100px;
      height: 100%;

      ul {
        width: 100%;
        height: 100%;
        background-color: rgb(248, 248, 248);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
        font-size: 14px;
        color: #7f7f7f;

        li {

          line-height: 30px;

          &:hover {
            cursor: pointer
          }

        }

      }
    }

    .rightDepInfo {
      flex: 1;
      height: 100%;
      overflow: auto;

      // 去掉滚动条
      &::-webkit-scrollbar {
        display: none;
      }

      .showDepartMent {

        h2 {

          background-color: rgb(248, 248, 248);
          color: #7f7f7f;
          padding-left: 15px;
          font-size: 18px;
        }

        .itemChildList {
          display: flex;
          flex-wrap: wrap;

          li {
            width: 33.33%;
            padding-left: 10px;
            color: #7f7f7f;
            line-height: 30px;
            font-size: 14px;

            &:hover {
              cursor: pointer;
            }

          }
        }
      }
    }
  }

}
</style>
