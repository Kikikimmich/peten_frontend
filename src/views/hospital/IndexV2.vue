<template>
    <div>
        <el-card shadow="never">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="宠物医院" name="Pet Hospital">
                   <HospitalList></HospitalList>
                </el-tab-pane>

                <el-tab-pane label="美容护理" name="Beauty Care">
                   <BeautyCareList></BeautyCareList>
                </el-tab-pane>

                <el-tab-pane label="体验馆" name="Experience Hall">
                    <ExperienceHallList></ExperienceHallList>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
  
<script>

// import { getList } from '@/api/article'

// import ContentCard from '@/components/ContentCard/index.vue'

// import Group from '@/views/content/group/Group.vue'

import HospitalList from '@/views/hospital/HospitalList.vue'

import BeautyCareList from '@/views/hospital/BeautyCareList.vue'

import ExperienceHallList from '@/views/hospital/ExperienceHallList.vue'

export default {
    name: 'health',
    components: { HospitalList, BeautyCareList, ExperienceHallList },
    data() {
        return {

            activeName: 'Pet Hospital',

        }
    },
    computed: {
       
    },
    created() {
       
    },
    methods: {

        handleClick(tab) {
        
        },
    }
}
</script>

<style></style>