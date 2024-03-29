 <template>
  <div class="P-tip">
    <!-- 常见科室 -->
    <div class="deparment">
         <div class="header">
            <div class="left">常见科室</div>
            <div class="right">
                <a href="">全部></a>
            </div>
         </div>
         <div class="content">
            <ul class="list">
                <li>神经内科</li>
                <li>消化内科</li>
                <li>呼吸内科</li>
                <li>内科</li>
                <li>神经外科</li>
                <li>妇科</li>
                <li>产科</li>
                <li>儿科</li>
            </ul>
         </div>
    </div>     
         
         <!-- 平台公告 -->
         <div class="notice">
         <div class="header">
            <div class="left">平台公告</div>
            <div class="right">
                <a href="">全部></a>
            </div>
         </div>
         <div class="content">
            <ul class="contentList">
                <li><a href="">关于通告1</a></li>
                <li><a href="">关于通告2</a></li>
                <li><a href="">关于通告3</a></li>
                <li><a href="">关于通告4</a></li>
                <li><a href="">关于通告5</a></li>
            </ul>
         </div>

         <!-- 停诊公告 -->
         <div class="stopNotice">
           <div class="header">
              <div class="left">停诊公告</div>
              <div class="right">
                  <a href="">全部></a>
              </div>
           </div>
           <div class="content">
              <ul class="contentList">
                  <li><a href="">关于停诊公告1</a></li>
                  <li><a href="">关于停诊公告2</a></li>
                  <li><a href="">关于停诊公告3</a></li>
                  <li><a href="">关于停诊公告4</a></li>
                  <li><a href="">关于停诊公告5</a></li>
              </ul>
           </div>
    </div>
    </div>
    
  </div>
 </template>


 <script setup lang='ts'>
 </script>


  <style scoped lang="scss">
   .P-tip{
      color: #7f7f7f;
      .deparment {
        .header{
           display: flex;
           justify-content: space-between;
           color: #7f7f7f;
           }
        .content{
            .list{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                li {
                    font-size: 14px;
                    margin-top: 20px;
                    width: 40%;
                }
            }
        }   

    }
    .notice {
        color: #7f7f7f;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #ddd;
        .header{
           display: flex;
           justify-content: space-between;
           }
        .content{
            .contentList{
                margin-top: 20px;
                li{
                    margin-left: 12px;
                    margin-bottom: 14px;
                    list-style: circle;
                    font-size: 14px;
                    a{
                       text-decoration: underline;
                       color: #7f7f7f;
                    };
                }
            }
     
        }   

    }

    .stopNotice {
        color: #7f7f7f;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #ddd;
        .header{
           display: flex;
           justify-content: space-between;
           }
        .content{
            .contentList{
                margin-top: 20px;
                li{
                    margin-left: 12px;
                    margin-bottom: 14px;
                    list-style: circle;
                    font-size: 14px;
                    a{
                       text-decoration: underline;
                       color: #7f7f7f;
                    };
                }
            }
     
        }   

    }
   }
   
 </style>