 <template>
  <div class="bottom">
     <div class="bottomContainer">
        <div class="left">
         <p>京ICP备888888号,电话88888888</p>
        </div>
        <div class="right">
          <ul class="list">
            <li class="item"><a href="">联系我们</a></li>
            <li class="item"><a href="">合作伙伴</a></li>
            <li class="item"><a href="">用户协议</a></li>
            <li class="item"><a href="">隐私协议</a></li>
          </ul>
        </div>

     </div>
    
  </div>
 </template>
 <script setup lang='ts'>
 </script>
  <style scoped lang="scss">
  .bottom{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    height: 50px;
    width: 100%;
    background-color: #f0f2f5;
    .bottomContainer{
      display: flex;
      justify-content: space-between;
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      align-items: center;
      .left{
         color: #bbb;
         font-size: 14px;
      }
      .right{
         .list{
            display: flex;
            .item{
               margin-left: 5px;
               a{
                  color: #bbb;
                  font-size: 14px;
               }
            }
         }

      }
    }
  }
 </style>