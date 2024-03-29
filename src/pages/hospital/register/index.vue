
<!-- 预约挂号 -->
 <template>
  <div class="P-register">
     <div class="top">
        <div class="title">{{ hospitalStore.hospitalInfo.hospital?.hosname}}</div>
        <div class="level">
           <div class="levelIcon"> <Pointer class="levelIcon"/></div>
           <div>{{ hospitalStore.hospitalInfo.hospital?.param.hostypeString}}</div>
        </div>
     </div>
     
     <!-- 医院详情 -->
     <div class="content">
        <div class="left">
          <img :src="`data:image/jpeg;base64, ${ hospitalStore.hospitalInfo.hospital?.logoData} `" alt="">
        </div>
        <div class="right">
          <div>挂号规则:</div>
          <div class="time common">预约周期:&nbsp&nbsp&nbsp{{ hospitalStore.hospitalInfo.bookingRule?.cycle}}天; 放号时间:&nbsp&nbsp&nbsp{{ hospitalStore.hospitalInfo.bookingRule?.releaseTime}}; 停挂时间:&nbsp&nbsp&nbsp{{ hospitalStore.hospitalInfo.bookingRule?.stopTime}}</div>
          <div class="address common">
            具体地址:&nbsp&nbsp&nbsp{{ hospitalStore.hospitalInfo.hospital.param.fullAddress }}
          </div>
          <div class="route common">
            具体路线:&nbsp&nbsp&nbsp{{ hospitalStore.hospitalInfo.hospital.route }}
          </div>
          <div class="quite common">
            退号时间:&nbsp&nbsp&nbsp就诊前一个工作日{{ hospitalStore.hospitalInfo.bookingRule?.quitTime}}前取消
          </div>
          <div class="rule common">
             医院预约规则:
          </div>
          <div class="ruleInfo common" v-for="(item, index) in hospitalStore.hospitalInfo.bookingRule.rule" :key="index">
             {{ item }}
          </div>
        </div>
        

     </div>
  </div>
 </template>
 <script setup lang='ts'>
   import useDetailStore from '@/store/modules/hospitalDetail.ts'
   
   let hospitalStore = useDetailStore()



 </script>


  <style scoped lang="scss">

    .common{
            margin-top: 20px;
            font-size: 15px;
            color: #7f7f7f;
    }
    .P-register{
      margin-left: 20px;
      .top{
        display: flex;
        margin-top: 30px;
        
        .title {
          font-size: 20px;
        }
        .level{
          display: flex;
          align-items: center;
          margin-left: 10px;
          color: #7f7f7f;

          font-size: 14px;
          .levelIcon{
            width: 16px;
          }
        }
      }
      .content{
        display: flex;
        margin-top: 20px;
        .left{
          width: 80px;
          img{
            width: 80px;
            height: 80px;
          }
        }
        .right{
          padding-left: 20px;
          flex: 1;
          .time{
          }
          .address{
          }
        }
      }

    }


 </style>
