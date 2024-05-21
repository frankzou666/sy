<template>
    <div class="P-registerStep2">
        <div class="title">
            <h2>确认挂号信息</h2>
        </div>

        <!-- 就诊人信息 -->
        <div class="personInfo">
            <el-card class="boxCard">
                <template #header>
                    <div class="card-header">
                        <span>请选择就诊人</span>
                        <el-button type="success">添加就诊人</el-button>
                    </div>
                </template>
                <!-- 就诊人封装 -->
                <div class="users">
                    <Visitor class="item" v-for="patient in patientArr" :key="patient.id" :patient="patient"></Visitor>
                </div>



            </el-card>
        </div>

        <!-- 医生信息 -->

        <div class="docInfo">
            <el-card class="boxCard">
                <template #header>
                    <div class="card-header">
                        <span>挂号信息</span>

                    </div>
                </template>
                <el-descriptions class="margin-top" :column="2" border>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                就诊日期
                            </div>
                        </template>
                        2024-03-02 周二 下午
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                就诊医院
                            </div>
                        </template>
                        北京人民医院
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                就诊科室
                            </div>
                        </template>
                        内科
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                医生姓名
                            </div>
                        </template>
                        李生
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                医生职科
                            </div>
                        </template>
                        主任医师
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                医生专长
                            </div>
                        </template>
                        内分谢疾病
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                医事服务费
                            </div>
                        </template>
                         <span>¥&nbsp</span><span class="docFee">100</span>
                    </el-descriptions-item>
                </el-descriptions>





            </el-card>
        </div>

        <!-- 挂号按钮 -->

        <div class="bottomBtn">
            <el-button type="success" class="confirmBtn">确认挂号</el-button>

        </div>


    </div>
</template>
<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { reqPatientAll } from '@/api/hosptial/index'

import type { IntPatientAll, TypePatient } from '@/api/hosptial/type'
import { ElMessage } from 'element-plus';
import { InputNumberInstance } from 'element-plus/lib/components/index.js';
import Visitor from './visitor.vue'

//就诊有人信息

let patientArr = ref<TypePatient>([])


//挂载当前用户的就诊人信息
onMounted(()=>{
    getPatientAll()

})
 
//获取前用户的就诊人信息
const getPatientAll=async ()=>{  
    let result:IntPatientAll = await reqPatientAll()
    if (result.code===200) {
        patientArr.value = result.data
    }
}

</script>
<style scoped lang="scss">
.P-registerStep2 {
    margin-left: 40px;

    .title {
        margin-top: 40px;

        h2 {
            font-weight: 700;
            font-size: 18px;
            color: #7f7f7f;

        }
    }

    .personInfo {
        margin-top: 20px;

        .boxCard {
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .users {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-between;

                .item {
                    width: 32%;
                }

            }

        }

    }

    .docInfo {
        margin-top: 10px;

        .boxCard {
            .docFee {
                color: red;
            }
        }

    }

    .bottomBtn {
        margin: 16px auto;
        width: 180px;
    
        .confirmBtn {
            width: 180px;
            height: 40px;
        }

    }



}
</style>