

 <template>
   <div class="P-visitor">
      <div class="top">
         <div class="left">
             <div class="symbol">医保</div>
             <div class="username">{{ patient.name }}</div>
         </div>
         <div class="right">
            <el-button type="primary" :icon="Edit" circle></el-button>
         </div>
      </div>

      <div class="bottom">
         <p class="idType">证件类型: <span>身份证</span></p>
         <p class="idNumber">证件号码: <span>42323232323232323</span></p>
         <p class="sexy">用户性别: <span>男</span></p>
         <p class="birth">出生日期: <span>1982-02-02</span></p>
         <p class="mobile">手机号码: <span>13520393349</span></p>
         <p class="currentAddress">当前住址: <span>北京市</span></p>
         <p class="detailAddress">详细地址: <span>海淀海淀海淀海淀海淀海淀海淀海淀海淀</span></p>
      </div>
      
 
   </div>
 </template>

 <script setup lang='ts'>
 import { Edit } from '@element-plus/icons-vue';
 import { defineProps } from 'vue';
  
 //子组件接到父组件传过来的参数
 defineProps(['patient'])

 

 
 </script>
 <style scoped lang="scss">
 .P-visitor{
    margin-top: 20px;
    box-shadow: 0px 0px 12px rgba(0,0,0,0.12);
    .top{
        height: 60px;
        background-color: #e5e5e5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .left{
            margin: 0px 12px;
            display: flex;
            color: #7f7f7f;
            .symbol{
                font-size: 11px;
                background-color: #fff;
                width: 30px;
                height: 17px;
                text-align: center;
                padding-top: 2px;
            }
            .username{
                padding-left: 5px;
                font-size: 18px;
            }
        }
        .right{
            margin: 0 10px;
        }
        
    }
    .bottom{
        margin: 15px 10px;
        font-size: 14px;
        color: #1f1f1f;
        p{
            margin-bottom: 20px;
            span{
                color: #7f7f7f;
            }
        }

    }
 }
 
 
 
 
 
 </style>