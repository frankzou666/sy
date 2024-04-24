
//对axios进行二次封装， 为什么要进行二次封装
import axios from "axios"
import { ElMessage } from "element-plus"

//引入userStore
import useUserStore from '@/store/modules/user.ts'

//创建aios实例
const request = axios.create({
    baseURL: '/api', //请求都有带api
    timeout: 5000, //超出5ms
})

//请求拦截器
request.interceptors.request.use((config) => {
    //提供的一个配置对像，这个config身上有一个headers的公共参数

    //如果有token,就需要加上
    let userStore = useUserStore()
    if(userStore.userInfo.token) {
        config.headers.token=userStore.userInfo.token
    }

    return config;
})

//响应拦截器,主要是提供了两个callback，response和error
request.interceptors.response.use(
    (response) => { return response.data },  //先暂时对请求直接返回
    (error) => {
        console.log(error)
        let status = error.response.status
        switch (status) {
            case 404:
                ElMessage({ type: 'error', message: '404了' });
                break;
            default:
                break;
        }
        return Promise.reject(new Error(error.message))
    }
)



export default request
