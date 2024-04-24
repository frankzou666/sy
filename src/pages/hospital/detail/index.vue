<!-- 医院详情 -->
<template>
  <div class="P-detail">
    <div class="top">
      <div class="title">{{hospitalStore.hospitalInfo?.hospital?.hosname}}</div>
      <div class="level">
        <div class="levelIcon">
          <Pointer class="levelIcon" />
        </div>
        <div>{{hospitalStore.hospitalInfo.hospital?.param?.hostypeString}}</div>
      </div>
    </div>

    <div class="content">
      <div class="left">
        <img :src="`data:image/jpeg;base64,${hospitalStore.hospitalInfo?.hospital?.logoData}`" alt="xxx">
      </div>
      <div class="right">
        <div class="address common">
          具体地址:&nbsp&nbsp&nbsp{{hospitalStore.hospitalInfo?.hospital?.param.fullAddress}}
        </div>
        <div class="route common">
          规划路线:&nbsp&nbsp&nbsp {{hospitalStore.hospitalInfo?.hospital?.route}}
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="title">
        <h2>医院介绍:</h2>
      </div>
      <p class="main">
        &nbsp;&nbsp; &nbsp;&nbsp;{{hospitalStore.hospitalInfo?.hospital?.intro}}
      </p>
    </div>



  </div>
</template>
<script setup lang='ts'>
import { onMounted, onBeforeMount, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useDetailStore from '@/store/modules/hospitalDetail.ts'

let hospitalStore = useDetailStore()

//获取当前路由信息
let $route = useRoute();

let hoscode:string =$route.query.hoscode as string

onBeforeMount(()=>{
  hospitalStore.getHospital(hoscode)     
})







</script>
<style scoped lang="scss">
.P-detail {
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
      margin-left: 10px;
      color: #7f7f7f;

      .route {
        margin-top: 10px;
      }
    }
  }

  .footer {
    margin-top: 40px;

    .main {
      margin-top: 10px;
      font-size: 14px;
      color: #7f7f7f;
      line-height: 30px;
    }
  }

}
</style>
