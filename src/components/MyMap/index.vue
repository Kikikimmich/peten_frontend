<template>
    <div>
        <div id="container"></div>
        <!-- <div id="panel"></div> -->
    </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import bus from '@/bus/bus'

import { mapActions } from "vuex";

window._AMapSecurityConfig = {
    securityJsCode: '1dbf90857c868c4b99c98165da706acb'
}
export default {
    data() {
        return {
            map: null,
            autoOptions: {
                input: ''
            },
            searchPlaceInput: '',
            auto: null,
            placeSearch: null,
            district: null,
            polygons: [],
            showHeatOrNot: false,
            heatmap: null,
            heatmapList: null,

            // 定位信息
            cityInfo: null,
            // 我的位置
            myPosition: null,

            city: '广州',
            currrentPage: 1

        }
    },
    methods: {
        ...mapActions(["setMyPosition"]),

        initMap() {
            AMapLoader.load({
                key: '02c854342b6ea9c8f1e85cb0a6f2882f', // 申请好的Web端开发者Key，首次调用 load 时必填
                version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: ['AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType', 'AMap.Geolocation', 'AMap.AutoComplete', 'AMap.PlaceSearch'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            })
                .then(AMap => {
                    this.map = new AMap.Map('container', {
                        //设置地图容器id
                        viewMode: '3D', //是否为3D地图模式
                        zoom: 12, //初始化地图级别
                        // center: [121.473667, 31.230525] //初始化地图中心点位置
                    })
                    this.map.addControl(new AMap.Scale())
                    this.map.addControl(new AMap.ToolBar())
                    this.map.addControl(new AMap.HawkEye())
                    this.map.addControl(new AMap.MapType())
                    let geolocation = new AMap.Geolocation({ enableHighAccuracy: true })
                    geolocation.getCityInfo((status, result) => {
                        //只能获取当前用户所在城市和城市的经纬度
                        if (status == 'complete') {
                            this.cityInfo = result
                        }
                    });
                    geolocation.getCurrentPosition((status, result) => {
                        if (status == 'complete') {
                            // onComplete(result)
                            this.myPosition = result
                            this.setMyPosition(result)
                        }
                    });
                    this.map.addControl(geolocation)
                    this.auto = new AMap.AutoComplete(this.autoOptions)
                    this.placeSearch = new AMap.PlaceSearch({
                        map: this.map
                    }) //构造地点查询类
                    this.auto.on('select', this.select)
                })
                .catch(e => {
                    console.log(e)
                })
        },
        select(e) {
            this.placeSearch.setCity(e.poi.adcode)
            this.placeSearch.search(e.poi.name) //关键字查询查询
            this.drawBounds(e.poi.name)
            this.map.setZoom(16, true, 1)
        },
        // 行政区区域划分
        drawBounds(newValue) {
            //加载行政区划插件
            if (!this.district) {
                //实例化DistrictSearch
                var opts = {
                    subdistrict: 1, //获取边界不需要返回下级行政区
                    extensions: 'all', //返回行政区边界坐标组等具体信息
                    level: 'district' //查询行政级别为 市
                }

                this.map.plugin(['AMap.DistrictSearch'], () => {
                    this.district = new AMap.DistrictSearch(opts)
                })
                // this.district = new AMap.DistrictSearch(opts)
            }
            //行政区查询
            this.district.search(newValue, (status, result) => {
                console.log(result)
                if (result != null) {
                    this.feedBack('区域搜索成功', 'success')
                    if (this.polygons != null) {
                        this.map.remove(this.polygons) //清除上次结果
                        this.polygons = []
                    }

                    var bounds = null
                    if (result.districtList) {
                        bounds = result.districtList[0].boundaries
                    }
                    if (bounds) {
                        for (var i = 0, l = bounds.length; i < l; i++) {
                            //生成行政区划polygon
                            var polygon = new AMap.Polygon({
                                strokeWeight: 1,
                                path: bounds[i],
                                fillOpacity: 0.4,
                                fillColor: '#80d8ff',
                                strokeColor: '#0091ea'
                            })
                            this.polygons.push(polygon)
                        }
                    }
                    this.map.add(this.polygons)
                    this.map.setFitView(this.polygons) //视口自适应
                } else {
                    this.feedBack('区域搜索失败', 'error')
                }
            })
        },
        feedBack(msg, feedBackType) {
            this.$message({
                showClose: true,
                message: msg,
                type: feedBackType
            })
        },
        showHeatMap() {
            this.map.plugin(['AMap.PlaceSearch'], () => {
                //构造地点查询类
                var placeSearch = new AMap.PlaceSearch({
                    pageSize: 50, // 单页显示结果条数
                    pageIndex: 1, // 页码
                    city: this.searchPlaceInput, // 兴趣点城市
                    citylimit: true //是否强制限制在设置的城市内搜索
                    //map: this.map, // 展现结果的地图实例
                    // panel: 'panel', // 结果列表将在此容器中进行展示。
                    // autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                })
                //关键字查询
                placeSearch.search('宠物医院', (status, result) => {
                    // console.log(result)

                    this.getHotChartPos('宠物医院', result)
                })
            })
            this.$notify({
                title: '成功',
                message: '热力图获取成果，但是由于电脑性能，我们仅加载部分数据',
                type: 'success'
            })
        },
        getHotChartPos(detail, result) {
            let lengthSize = result.poiList.pageSize
            const count = result.poiList.count
            // const lengthPage = count / lengthSize
            if (lengthSize > count) {
                lengthSize = count
            }
            for (var n = 0; n < lengthSize; n++) {
                // this.map.plugin(['AMap.PlaceSearch'], () => {
                //构造地点查询类
                var realSearch = new AMap.PlaceSearch({
                    pageSize: 50, // 单页显示结果条数
                    pageIndex: n + 1, // 页码
                    city: this.searchPlaceInput, // 兴趣点城市
                    citylimit: true //是否强制限制在设置的城市内搜索
                    // map: this.map, // 展现结果的地图实例
                    // panel: 'panel', // 结果列表将在此容器中进行展示。
                    // autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                })
                realSearch.search(detail, (status, result) => {
                    // for (var j = 0; j < 50; j++) {
                    // this.map.remove(this.map.getAllOverlays('marker'))
                    //var centerPoint = [result.poiList.pois[j].location.lng, result.poiList.pois[j].location.lat]
                    // console.log(result)
                    //热力图
                    this.showHatChart(result)
                    // }
                })
            }
        },
        showHatChart(result) {
            var info = []
            for (let i = 0; i < 50; i++) {
                info.push({
                    lng: result.poiList.pois[i].location.lng,
                    lat: result.poiList.pois[i].location.lat,
                    count: 3 * 50 * Math.round(Math.random() * (10 - 2) + 2)
                })
            }

            this.map.plugin(['AMap.HeatMap'], () => {
                //初始化heatmap对象
                this.heatmap = new AMap.HeatMap(this.map, {
                    radius: 56, //给定半径
                    opacity: [0, 0.5]
                    /*,
                      gradient:{
                          0.5: 'blue',
                          0.65: 'rgb(117,211,248)',
                          0.7: 'rgb(0, 255, 0)',
                          0.9: '#ffea00',
                          1.0: 'red'
                      }
                       */
                })
                //设置数据集
                this.heatmap.setDataSet({
                    data: info,
                    max: 100
                })
                this.heatmapList.push(this.heatmap)
                this.heatmap.show()
            })
        },
        getPetHosptial(city, page) {

            var placeSearch = new AMap.PlaceSearch({
                // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
                city: '广州',
                pageSize: 10, // 单页显示结果条数
                pageIndex: page, // 页码
                citylimit: true,  //是否强制限制在设置的城市内搜索
                map: this.map, // 展现结果的地图实例
                // panel: "panel", // 结果列表将在此容器中进行展示。
                autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                extensions: 'all'
            })

            let pos = [this.myPosition.position.lng, this.myPosition.position.lat];
            placeSearch.searchNearBy('宠物医院', pos, 20000, (status, result) => {
                // 查询成功时，result即对应匹配的POI信息
                bus.$emit('hosptialInfo', result)
                console.log('page22', this.currrentPage)

                console.log('emit', result)
            })
        },
        getPetHosptialDetail(id) {

            var placeSearch = new AMap.PlaceSearch({
                // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
                city: '广州',
                pageSize: 10, // 单页显示结果条数
                pageIndex: 1, // 页码
                citylimit: true,  //是否强制限制在设置的城市内搜索
                map: this.map, // 展现结果的地图实例
                // panel: "panel", // 结果列表将在此容器中进行展示。
                autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                extensions: 'all'
            })

            //详情查询
            placeSearch.getDetails(id, (status, result) => {
                if (status === 'complete' && result.info === 'OK') {
                    this.placeSearch_CallBack(result);
                }
            });

        },
        //回调函数
        placeSearch_CallBack(data) {
            var infoWindow = new AMap.InfoWindow({
                autoMove: true,
                offset: { x: 0, y: -30 }
            });
            var poiArr = data.poiList.pois;
            //添加marker
            var marker = new AMap.Marker({
                map: this.map,
                position: poiArr[0].location
            });
            this.map.setCenter(marker.getPosition());
            infoWindow.setContent(this.createContent(poiArr[0]));
            infoWindow.open(this.map, marker.getPosition());
        },
        createContent(poi) {  //信息窗体内容
            var s = [];
            s.push("<b>名称：" + poi.name + "</b>");
            s.push("地址：" + poi.address);
            s.push("电话：" + poi.tel);
            s.push("类型：" + poi.type);
            return s.join("<br>");
        }
    },
    mounted() {
        //DOM初始化完成进行地图初始化
        this.initMap()
    },
    created() {
        bus.$on('shareUserInput', val => {
            this.autoOptions.input = val.inputId
            this.searchPlaceInput = val.userInput
        })
        bus.$on('showPetHosptial', val => {
            this.currrentPage = val.currentPage
            this.city = val.city

            this.getPetHosptial('', this.currrentPage)
        })
        bus.$on('searchDetail', val => {
            this.getPetHosptialDetail(val)
        })
        bus.$on('pageChange', val => {
            console.log("val", val)
            this.currrentPage = val
            this.getPetHosptial('', this.currrentPage)
        })
        bus.$on('shareHeatMapShow', val => {
            this.showHeatOrNot = val
        })
    },
    watch: {
        searchPlaceInput(newValue) {
            if (newValue != null) {
                console.log(newValue)
                this.placeSearch.search(newValue)
                this.drawBounds(newValue)
                this.map.setZoom(16, true, 1)
            }
        },
        showHeatOrNot(newValue) {
            if (newValue) {
                this.showHeatMap()
            } else {
                this.heatmap.hide()
            }
        }
    }
}


</script>

<style  scoped>
#container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 700px;
}
</style>