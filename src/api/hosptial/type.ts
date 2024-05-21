// 医院详情返回数据类型

export interface IntResponse {
  code: number,
  message: string,
  ok: boolean,
}


//一个医院详情数据类型
export interface IntHosptialInfo {
  "bookingRule": {
    "cycle": number,
    "releaseTime": string,
    "stopTime": string,
    "quitDay": -1,
    "quitTime": string,
    "rule": string[]
  },
  "hospital": {
    "id": string,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
      "hostypeString": string,
      "fullAddress": string,
    },
    "hoscode": string,
    "hosname": string,
    "hostype": string,
    "provinceCode": string,
    "cityCode": string,
    "districtCode": string,
    "address": string,
    "logoData": string,
    "intro": string,
    "route": string,
    "status": number,
    "bookingRule": null,
  }

}


//医院详情数据类型返回
export interface IntHosptialInfoResponseData extends IntResponse {
  data: IntHosptialInfo
}


//医院科室数据

export interface IntHospitalDepartment {
  "depcode": string,
  "depname": string,
  "children": IntHospitalDepartment[],
}


export type IntHospitalDepartmentArr = IntHospitalDepartment[]

//医院科室数据请求响应

export interface IntHospitalDepartmentResponseData extends IntResponse {
  data: IntHospitalDepartmentArr
}

//用户登录接口需要的数据类型

export interface IntLoginParam {
  phone: string,
  code: string
}

//用户登录接口返回的数据类型
export interface IntLoginInfo {
  name: string,
  toke: string
}


//用户登录接口返回的数据类型
export interface IntLoginInfoResponse extends IntResponse {
  data: IntLoginInfo
}


//请求微信扫码参数接口返回的数据类型
export interface IntWxLoginInfo {
  "redirectUri": string,
  "appid": string,
  "scope": string,
  "state": string,
}


//用户登录接口返回的数据类型
export interface IntWxLoginInfoResponse extends IntResponse {
  data: IntWxLoginInfo
}


//
export interface baseMap {
  "workDateString": string,
  "releaseTime": string,
  "bigname": string,
  "stopTime": string,
  "depname": string,
  "hosname": string,
}

export interface workData {
  "workDate": string,
  "workDateMd": string,
  "dayOfWeek": string,
  "docCount": number,
  "reservedNumber": number,
  "availableNumber": number,
  "status": number,
}

//预约挂号返回的数据结构
export type TypeBookingScheduleList = workData[]
export interface IntHospitalWorkData extends IntResponse {
  data: {
    total:number,
    //这里返回是一个数组，看上面是如何自定数据类型
    bookingScheduleList : TypeBookingScheduleList,
    baseMap: baseMap
  }
}


//返回一个医生的数据

export interface Doctor {

  "id": string,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {
    "dayOfWeek":string,
    "depname": string,
    "hosname": string
  },
  "hoscode": string,
  "depcode": string,
  "title": string,
  "docname": string,
  "skill": string,
  "workDate": string,
  "workTime": number,
  "reservedNumber": number,
  "availableNumber": number,
  "amount": number,
  "status": number,
  "hosScheduleId": number
}

export type TypeDoctor  = Doctor[]

//定义医生科室排班接口返回的数据类型

export interface IntHospitalDoctorWorking extends IntResponse {
  data:TypeDoctor
}

//就诊人

export interface Patient {

  "id": string,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {
    "certificatesTypeString":string,
    "contactsCertificatesTypeString": string,
    "hosname": string
  },
  "userId": number,
  "name": string,
  "certificatesType": string,
  "certificatesNo": string,
}


export type TypePatient = Patient[]

//获取所有就诊人信息
export interface IntPatientAll extends IntResponse {
   data:TypePatient
}
