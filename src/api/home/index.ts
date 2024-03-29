
//统一管理，所有首页的封装请求

import request from '@/api/axios.ts'

import type { IntHospitalResponse, IntHospitalLevelAndRegion, IntHospitalInfo } from './type.ts'


enum API {
    //获取医院数据
    HOSPITAL_URL = '/hosp/hospital/',

    //获取医院等级和地址
    HOSPITAL_LEVEL_REGION_URL = '/cmn/dict/findByDictCode/',

    //根据医院名字查询医院
    HOSPITAL_INFO_URL = '/hosp/hospital/findByHosname/',

}

//获取医院的数据
export const reqHospital = (page: number, limit: number, hostype: string = '', districtcode: string = '') => {
    //函数返回的数据类型，写法
    return request.get<any, IntHospitalResponse>(API.HOSPITAL_URL + `${page}/${limit}/?hostype=${hostype}&districtcode=${districtcode}`)
}


//获取医院的等级或地区
export const reqHospitalLevelAndRegion = (dictCode: string) => {
    //函数返回的数据类型，写法
    return request.get<any, IntHospitalLevelAndRegion>(API.HOSPITAL_LEVEL_REGION_URL + dictCode)
}

//根据医院名字查询医院
export const reqHospitalInfoByName = (hosname: string) => {
    //函数返回的数据类型，写法
    return request.get<any, IntHospitalInfo>(API.HOSPITAL_INFO_URL + hosname)
}