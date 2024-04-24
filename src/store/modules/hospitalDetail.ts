
//创建pinia的两种方法,组合式和选项式api
import {defineStore} from 'pinia'

import {reqHospitalInfoByHosCode ,reqHospitalDepartmentInfo} from '@/api/hosptial/index'

import {IntHosptialInfoResponseData,IntHospitalDepartmentResponseData } from '@/api/hosptial/type.ts'

import type { DetailState}  from '@/store/modules/interface/index.ts'

//三个部分state,actions,getters
const useDetailStore = defineStore('Detail',{
   state:() =>{
     return {
        //医院数据
        hospitalInfo:({} as DetailState),
        hospitalDepartmentInfoArr:({} as DetailState),

     }
   },
   actions:{
     async getHospital(hoscode:string){
        let result:IntHosptialInfoResponseData=await reqHospitalInfoByHosCode(hoscode)
        if (result.code==200) {
            this.hospitalInfo=result.data
        }
     },

     async getHospitalDepartment(hoscode:string){
        let result:IntHospitalDepartmentResponseData=await reqHospitalDepartmentInfo(hoscode)
          if (result.code==200) {
            this.hospitalDepartmentInfoArr=result.data
          }
     },

   },
   getters:{

   }
})

export default useDetailStore