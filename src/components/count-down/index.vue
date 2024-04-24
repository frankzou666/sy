 <template>
   <div>
     <span>获取验证码({{secondsCnt}}s)</span>
 
 
 
 
 
   </div>
 </template>
 <script setup lang='ts'>

//   获取验证码到计时
import {ref,reactive,computed} from 'vue'

let secondsCnt=ref<number>(5)
setInterval(()=>{secondsCnt.value=secondsCnt.value - 1},1000)

 
 
 
 
 
 </script>
 <style scoped>
 
 
 
 
 
 </style>