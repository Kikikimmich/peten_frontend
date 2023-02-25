<template>
    <div>
        <!-- <div class="show_info">
                            <el-button type="primary" @click="showPetHospital">宠物医院</el-button>
                        </div> -->
        <div id="root" v-show="hosptialInfo" v-for="(item, i) in dataList">
            <div class="hosptoal-root" @click="searchDetail(item)">
                <div class="hosptial-left">
                    <div class="hosptial-photo">
                        <img :src="item.photos[0].url">
                    </div>
                    <div class="hosptial-info">
                        <p class="hosttial-name" style="font-weight: bold;">{{ item.name }}</p>
                        <p class="hosptial-address">地址:{{ item.address }}</p>
                        <p class="hosptial-tel">电话:{{ item.tel }}</p>
                    </div>
                </div>
                <div class="hosptial-detail" style="height: 60px;">
                    <el-button type="primary" @click="showPetHospitalDetail(item)">详情</el-button>
                </div>
            </div>

        </div>
        <div v-show="hosptialInfo">
            <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" @current-change="currentChange">
            </el-pagination>
        </div>
    </div>
</template>
  
<script>

import bus from '@/bus/bus'

import { mapActions, mapGetters } from "vuex";

export default {
    name: 'PetHosptial',
    components: {},
    computed: {
        ...mapGetters([
            'getHospitalDetail'
        ])
    },
    data() {
        return {
            hosptialInfo: null,
            dataList: [],
            currentPage: 1,
            total: 0,
            pageSize: 10,
        }
    },
    created() {
        bus.$on('hosptialInfo', val => {
            this.hosptialInfo = val
            this.dataList = val.poiList.pois
            this.dataList.forEach((data) => {
                if (data.photos == null || data.photos.length == 0) {
                    data.photos = [{
                        title: '',
                        url: ''
                    }]
                }
            })
            this.currentPage = val.poiList.pageIndex
            this.total = val.poiList.count
            this.pageSize = val.poiList.pageSize
        })
    },
    methods: {
        ...mapActions(["setHospitalDetail"]),


        searchDetail(item){
            bus.$emit("searchDetail", item.id)
        },

        showPetHospital() {

        },
        // 跳转详细信息
        showPetHospitalDetail(detail) {
            console.log("detail", detail)
            this.setHospitalDetail(detail);
            console.log("ggggg",this.getHospitalDetail)
            this.$router.push({ path: '/hospital/detail' })
        },
        currentChange(val) {
            console.log("pageChange", val)
            bus.$emit("pageChange", val)
        }
    }
}
</script>
  
<style scoped>
.hosptoal-root {
    width: 100%;
    height: 100px;
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
}

.hosptial-photo {
    width: 80px;
    height: 80px;
    display: inline-block;
    margin-left: 10px;
}

#root .hosptial-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 5px;
}


#root {
    display: flex;
    flex-direction: column;
}

#root div {
    display: flex;
    justify-content: space-between;
    padding: 10px;
}

</style>
  