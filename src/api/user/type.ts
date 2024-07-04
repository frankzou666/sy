

export interface IntResponse {
    code: number,
    message: string,
    ok: boolean,
  }
  
//提交订单接口返回的数据的TS类型
export  interface IntSubmitOrderResponseData extends IntResponse{ 
   data:number
}

//订单详情基本部分
export  interface IntGetOrder { 
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
      "orderStatusString": string
    },
    "userId": number,
    "outTradeNo": string,
    "hoscode": string,
    "hosname": string,
    "depcode": string,
    "depname": string,
    "scheduleId": string,
    "title": string,
    "reserveDate": string,
    "reserveTime": number,
    "patientId": number,
    "patientName": string,
    "patientPhone": string,
    "hosRecordId": string,
    "number": number,
    "fetchTime": string,
    "fetchAddress": string,
    "amount": number,
    "quitTime": string,
    "orderStatus": number
 }

//订单详情响应数据
 export  interface IntGetOrderResponseData extends IntResponse{
    data:IntGetOrder

 } 


 //生成二维码部分

 export  interface IntQrCode {
    "codeUrl": string,
    "orderId": number,
    "totalFee": number,
    "resultCode": string

 }

//生成二维码部分响应数据
export  interface IntQrCodeResponseData extends IntResponse{
    data:IntQrCode

 }  