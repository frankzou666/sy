<template>
    <div class="searchContent">
        <div class="searchContentWrapper">
            <el-autocomplete :trigger-on-focus="false" class="searchAutocomplete"
                v-model="hosname" :fetch-suggestions="querySearchAsync"
                @select="goDetail"
                placeholder="请输入医院名称" />
            <el-button class="searchBtn" type="primary">
                <el-icon style="vertical-align: middle">
                    <Search />
                </el-icon>
                &nbsp;搜索
            </el-button>
        </div>

    </div>
</template>
<script setup lang='ts'>
  import {ref} from 'vue'
  import { useRouter } from 'vue-router';
  import {reqHospitalInfoByName} from '@/api/home/index'
  import type {  IntHospitalInfo,Content } from '@/api/home/type.ts'

   //定义一个自动完成存放的变量
  let hosname = ref<string>('')

  //创建一个路由对像
  let $router = useRouter();

  //顶部组件的回调
  const querySearchAsync=async(keywords:string,cb:any)=>{
 
    let result:IntHospitalInfo = await reqHospitalInfoByName(keywords)
    let showData = result.data.map(item=>{
        return {value:item.hosname ,hoscode:item.hoscode}
    })
    cb(showData)
  }

  //选中到医院的详情
  const goDetail=(item:string)=>{
    //import { useRouter } from 'vue-router';,let $router = useRouter();
    $router.push({path:"/hospital/register",query:{hoscode:item.hoscode}})
    console.log(item)

  }







</script>
 



<style scoped lang='scss'>
.searchContent {
    width: 100%;
    margin-top: 20px;

    .searchContentWrapper {
        width: 700px;
        margin: 0 auto;
        display: flex;
        ::v-deep .searchAutocomplete {
            flex: 1;
            width: 200px;
        }

        .searchBtn {
            margin-left: 20px;
            width: 80px;

        }

    }
}
</style>