<template>
    <div>
        <Carousel />

        <!-- //首页search -->
        <Search />

        <!-- 底部展示医院 -->
        <el-row gutter=20>
            <el-col :span="20">
                <!-- 等级子组件 -->
                <Level @handlehosType="handlehosType"></Level>
                <!-- 地区组件 -->
                <Area @handledistrictcode="handledistrictcode"></Area>
                <!-- 医院卡片组件 -->
                <div class="cards" v-if="hasHospitals.length>0">
                    <Card class="item" v-for="(item,index) in hasHospitals" :key="item.id" :hospitalInfo="item"></Card>
                </div>

                <el-empty  v-else description="没有医院数据" />


                <!-- paging -->
                <div class="demo-pagination-block">
                    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize"
                        :page-sizes="[5,10,20]"  
                        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                        prev-text="上一页" next-text="下一页" total-text="总条数"
                        @current-change="handleCurrentChange" />
                </div>

            </el-col>
            
            <!-- 右侧静态通知组件 -->
            <el-col :span="4">
                <Tip></Tip>
            </el-col>

        </el-row>

    </div>
</template>
<script setup lang='ts'>
  import {ref,onMounted} from 'vue'
  import Carousel from '@/pages/home/carousel/index.vue'
  import Search from '@/pages/home/search/index.vue'
  import Level from '@/pages/home/level/index.vue'
  import Area from '@/pages/home/area/index.vue'
  import Card from '@/pages/home/card/index.vue'
  import Tip from '@/pages/home/tip/index.vue'
  import {reqHospital} from '@/api/home/index.ts'
  import type { Content,IntHospitalResponse } from '@/api/home/type'

  

  let pageNo=ref<number>(1)
  let pageSize=ref<number>(10)
  let total=ref<number>(0)

  //医院等级和地区
  let hostype=ref<string>('')
  let districtcode=ref<string>('')
  
  let hasHospitals = ref<Content>([])

  onMounted(()=>{
    getHospital()
  })
 
  const getHospital= async ()=>{
    let result:IntHospitalResponse  =  await reqHospital(pageNo.value,pageSize.value,hostype.value,districtcode.value)
    if (result.code==200) {
        hasHospitals.value = result.data.content
        total.value= result.data.totalElements
    }
    
  }   

  //分页器页码发生变
  const handleCurrentChange=()=>{
     getHospital();
  }
  //分页器size
  const handleSizeChange=()=>{
     getHospital()
  }

  //用来从子组件接收医院类型的数据
  const handlehosType=(hosType:string)=>{
    hostype.value=hosType
    getHospital();
  }

  //用来从子组件接收地区
  const handledistrictcode=(districtCode:string)=>{
    districtcode.value=districtCode
    getHospital();
  }






</script>
<style scoped lang="scss">
.carouselImg {
    width: 100%;
    height: 100%;
}

.cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
        width: 49%;
        margin-bottom: 6px;
    }
}
.demo-pagination-block{
    margin-top: 6px;
    width: 600px;
    margin: 0 auto;
}
</style>