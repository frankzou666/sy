<template>
    <div class="G-login">
        <el-dialog v-model="userStore.isShowLoginDiag" title="用户登录" width="800" @close="handleCloseDiag">
            <!-- 使用自带的删格布局,一行分为24列 -->
            <el-row>
                <el-col :span="12">
                    <div class="logint" :style="{'height':logintHeight}">
                         <div v-show="scene==0"> 
                            <el-form :model="loginForm" :rules="rules" ref="loginFormRef" :key="Math.random()*1000000">
                            <el-form-item prop="phone" >
                                <el-input placeholder="请你输入手机号码" v-model="loginForm.phone"  class="logintInput" :prefix-icon="User"></el-input>

                            </el-form-item>   
                            
                             <el-input placeholder="请输入手机验证码" v-model="loginForm.code"  name="verifyCode" class="logintInput" :prefix-icon="Lock"></el-input>
                             <el-button  :disabled="isPhone&&isPhoneDisabled?false:true" @click="getSmsCode()">
                                 <span v-if="isGetVerCodeStart">获取验证码</span>
                                 <CountDown v-else></CountDown>
                                 
                             </el-button>
                            </el-form>
                          <div class="buttom">
                            <el-button style="width:344px" type="primary" size="default" :disabled="isPhone?false:true" @click="handleUserLogin()">用户登录</el-button>
                            
                          </div>
                          <div class="wechatLogin">
                            
                            <p>微信扫码登录</p>
                            <el-icon class="wechatLogo" @click="handleLoginType(1)"><ChatDotRound > </ChatDotRound></el-icon>
                          </div>
                        </div> 
                       
                        <!-- 微信验证码登录 -->
                        <div  class="wxQrCodeContainer"  v-show="scene==1"> 
                           
                          <!-- 存放二维码页面容器-->
                          <div id="wxQrCode"></div>
                          <div class="wechatLogin">
                            <p>手机登录</p>
                            <el-icon class="wechatLogo" @click="handleLoginType(0)"><Phone /></el-icon>
                          </div>
                        </div> 
                    </div> 
                </el-col>
                <el-col :span="12">
                    <div class="leftContaner">
                         <div class="top">
                             <div class="item">
                                <img src="../../assets/images//code_login_wechat.png" alt="">
                                <p>微信扫一扫关注</p>
                             </div>
                             <div class="item">
                                <img src="../../assets/images//code_app.png" alt="">
                                <p>APP扫一扫下载</p>
                             </div>
                         </div>
                         <div class="bttom">
                            <h2>XXX官方指定挂号平台</h2>
                            <p>安全.便捷.放心</p>
                         </div>
                    </div>
                </el-col> 
            </el-row>
            <template #footer>
                <el-button type="primary" @click="handleCloseDiag">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang='ts'>
 import {ref,reactive,computed,watch} from 'vue'

 import useUserStore from '@/store/modules/user.ts'
 import { User,Lock,ChatDotRound,Phone } from '@element-plus/icons-vue'


// 引入自定义到计时组件
 import CountDown from '@/components/count-down/index.vue'
 import { ElMessage } from 'element-plus';
 import type { FormInstance, FormRules } from 'element-plus'




 import {reqSmsCode,reqWxLoginParam} from '@/api/hosptial/index'
 import { verify } from 'crypto';

 import  type  { IntWxLoginInfoResponse } from '@/api/hosptial/type.ts'
 


//定义规则类型


 let userStore = useUserStore()

 let scene = ref<number>(0) //0代表手机登录，1代表微信登录
 let isPhoneDisabled = ref<boolean>(true)
  let logintHeight=ref<string>("300px") //登录框容器高
 let loginForm= reactive({
    phone:'',
    code:'',
 })
 //表示是否点获取验证码了
 let isGetVerCodeStart=ref<number>(1)

 let loginFormRef = ref('')

 //切换微信/手机登录
 const handleLoginType= async (obj:number)=>{
    scene.value = obj;
    // 如果是是换到微信扫码登录，需要请求二维码
    if (obj===1) {
        logintHeight.value="500px" //登录框容器设置高一点
        let wxRedirectUri = encodeURIComponent(window.location.origin+'/wxlogin') //获当前地址
        let result:IntWxLoginInfoResponse = await reqWxLoginParam(wxRedirectUri)
        if (result.code===200) {
            new WxLogin({
            self_redirect: true, //true:手机点击确认登录后可以在 iframe 内跳转到 redirect_uri
            id: "wxQrCode", //显示二维码容器设置
            appid: result.data.appid, //应用位置标识appid
            scope: "snsapi_login", //当前微信扫码登录页面已经授权了
            redirect_uri: result.data.redirectUri, //填写授权回调域路径,就是用户授权成功以后，微信服务器向公司后台推送code地址
            state: result.data.state, //state就是学校服务器重定向的地址携带用户信息
            style: "black",
            href: "",
        });

        }
    }
    
    //手机登录
    if (obj===0) {
        logintHeight.value="300px" //登录框容器设置高一点
    }
 }

 //自定义校验规则的三个参数,验证通过和不通过
 const validatorForPhone=(rule:any,value:any,callback:any)=>{
    const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (reg.test(value)){
        callback()
    } else {
        callback(new Error("不是合法的手机号码"))
    }
    
 }

 //表单验证规则
 const rules = reactive({
  phone: [
    // { required: true, message: '请输入手机号', trigger: 'blur' },
    // { min: 11, max: 11, message: '长度需要11位', trigger: 'blur' },
     //自定义校验规则，定义一个函数
     {trigger:'blur',validator:validatorForPhone}
  ],
  code: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
 })

 

 //请求短信验证码
 const getSmsCode=()=>{
    try {
        userStore.getCode(loginForm.phone)
        setTimeout(()=>{loginForm.code = userStore.verifyCode},500)
        //开始获取验证码，开始倒计时，并且按钮要灰
        isGetVerCodeStart.value = 0
        //五秒过后要还原
        isPhoneDisabled.value=false
        setTimeout(()=>{isGetVerCodeStart.value=1;isPhoneDisabled.value=true},5000)
    } catch(error) {
        ElMessage({
            type:"error",
            message:"获取手机验证码失败"
        })
    }

 }

 //点击用户登录请求
 const handleUserLogin=async ()=>{
    //在form的验证都通过后，才能执行后续语句
    await (loginFormRef.value.validate()) ;

    try{
        //必须等待登录成功
        await userStore.userLoginSms(loginForm)
        //还要关闭登录框
        userStore.showLoginDiag(false)
        //提示用户登录成功
        ElMessage({type:"success",message:"登录成功"})

    } catch (error) {
        ElMessage({
            type:"error",
            message:"登录失败"
        })
    }
    
    
 }
  
 
 //选项式，如何使用computed
 let isPhone = computed(()=>{
     const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
     return reg.test(loginForm.phone);

 })

 //对话框关闭
 const handleCloseDiag=async ()=>{
   //清空收集的数据
   loginForm.phone="";
   loginForm.code="";
   loginFormRef.value.resetFields() ;
   userStore.showLoginDiag(false);

 }

 //监听场景值，来决定开启还是关闭
 //监听的变量，监听的回调函数,当值为1时，处理对应的函数
watch(()=>scene.value,(val:number)=>{
     if (val===1) {
        userStore.queryWxState()
     }
})

</script>
<style scoped lang="scss">
  .G-login{
    width: 300px;

    ::v-deep(.el-dialog__body){
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
    .logint{
        height: 500px;
        border: 1px solid #ccc;
        padding: 20px;
        margin-top: 30px;
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .logintInput{
            padding-bottom: 20px;
        }
        .buttom{
            margin: 20px 0;
     
        }
        .wechatLogin{
            text-align: center;
            p{
                padding-bottom: 5px;
            }
            .wechatLogo{
                font-size: 30px;
                color: rgb(87, 179, 87);
                
                :hover{
                    cursor: pointer;
                }
            }
        }
        .wxQrCodeContainer{
        }

    }
    .leftContaner{
        .top{
            display: flex;
            margin-top: 30px;
            .item{
                width: 200px;
                height: 200px;
                display: flex;
                flex-direction: column;
                align-items: center;
                img{
                   margin-bottom: 5px;  
                   width: 100px;
                   height: 100px;
                   
                }
                p{
                    font-size: 14px;
                }
            }
        }
        .bttom{
            text-align: center;
            h2{
                font-size: 20px;
                font-weight: 500;
            }
            p{
                padding-top: 10px;
            }
            
        }
    }
  }

</style>