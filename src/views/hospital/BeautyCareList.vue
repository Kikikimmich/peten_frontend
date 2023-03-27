<template>
    <div>
        <!-- <el-card shadow="never">
           
        </el-card> -->

        <div id="root" v-for="(item, i) in 3">
            <ItemCard></ItemCard>

        </div>
    </div>
</template>

<script>



import ItemCard from '@/views/hospital/ItemCard.vue'


export default {
    name: 'BeautyCareList',
    components: { ItemCard },
    computed: {

    },
    data() {
        return {
            hosptialInfo: null,
            dataList: [],
            currentPage: 1,
            total: 0,
            pageSize: 10,

            map: null,
            cityInfo: null,
            myPosition: null,
        }
    },
    created() {
        // this.initMap()

        // this.getPetHosptial('', 1 )

    },
    methods: {
     
    }
}


</script>

<style></style>