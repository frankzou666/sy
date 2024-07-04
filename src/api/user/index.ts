
//引入二次封装的axios

import request from '@/api/axios.ts'

import type {
    IntSubmitOrderResponseData,
    IntGetOrderResponseData,
    IntQrCodeResponseData,
}  from './type.ts'
//地址
enum API {

    //创建订单
    CREATE_ORDER = '/order/orderInfo/auth/submitOrder/',

    //获取订单
    GET_ORDER = '/order/orderInfo/auth/getOrderInfo/',

    //取消订单

    CANCEL_ORDER = '/order/orderInfo/auth/cancelOrder/',

    //下单生成二维码
    GET_QRCODE = '/order/weixin/createNative/',

     //查询支付状态
     GET_PAYSTATUS = '/order/weixin/queryPayStatus/',


}

//创建订单
export const reqSubmitOrder =(hoscode:string,scheduleId:string,patientId:number)=>{
    return request.post<any,IntSubmitOrderResponseData>(API.CREATE_ORDER + `${hoscode}/${scheduleId}/${patientId}`)
}


//获取订单
export const reqGetOrder =(id:number)=>{
    return request.get<any,IntGetOrderResponseData>(API.GET_ORDER + `${id}`)
}

//取消订单
export const reqCancelOrder =(id:number)=>{
    return request.get<any,any>(API.CANCEL_ORDER + `${id}`)
}


//下单生成支付二维码
export const reqQrCode=(id:number)=>{
    return request.get<any,IntQrCodeResponseData>(API.GET_QRCODE + `${id}`)
}


//下单生成支付二维码
export const reqGetPayStatus=(id:number)=>{
    return request.get<any,any>(API.GET_PAYSTATUS + `${id}`)
}