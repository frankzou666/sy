 <template>
  <div class="area">
    <div class="content">
        <div class="left">地区:</div>
        <ul class="list">
            <li class="item" :class="{active:activeFlag==''}" @click="handleChangeRegion('')">全部</li>
            <li class="item" v-for ="(item,index) in regionArr" :key="item.id" :class="{active:activeFlag==item.value}" @click="handleChangeRegion(item.value)">{{ item.name }}</li>
        </ul>

     </div>
  </div>
 </template>
 <script setup lang='ts'>
    import {ref,onMounted,defineEmits} from 'vue'
    import { ElMessage } from 'element-plus';
    import {reqHospitalLevelAndRegion} from '@/api/home/index.ts'
    import type { IntHospitalLevelAndRegionResponseData,TypeHospitalLevelAndRegion } from '@/api/home/type'

    //定义一个数组存放医院类型
    let regionArr=ref<TypeHospitalLevelAndRegion>([])

    //定义选定active
    let activeFlag = ref<string>('')

    let $emit = defineEmits(['handledistrictcode'])

    //得到医院等级和地区
    const getHospitalRegion= async()=>{
        let result:IntHospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('Beijin')
        if (result.code===200){
            regionArr.value= result.data
        } else {

            ElMessage.error({
                message:"请求医院地区数据失败!"
            })
        }

    }

    const handleChangeRegion=(value:string)=>{
        activeFlag.value=value
        //把地区传回到父组件
        $emit('handledistrictcode',value)

    }

    onMounted(()=>{
        getHospitalRegion()

    })


    
 </script>
  <style scoped lang="scss">
  .area{
    margin: 18px 0;
    .content{
        color: #7f7f7f;
        display: flex;
        .left{
                min-width: 40px;

                
            }
        .list{
            display: flex;
            flex-wrap: wrap;
            
            .item{
                margin-left: 10px;
                margin-bottom: 8px;
                &.active{
                    color: skyblue;
                }
            }
            .item:hover{
                //color: skyblue;
                cursor: pointer;
            }
        }
    }
  }
 </style>