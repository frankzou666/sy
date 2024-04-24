//定义用户相关的store


//创建pinia的两种方法,组合式和选项式api
import {defineStore} from 'pinia'

import {reqSmsCode,reqUserLogin} from '@/api/hosptial/index'
import { verify } from 'crypto'

import type {IntLoginParam,IntLoginInfoResponse} from '@/api/hosptial/type'

const useUserStore = defineStore('useUserStore',{

    state:()=>{
        //显录用户登录对话框变量
        
        return {  isShowLoginDiag:false,
                  verifyCode:'' ,
                  userInfo:JSON.parse(localStorage.getItem("userInfo") as string)||{}
                }
    },
    actions:{
        async showLoginDiag(isShowLoginDiag:boolean){
            this.isShowLoginDiag = isShowLoginDiag
        },
        //获取验证码
        async getCode(mobilePhone:string){
            //这个可以用来返回Promise对像
            let result:any = await reqSmsCode(mobilePhone);
            if (result.code==200) {
                this.verifyCode= result.data
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
           
        },
        //用户手机登录的方法
        async userLoginSms(loginData: IntLoginParam){
            let result:IntLoginInfoResponse = await reqUserLogin(loginData)
            if (result.code==200) {
                this.userInfo = result.data
                localStorage.setItem("userInfo",JSON.stringify(result.data))
                return "ok"
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        //退出
        logout(){
            this.userInfo={}
            localStorage.removeItem("userInfo")
        },
        //查询扫码结果
        queryWxState() {
            //每隔一段时间本地存储用户信息，如果有就关闭对话框
            let timer = setInterval(()=>{
                //说明用户扫码成功
                if(localStorage.getItem("userInfo")) {
                    this.isShowLoginDiag=false
                    this.userInfo = JSON.parse(localStorage.getItem("userInfo") as string)
                    clearInterval(timer);
                }
            },100)
        }
        
    },
    getters:{

    }


})


export default useUserStore;