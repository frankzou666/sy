// 医院相关api


import request from '@/api/axios.ts'
import {IntHosptialInfoResponseData} from './type.ts'


enum API {
    //获取医院数据
    HospitalInfo = '/hosp/hospital/',

}

//根据hoscode返回医院信息
export const reqHospitalInfoByHosCode = (hoscode: string) => {
    //函数返回的数据类型，写法
    return request.get<any,IntHosptialInfoResponseData>(API.HospitalInfo + `${hoscode}`)
}
