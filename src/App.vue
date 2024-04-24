<template>
  <div class="container">
    <!-- 顶部组件 -->
    <HospitalTop />

    <!-- 帐由组件展示区域 -->
    <div class="main">
      <RouterView ></RouterView>
    </div>


    <!-- 底部组件 -->

    <HospitalBottom id="myAudi" />

    <!-- 登录组件 -->
    <Login />

    <audio ref="autoRef" autoplay :src="src" muted="true"></audio>

   
  </div>
</template>
<script setup lang="ts">
  import { onMounted,ref } from 'vue'
  import { ElMessage } from 'element-plus';

  import request from '@/api/axios.ts'
  import userStore from '@/store/modules/user.ts'
 

  //增加socket
  let SID= Math.round(Math.random()*100000)
  let WS_URL="ws://localhost:8090/ws/"+SID
  let webSocket = new WebSocket(WS_URL)
  let autoRef = ref(null)
  let src=ref()

  onMounted(()=>{
    let $myAudi = document.getElementById("main")
    //
    $myAudi?.click()
   
     
  })


  // webSocket.onmessage=function(msg) {
  //   // ElMessage({
  //   //   type:"success",
  //   //   message:msg.data,
  //   // })
  //    ElMessage({
  //       type:"success",
  //       message:msg.data,
  //     })
  //   let audit = new Audio()
  //   audit.src="./src/assets/images/xm2540.wav"
  //   audit.play()
    
  //   setTimeout(()=>audit.pause(),2000) 

  // }

  
</script>

<style scoped>
.container{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  
  .main{
    flex: 1;
    padding-top: 70px;
    padding-bottom: 70px;
    width: 1200px;
    margin:  0  auto;
  }
  


}

</style>