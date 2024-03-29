<template>
    <div class="level">
        <h2>医院</h2>
        <div class="content">
            <div class="left">
                <p>等级:</p>
            </div>
            <ul class="list">
                <li class="item" :class="{ active: activeFlag == '' }" @click="handleChangeLevel('')">全部</li>
                <li class="item" v-for="(item, index ) in levelArr" :key="item.value"
                    :class="{ active: activeFlag == item.value }" @click="handleChangeLevel(item.value)">{{ item.name }}</li>
            </ul>

        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref, onMounted, defineProps,defineEmits } from 'vue'
import { ElMessage } from 'element-plus';
import { reqHospitalLevelAndRegion } from '@/api/home/index.ts'
import type { IntHospitalLevelAndRegionResponseData, TypeHospitalLevelAndRegion } from '@/api/home/type'


//定义一个数组存放医院类型
let levelArr = ref<TypeHospitalLevelAndRegion>([])

//定义选定active
let activeFlag = ref<string>('')

//
let $emit = defineEmits(['handlehosType'])


//得到医院等级和地区
const getHospitalLevelAndRegion = async () => {
    let result: IntHospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('HosType')
    if (result.code === 200) {
        levelArr.value = result.data
    } else {

        ElMessage.error({
            message: "请求医院等级数据失败!"
        })
    }

}

const handleChangeLevel = (level: string) => {
    activeFlag.value = level
    //触发父组件事件，把级别传回给父组件
    $emit('handlehosType',level)

}

onMounted(() => {
    getHospitalLevelAndRegion()

})

</script>
<style scoped lang="scss">
.level {
    h2 {
        color: #7f7f7f;
        margin: 18px 0;
        font-weight: 900;
    }

    .content {
        color: #7f7f7f;
        display: flex;

        .list {
            display: flex;

            .item {
                margin-left: 13px;

                &.active {
                    color: skyblue;
                }
            }

            .item:hover {
                //  color: skyblue;
                cursor: pointer;
            }
        }
    }
}
</style>