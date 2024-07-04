<template>
  <div class="P-cert">
    <!-- 实名认证组件 -->

    <el-card>
      <template #header>
        <div class="card-header">
          <span>实名认证</span>
        </div>
      </template>
      <div class="tips">
        <p>完成实名认证后才可以进行挂号</p>
      </div>
      <!-- 卡片底部，分为成功和没有成功的部分 -->
      <div class="certSuccess">
        <!-- 用户没有验证成功的结构 -->
        <el-descriptions v-if="false" border :column="1" size="small">
          <el-descriptions-item label-align="center" width="50px">
            <template #label>
              <div class="cell-item">
                用户姓名
              </div>
            </template>
            aa
          </el-descriptions-item>
          <el-descriptions-item label-align="center" width="50px">
            <template #label>
              <div class="cell-item">
                证件类型
              </div>
            </template>
            aa
          </el-descriptions-item>

          <el-descriptions-item label-align="center" width="50px">
            <template #label>
              <div class="cell-item">
                证件号码
              </div>
            </template>
            aa
          </el-descriptions-item>
        </el-descriptions>
        <!-- 用户已验证成功的结构 -->
        <el-form class="certiForm" v-else size="small">
          <el-form-item label="用户姓名" prop="name">
            <el-input placeholder="请输入用户姓名" />
          </el-form-item>
          <el-form-item label="证件类型" prop="name">
            <el-select placeholder="请选择证件类型">
              <el-option label="身份证" value="shanghai" />
              <el-option label="户口本" value="beijing" />
            </el-select>
          </el-form-item>

          <el-form-item label="证件号码" prop="name">
            <el-input placeholder="请输入证件号码" />
          </el-form-item>

          <el-form-item label="上传证件" prop="name">
            <el-upload action="#" list-type="picture-card" :auto-upload="false" :limit="1">
              <img class="el-upload-list__item-thumbnail" style="width: 100%;height:100%;" src="../../../assets/images/auth_example.png" alt="" />
            </el-upload>
          </el-form-item>

          <el-form-item >
            <div class="fromBtnGroup">
              <el-button class="btn"  width="100">重写</el-button>
              <el-button type="primary">提交</el-button>
            </div>
           
          </el-form-item>



        </el-form>




      </div>
    </el-card>


  </div>
</template>
<script setup lang='ts'>





</script>
<style scoped lang='scss'>
.P-cert {
  margin-top: 10px;

  .tips {
    font-size: 12px;
    color: #7f7f7f;
    text-align: center;
    margin-bottom: 10px;
  }

  .certSuccess {}

  .certiForm {
    width: 400px;
    margin: 0 auto;
  }
  .fromBtnGroup{
    width:300px;
    margin:0 auto;

  }


}

::v-deep(button){
  width:100px
}
</style>