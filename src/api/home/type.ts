//定义首页的模块数据类型


export interface IntResponse {
    code: number,
    message: string,
    ok: boolean,
}

//定义医院数据类型
export interface IntHospital {
    id: string,
    createTime: string,
    updateTime: string,
    isDeleted: boolean,
    "param": {
        "hostypeString": string,
        "fullAddress": string
    },

    "hoscode": string,
    "hosname": string,
    "hostype": string,
    "provinceCode": string,
    "cityCode": string,
    "districtCode": string,
    "address": string,
    "logoData": string,
    "status": number,
    "intro": string,
    "route": string,
    "bookingRule": {
        "cycle": number
        "releaseTime": string,
        "stopTime": string,
        "quitDay": number
        "quitTime": string,
        "rule": string[]
    }

}

export type Content = IntHospital[]

export interface IntHospitalResponse extends IntResponse {
    data: {
        content: Content,
        "pageable": {
            "sort": {
                "sorted": boolean,
                "unsorted": boolean,
                "empty": boolean
            },
            "pageNumber": number,
            "pageSize": number,
            "offset": number,
            "paged": boolean,
            "unpaged": boolean
        },
        "totalPages": number,
        "totalElements": number,
        "last": boolean,
        "first": boolean,
        "sort": {
            "sorted": boolean,
            "unsorted": boolean,
            "empty": boolean
        },
        "numberOfElements": number,
        "size": number,
        "number": number,
        "empty": boolean
    }

}


//引入返回医院等级和地区
export interface IntHospitalLevelAndRegion {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {},
    "parentId": number,
    "name": string,
    "value": string,
    "dictCode": string,
    "hasChildren": boolean
}

export type TypeHospitalLevelAndRegion = IntHospitalLevelAndRegion[]

export interface IntHospitalLevelAndRegionResponseData  extends IntResponse{
    data: TypeHospitalLevelAndRegion

}

//根据医院名字查询医院返回数据
export interface IntHospitalInfo extends IntResponse{
    data: TypeHospitalLevelAndRegion

}
