<template>
    <div class="P-registerStep1">
        <!-- 顶部结构 -->
        <div class="top">
            <div class="hosname">{{ hosName }}</div>
            <div class="line">|</div>
            <div class="category">{{ bigName }}</div>
            <div class="dot">.</div>
            <div class="depname">{{ depName }}</div>
        </div>

        <div class="center">
            <!-- 日期 -->
            <h1 class="title">{{ workDateString }}</h1>
            <!-- 中间卡片 -->
            <div class="container">
                <ul class="containerList">
                    <!-- 通过状态控制不同的class ,来控制样试选择 cardButtomOff-->
                    <li class="containerListItem"   
                    :class="{'containerListItemOff':item.availableNumber===-1||item.status===-1,'containerListItemActive':isContainerListItemActive}" 
                    v-for="(item, index) in workData.bookingScheduleList" :key="index"
                     @mouseenter="(event)=>handleContainerListItemMouseOver(event)"  @mouseleave="handleContainerListItemMouseOver(0)"
                    >
                        <div class="card">
                            <div class="cardTop" :class="{'cardTopOff':item.availableNumber===-1||item.status===-1}">{{ item.workDate}}-{{ item.dayOfWeek }}</div>
                            <div class="cardButtom"  :class="{'cardButtomOff':item.availableNumber===-1||item.status===-1}">
                                 <div v-if="item.status===-1">停止挂号</div>
                                 <div v-if="item.status===0">
                                     {{ item.availableNumber===-1?"约满了":`有号`}}
                                     <span id="availableNumber" v-if="item.availableNumber!==-1">(剩余:{{ item.availableNumber}})</span>
                                 </div>
                                 <div v-if="item.status===1">即将放号</div>

                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!--  分页器-->
            <!-- paging -->
            <div class="ginationBlock">
                <el-pagination layout=" prev,pager, next" :total="total"  v-model:current-page="pageNo" @current-change="fethchWorkData" />
            </div>
        </div>

        <!-- 顶部展示医生结构 -->
        <div class="bottom">
            <!-- 即将放号的时间 -->
            <div class="willDate">
                 <span class="willDateTime">2023年06月03日</span>放号
            </div>
            <!-- 展示放号的上午和下午 -->
            <div class="docs">
                 <div class="docsDay docsMorning">
                     <div class="docsMorningTitle">上午号源:</div>
                     <!-- 单个卡 -->
                     <div class="docsDetail">
                         <div class="docsDetailLeft">
                            <div class="docsDetailLeftTop">副主任医师 <span class="docsDetailLeftTopSpan">|</span><span>邵红</span></div> 
                            <div class="docsDetailLeftBottom">内分泌科常见病内分泌科常见病内分泌科常见病内分泌科常见病内分泌科常见病内分泌科常见病</div>
                        </div>
                         <div class="docsDetailRight">
                             <span class="docsFee">¥100</span>
                             <el-button type="primary" class="docsCount">剩余:20</el-button>
                         </div>
                     </div>
                 </div>
                 <div class="docsDay docsAfternoon">
                    <div class="docsAfternoonTitle">下午号源:</div>
                
                 </div>
            </div>
        </div>





    </div>
</template>
<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { reqHospitalWorking } from '@/api/hosptial/index'

import  type { IntHospitalWorkData } from '@/api/hosptial/type'
import { ElMessage } from 'element-plus';


//分页总数,当前页，和页的大小
let total = ref<number>(50)
let pageNo = ref<number>(1)
let limit = ref<number>(6)

let $route = useRoute()
//医院名称
let hosName = ref<string>("")
//科别
let bigName = ref<string>("")

//科室名称
let depName = ref<string>("")

//
let workDateString =ref<string>()

let workData = ref<any>({})

let isContainerListItemActive= ref<boolean>(false)

//组件挂载时需要请求排班数据
onMounted(() => {
    
    fethchWorkData()

})

//@current-change="handleCurrentChange" 

//当mouse移动到卡片时，需要产生特效

const handleContainerListItemMouseOver=(event) =>{
  

   
}


//获取挂号数据

const fethchWorkData = async () => {
    //ts 断言类型，这里比如as string
    let result: IntHospitalWorkData = await reqHospitalWorking(pageNo.value, limit.value, $route.query.hoscode as string, $route.query.depcode as string)
    if (result.code ===200) {
        hosName.value = result.data.baseMap.hosname
        bigName.value = result.data.baseMap.bigname
        depName.value = result.data.baseMap.depname
        total.value = result.data.total
        workDateString.value = result.data.baseMap.workDateString
        workData.value = result.data
    } else{
        ElMessage({
         type:"error",
         message:"请求挂号数据失败"
        })
    }


}







</script>
<style scoped lang="scss">
.P-registerStep1 {
    .top {
        display: flex;
        margin-top: 40px;
        margin-left: 20px;
        color: #7f7f7f;

        .hosname {
            font-size: 14px;

            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
        }

        .line,
        .dot {
            margin: 0 8px;
        }

        .category {
            font-size: 14px;
        }

        .depname {
            font-size: 14px;
        }
    }

    .center {
        margin-top: 60px;
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        //标题
        .title {
            font-weight: 900;
        }

        //卡片
        .container {
            margin-top: 50px;
            width: 100%;

            .containerList {
                display: flex;
                .containerListItem {
                    //height: 90px;
                    flex: 1;
                    border: 1px solid skyblue;
                    margin: 0 5px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    :hover{
                        cursor: pointer;
                        border:  2px solid rgb(52, 107, 247);
                        //transform: translateY(-5px);
                        transition: transform 0.2s;
                        box-sizing: content-box;
                        margin: -2px;
                        
                    }
                    .card {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        
                        .cardTop {
                            background-color: #e8f2ff;
                            color: #4ca1f7;
                            height: 30px;
                            line-height: 30px;
                            width: 100%;
                            text-align: center;
                            pointer-events: none;
            
                        }
                        & .cardTopOff{
                            color: #7f7f7f;
                        }
                        .cardButtom {
                            height: 60px;
                            color: #409Eff;
                            line-height: 60px;
                            font-weight: 800;
                            pointer-events: none;
                            #availableNumber{
                                font-size: 14px;
                                font-weight: 400;
                                color: #79bbff;
                            }
                        }
                        & .cardButtomOff{
                            color: #7f7f7f;
                           
                        }
                    }

                }
                //点击单日卡号有效果
                & .containerListItemActive{
                    
                }
                & .containerListItemOff {

                    border: 1px solid #7f7f7f;
                    color: red;
                    .card {
                        .cardTop {
                            background-color: #ddd;
                        }
                    }
                   :hover{
                        box-sizing: content-box;
                        margin: -2px;
                        border:2px solid #7f7f7f;
                        cursor:not-allowed;
                    }

                }

            }
        }

        // 分页器
        .ginationBlock {
            margin-top: 50px;
        }
    }

    .bottom{
        margin-left: 20px;
        .willDate{
            width: 300px;
            margin: 40px auto;
            font-size: 20px;
            text-align: center;
            font-weight: 900;
            .willDateTime{
                color: red;
            }
        }
        .docs{
            .docsDay{
                .docsDetail{
                width: 100%;
                height: 80px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #ddd;
                .docsDetailLeft{
                    .docsDetailLeftTop{
                        margin-bottom: 16px;
                        color:skyblue;
                        .docsDetailLeftTopSpan{
                            margin: 0 5px;
                        }
                    }
                    .docsDetailLeftBottom{
                        font-size: 14px;
                        color: #aaa;
                        width: 600px;
                        text-wrap:nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;

                        
                    }
                }
                .docsDetailRight{
                    .docsFee{
                        color: #aaa;
                    }
                    .docsCount{
                        width: 110px;
                        height: 40px;
                        margin: 0 30px;
                    }

                }
                
               }

            }
            .docsMorning{
                .docsMorningTitle{
                    font-size: 16px;
                    font-weight: 700;
                    margin-bottom: 20px;
                }
               
            }
            .docsAfternoon{
                .docsAfternoonTitle{
                    font-size: 16px;
                    font-weight: 700;
                    margin-top: 40px;
                    margin-bottom: 20px;
                }
            }
            
        }

    }

}
</style>