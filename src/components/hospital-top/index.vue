 <template>
  <div class="top">
    <div class="content">
        <div class="left">
            <a href="#" @click="goHome">
                <img class="logoImg" src="@/assets/images/logo.png" alt="">
                <h1>XXX统一预约挂号平台</h1>
            </a>
        </div>
        <div class="right">
            <a href="#" class="help">帮助中心</a>
            <a href="#" class="loginOrReg" @click="showLoginDiag(true)" v-if="!userStore.userInfo?.name">登录/注册 </a>
            <el-dropdown  v-else>
               <span class="el-dropdown-link">
                {{ userStore.userInfo?.name }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
               </span>
            <template #dropdown>
               <el-dropdown-menu>
                  <el-dropdown-item command="a">实名认证</el-dropdown-item>
                  <el-dropdown-item command="b">挂号订单</el-dropdown-item>
                  <el-dropdown-item command="c">就诊人管理</el-dropdown-item>
                  <el-dropdown-item command="e" @click="logout">退出登录</el-dropdown-item>
               </el-dropdown-menu>
            </template>
            </el-dropdown>
        </div>
        
    </div>
  </div>
 </template>
 <script setup lang='ts'>

  import { useRouter } from 'vue-router';

  import { ElMessage } from 'element-plus';
  import useUserStore from '@/store/modules/user.ts'

  let userStore = useUserStore()

  let $router = useRouter();
  
  //点返回首页
  const goHome=()=>{
    $router.push({path:'/'})

  }

  //显录登录对话框

  const showLoginDiag=(isShow:boolean)=>{
     userStore.showLoginDiag(isShow)
     let audit = new Audio()
     audit.src="./src/assets/images/xm2540.wav"
     audit.play()

  }

  //退出登录
  const logout=()=>{
    //退出的时候要干哪些事情？
    //清除pinia数据
    userStore.logout();
    //重新跳转到首页
    //提示用户登录成功
    ElMessage({type:"primary",message:"退出登录成功!"})

    $router.push({path:"/"});
  }


 </script>
  <style scoped lang="scss">
  .top{
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 70px;
    border-bottom: 4px solid #eee;
    background-color: #fff;

    .content{
        display: flex;
        
        align-items: center;
        justify-content: space-between;
        width: 1200px;
        height: 100%;
        margin:  0 auto;
     
        .left {
            a {
                display: flex;
                align-content: center;
                justify-content: center;
                h1{
                    line-height:60px;
                    font-size: 26px;
                    color: skyblue;
                }
                .logoImg{
                    height: 60px;
                    margin-right: 10px;
                }
            }
        }
        .right{
            a{
                color: #bbb;
                font-size: 14px;
            }    
            .help{
                padding-right: 10px;

            }

        }

        
    }

  }


 </style>