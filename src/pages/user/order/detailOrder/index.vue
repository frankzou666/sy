<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span>挂号详情</span>
            </div>
        </template>
        <div class="top">
            <el-tag class="ml-2" type="success">
                <!-- 这里不能写成order.param因为后面的orderStatusString取决于前面的返回值，所以一定要用问号 -->
                <span> {{ order.param?.orderStatusString }}</span>
            </el-tag>
            <div class="right">
                <img src="../../../../assets/images/code_app.png" alt="">
                扫一扫,加我微信
            </div>

        </div>
        <!-- 订单详情 卡片底部信息 -->
        <div class="bottom">
            <div class="bottomeLeft">
                <el-descriptions class="margin-top" border :column="1">
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                就诊人信息
                            </div>
                        </template>
                        {{ order.patientName }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                就诊日期
                            </div>
                        </template>
                        {{ order.createTime }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                就诊医院
                            </div>
                        </template>
                        {{ order.hosname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                就诊科室
                            </div>
                        </template>
                        {{ order.depname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                医生职称
                            </div>
                        </template>
                        {{ order.title }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                医事服务费
                            </div>
                        </template>
                        <span style="color:red">{{ order.amount }}</span>
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                挂号单号
                            </div>
                        </template>
                        {{ order.id }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                挂号时间
                            </div>
                        </template>
                        {{ order.fetchTime }}
                    </el-descriptions-item>

                </el-descriptions>


            </div>

            <!-- 右侧卡片 -->
            <div class="bottomeRigth">
                <el-card style="max-width: 540px">
                    <template #header>
                        <div class="card-header">
                            <span>注意事项</span>
                        </div>
                    </template>
                    <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
                </el-card>
            </div>

        </div>
        <div class="btn">
            <el-popconfirm title="确定取消预约吗？" confirm-button-text="确定" cancel-button-text="取消" @confirm="cancelOrder">
                <template #reference>
                    <el-button>取消预约</el-button>
                </template>
            </el-popconfirm>

            <el-button type="primary" @click="handlePayBtn">支付</el-button>

        </div>

    </el-card>

    <!-- 支付二维码对话框 -->
    <el-dialog v-model="payDialogVisible" title="微信支付" width="400" :before-close="handleClose">
        <div class="diagLogBody">
            <img :src="qrCodeImgUrl" alt="">
            <p>请使用微信'扫一扫'完成支付</p>

        </div>


        <template #footer>
            <div class="dialog-footer">
                <el-button @click="cancelPayDialog">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    支付完成
                </el-button>
            </div>
        </template>
    </el-dialog>

</template>
<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus';

//引入二维码plugin
import QRCode from 'qrcode'

import type { IntGetOrderResponseData, IntGetOrder, IntQrCodeResponseData } from '@/api/user/type'
import { reqGetOrder, reqCancelOrder, reqQrCode, reqGetPayStatus } from '@/api/user/index'

let $route = useRoute()
let orderId = ref<number>()
let order = ref<any>({})
//二维码支付
let payDialogVisible = ref<boolean>(0)


//二维码图版的路径
let qrCodeImgUrl = ref<string>()
//存储定时器对像
let payStatusInterval = ref<any>()
//获取订单详情数据
const getOrderDetail = async () => {
    let result: IntGetOrderResponseData = await reqGetOrder(orderId.value)
    if (result.code === 200) {
        order.value = result.data
    }


}

//取消订单
const cancelOrder = async () => {
    let result: IntGetOrderResponseData = await reqCancelOrder(orderId.value)
    if (result.code === 200) {
        ElMessage({
            type: "info",
            message: "挂号订单已成功取消！"
        })
        //再次获取订单数据
        getOrderDetail()
    } else {
        ElMessage({
            type: "error",
            message: "取消挂号订单失败！"
        })
    }
    clearInterval(payStatusInterval.value)
}

//支付按钮，显示二维码
const handlePayBtn = async () => {
    payDialogVisible.value = true
    let result: IntGetOrderResponseData = await reqQrCode(orderId.value)
    //根据url生成二维dcgx
    if (result.code === 200) {
        //QRCode组件返回的对像是promise,所以通过await取得值
        let imgUrl = await QRCode.toDataURL(result.data.codeUrl)
        qrCodeImgUrl.value = imgUrl

        //二维码已生成，需要不断的去轮询支付状态,每2秒
        payStatusInterval.value = setInterval(async () => {
            let result = await reqGetPayStatus(orderId.value)
            //如果data为true 表示支付成功,关闭二维码对话框,清除定时器,同时要再获取订单详情数据
            if (result.data) {
                //关闭二维码对话框
                payDialogVisible.value = false
                //提示
                ElMessage({
                    type: "success",
                    message: "支付成功"
                })
                //清除定时器
                clearInterval(payStatusInterval.value)
                //获取订单详情数据
                getOrderDetail()
            }
        }, 4000)
    }

}

//关闭支付对话框，并清除定时器
const cancelPayDialog=()=>{
    payDialogVisible.value = false
    //清除定时器
    clearInterval(payStatusInterval.value)

}
//组件挂载时，获取订单数据
onMounted(() => {
    orderId.value = $route.query.orderId
    getOrderDetail()

}
)





</script>
<style scoped lang="scss">
.top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;

        img {
            width: 40px;
            height: 40px;
            margin-right: 5px;
        }
    }

    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;

}

//    底部信息
.bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .bottomeLeft {
        flex: 0.4;
    }

    .bottomeRigth {
        flex: 0.6;
        margin-left: 20px;
    }

}

.btn {
    margin-top: 10px;
    margin-left: 80px;
}

::v-deep(.el-dialog__body) {
    border-top: 1px solid #7f7f7f;
    border-bottom: 1px solid #7f7f7f;

}

.diagLogBody {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        font-size: 12px;
    }

}
</style>
