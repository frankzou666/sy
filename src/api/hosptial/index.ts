// 医院相关api


import request from '@/api/axios.ts'
import { 
    IntHosptialInfoResponseData,
    IntHospitalDepartmentResponseData,
    IntLoginParam,
    IntLoginInfoResponse,
    IntWxLoginInfoResponse,
    IntHospitalWorkData,
    } from './type.ts'


enum API {
    //获取医院数据
    HospitalInfo = '/hosp/hospital/',
    //某个科室
    HospitalDepartmentInfo ='/hosp/hospital/department/',

    //短信验证码
    GETUSERSMSCODE_URL='/sms/send/',

    //用户登录
    USERLOGIN_URL  = '/user/login',
    
    // 微信扫码的URL
    WXLOGIN_URL= '/user/weixin/getLoginParam/',

    //获取某一个医院的挂号数据
    BOOKINGHOSPITAL_URL= '/hosp/hospital/auth/getBookingScheduleRule/',

} 

//根据hoscode返回医院信息
export const reqHospitalInfoByHosCode = (hoscode: string) => {
    //函数返回的数据类型，写法
    return request.get<any,IntHosptialInfoResponseData>(API.HospitalInfo + `${hoscode}`)
}

//根据hoscode返回医院科室信息
export const reqHospitalDepartmentInfo = (hoscode: string) => {
    //函数返回的数据类型，写法
    return request.get<any,IntHospitalDepartmentResponseData>(API.HospitalDepartmentInfo + `${hoscode}`)
}


//请求短信验证码
export const reqSmsCode = (mobilePhone: string) => {
    //函数返回的数据类型，写法
    return request.get<any,any>(API.GETUSERSMSCODE_URL + `${mobilePhone}`)
}

//用户请求
export const reqUserLogin = (data:IntLoginParam) => {
    //函数返回的数据类型，写法
    return request.post<any,IntLoginInfoResponse>(API.USERLOGIN_URL,data)
}

//获取微信登录的二维码请求参数

export const reqWxLoginParam=(wxRedirectUri:string)=>{
    return request.get<any,IntWxLoginInfoResponse>(API.WXLOGIN_URL+`/?wxRedirectUri=${wxRedirectUri}`)
}

//获取预约挂号数据
export const reqHospitalWorking=(page:number,limit:number,hoscode:string,depcode:string)=>{
    return request.get<any,IntHospitalWorkData>(API.BOOKINGHOSPITAL_URL+`${page}/${limit}/${hoscode}/${depcode}`)
}