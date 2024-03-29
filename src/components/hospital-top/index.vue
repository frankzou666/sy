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
            <a href="#" class="loginOrReg">登录/注册</a>
        </div>
        
    </div>
  </div>
 </template>
 <script setup lang='ts'>

  import { useRouter } from 'vue-router';

  let $router = useRouter();
  
  //点返回首页
  const goHome=()=>{
    $router.push({path:'/home'})

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