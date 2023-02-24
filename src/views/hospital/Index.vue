<template>
    <div>
        <div id="search_wrap">
            <search></search>
        </div>
        <div>
            <my-map></my-map>
        </div>
        <div class="show_info">
            <el-button type="primary" @click="showPetHospital">宠物医院</el-button>
        </div>
        <div>
            <PetHosptial></PetHosptial>
        </div>
    </div>
</template>
  
<script>

import MyMap from '@/components/MyMap'
import Search from '@/components/Search/Search.vue'
import PetHosptial from '@/components/PetHosptial'

import bus from '@/bus/bus'


export default {
    name: 'index',
    components: { MyMap, Search, PetHosptial},
    data() {
        return {
            hosptialInfo: null,
            currentPage: 1
        }
    },
    created() {
        bus.$on('hosptialInfo', val => {
            this.hosptialInfo = val
        })
        bus.$on('pageChange', val => {
            this.currentPage = val
        })
    },
    methods: {
        showPetHospital(){
            let inputObject = {
                city: '',
                currentPage:this.currentPage
            }
            bus.$emit('showPetHosptial', inputObject)
        },
        showPetHospitalDetail(){
            console.log("333")
        }
    }
}
</script>
  
<style scoped>


</style>
  