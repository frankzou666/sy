
import {IntHosptialInfo,IntHospitalDepartmentArr } from '@/api/hosptial/type.ts'

//定义pinia自己存储数据的ts类型


export interface DetailState {
    hospitalInfo: IntHosptialInfo,
    hospitalDepartmentInfoArr: IntHospitalDepartmentArr,
}