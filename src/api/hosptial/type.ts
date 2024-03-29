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
          "provinceCode":string,
          "cityCode": string,
          "districtCode": string,
          "address":string,
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
