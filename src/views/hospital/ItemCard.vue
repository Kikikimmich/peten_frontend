<template>
    <div>
        <el-card shadow="never">

            <div class="item-root" style="display: flex; justify-content: space-between;">
                <div class="item-left" style="display: flex; justify-content: space-between;">
                    <div class="item.cover" style="width: 100px; height: 100px;">
                        <img :src="item.photos[0].url">
                    </div>
                    <div class="item-info" style="margin-left: 10px;">
                        <p class="item-name" style="font-weight: bold;">{{ item.name }}</p>
                        <p class="item-address">地址:{{ item.address }}</p>
                        <p class="item-tel">电话:{{ item.tel }}</p>
                        <p class="item-tel">经营:{{ item.type }}</p>
                    </div>
                </div>
                <!-- <div class="item-detail" style="display: flex; justify-items: center; align-items: center;">
                    <el-button type="primary" @click="showPetHospitalDetail()">详情</el-button>
                </div> -->
            </div>

        </el-card>
    </div>
</template>

<script>


export default {
    name: 'ItemCard',

    computed: {

    },
    data() {
        return {
            item: {
                id: "B0HDUMHZLY",
                name: "爱诺耐芙动物医院大学城分院",
                type: "医疗保健服务;动物医疗场所;宠物诊所",
                location: [
                    113.38811,
                    23.036014
                ],
                address: "南亭大道21-1正东方向10米",
                tel: "19128872735",
                distance: 806,
                shopinfo: "1",
                website: "",
                pcode: "440000",
                citycode: "020",
                adcode: "440113",
                postcode: "",
                pname: "广东省",
                cityname: "广州市",
                adname: "番禺区",
                email: "",
                photos: [
                    {
                        title: "",
                        url: "http://img.alicdn.com/i3/2208621942297/O1CN01hkmX9u1Sq4Z1EA95S_!!2208621942297-0-koubei.jpg"
                    },
                    {
                        title: "",
                        url: "http://store.is.autonavi.com/showpic/61466fa2080d4a9a7725dcff45c78f0d"
                    },
                    {
                        title: "",
                        url: "http://store.is.autonavi.com/showpic/688045614f850b4b869806fdfee471cd"
                    }
                ],
                entr_location: [
                    113.388196,
                    23.035999
                ],
                exit_location: null,
                groupbuy: false,
                discount: false,
                indoor_map: false,
                rating: "4.7",
                _idx: 0,
                index: 0,

                // cover: this.photos.length > 0 ? this.photos[0] : ""
            }
        }
    },
    created() {
        // this.initMap()

        // this.getPetHosptial('', 1 )

    },
    methods: {

        showPetHospitalDetail(){

        }

    }
}


</script>

<style></style>