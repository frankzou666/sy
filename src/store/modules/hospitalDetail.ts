
//创建pinia的两种方法,组合式和选项式api
import {defineStore} from 'pinia'

import {reqHospitalInfoByHosCode } from '@/api/hosptial/index'

import {IntHosptialInfoResponseData } from '@/api/hosptial/type.ts'

import type { DetailState}  from '@/store/modules/interface/index.ts'

//三个部分state,actions,getters
const useDetailStore = defineStore('Detail',{
   state:() =>{
     return {
        //医院数据
        hospitalInfo:({} as DetailState)
     }
   },
   actions:{
     async getHospital(hoscode:string){
        console.log("ok")
        let result:IntHosptialInfoResponseData=await reqHospitalInfoByHosCode(hoscode)
        console.log(result.data)
        if (result.code==200) {
            this.hospitalInfo=result.data
        }
     }
   },
   getters:{

   }
})

export default useDetailStore