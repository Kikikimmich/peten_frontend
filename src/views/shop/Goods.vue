<template>
  <div class="goods" id="goods" name="goods">
    <!-- 面包屑 -->
    <!-- <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>全部商品</el-breadcrumb-item>
        <el-breadcrumb-item v-if="search">搜索</el-breadcrumb-item>
        <el-breadcrumb-item v-else>分类</el-breadcrumb-item>
        <el-breadcrumb-item v-if="search">{{search}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <!-- 面包屑END -->

    <!-- 分类标签 -->
    <div class="nav">
      <div class="product-nav">
        <div class="title">分类</div>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :name="'' + item.id"
          />
        </el-tabs>
      </div>
    </div>
    <!-- 分类标签END -->

    <!-- 主要内容区 -->
    <div class="main">
      <div class="list">
        <MyList :list="product" v-if="product.length>0"></MyList>
        <div v-else class="none-product">抱歉没有找到相关的商品，请看看其他的商品</div>
      </div>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="currentChange"
        ></el-pagination>
      </div>
      <!-- 分页END -->
    </div>
    <!-- 主要内容区END -->
  </div>
</template>
<script>
import MyList from '@/components/Shop/MyList'

import { getCategory, getProduct} from '@/api/product'

export default {
  components: { MyList },
  data() {
    return {
      categoryList: "", //分类列表
      categoryId: '', // 分类id
      product: '', // 商品列表
      total: 0, // 商品总量
      pageSize: 15, // 每页显示的商品数量
      currentPage: 1, //当前页码
      activeName: "-1", // 分类列表当前选中的id
      search: "" // 搜索条件
    };
  },
  created() {
    this.ininParam()
    // 获取分类列表
    this.fetchCategory();
    this.getData();
  },
  watch: {
    // 监听点击了哪个分类标签，通过修改分类id，响应相应的商品
    activeName: function(val) {
      if (val == 0) {
        this.categoryId = '';
      }
      if (val !=0 && this.categoryId != val) {
        this.categoryId = val;
      }
      // 初始化商品总量和当前页码
      this.total = 0;
      this.currentPage = 1;
      // 更新地址栏链接，方便刷新页面可以回到原来的页面
      this.$router.push({
        path: "/shop/goods",
        query: { categoryId: this.categoryId }
      });
    },
  },
  methods: {
    ininParam(){
      // this.activeName = "-1"; // 初始化分类列表当前选中的id为-1
      this.total = 0; // 初始化商品总量为0
      this.currentPage = 1; //初始化当前页码为1
      // 如果路由没有传递参数，默认为显示全部商品
      // 如果路由传递了categoryId，则显示对应的分类商品
      if (this.$route.query.categoryId != undefined) {
        if(this.$route.query.categoryId != this.categoryId){
          this.categoryId = this.$route.query.categoryId;
        }
        this.activeName = "" + this.categoryId;
      }
    },

    // 返回顶部
    backtop() {
      const timer = setInterval(function() {
        const top = document.documentElement.scrollTop || document.body.scrollTop;
        const speed = Math.floor(-top / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          top + speed;

        if (top === 0) {
          clearInterval(timer);
        }
      }, 20);
    },
    // 页码变化调用currentChange方法
    currentChange(currentPage) {
      this.currentPage = currentPage;
      if (this.search != "") {
        this.getProductBySearch();
      } else {
        this.getData();
      }
      this.backtop();
    },
    // 向后端请求分类列表数据
    fetchCategory() {
        getCategory().then(res => {
          const val = {
            id: 0,
            name: "全部"
          };
          const data = res.data;
          data.unshift(val);
          this.categoryList = data;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    // 向后端请求全部商品或分类商品数据
    getData() {
      // 如果分类列表为空则请求全部商品数据，否则请求分类商品数据
      getProduct(this.currentPage, this.pageSize, this.categoryId).then((res)=>{
        this.product = res.data.list;
        this.total = res.data.pageInfo.totalRow;
      })
    },
    // 通过搜索条件向后端请求商品数据
    getProductBySearch() {
      this.$axios
        .post("/api/product/getProductBySearch", {
          search: this.search,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
        .then(res => {
          this.product = res.data.Product;
          this.total = res.data.total;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }
  }
};
</script>

<style scoped>
.goods {
  background-color: #f5f5f5;
}
/* 面包屑CSS */
.el-tabs--card .el-tabs__header {
  border-bottom: none;
}
.goods .breadcrumb {
  height: 50px;
  background-color: white;
  margin-bottom: auto;
}
.goods .breadcrumb .el-breadcrumb {
  width: 1225px;
  line-height: 30px;
  font-size: 16px;
  margin: 0 auto;
}
/* 面包屑CSS END */

/* 分类标签CSS */
.goods .nav {
  background-color: white;
  margin-top: 10px;
}
.goods .nav .product-nav {
  width: 1225px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
}
.nav .product-nav .title {
  width: 50px;
  font-size: 16px;
  font-weight: 700;
  margin-left: 10px;
  margin-top: 10px;
  float: left;
}
/* 分类标签CSS END */

/* 主要内容区CSS */
.goods .main {
  margin: 0 auto;
  max-width: 1225px;
}
.goods .main .list {
  min-height: 650px;
  padding-top: 14.5px;
  margin-left: -13.7px;
  /* overflow: auto; */
}
.goods .main .pagination {
  height: 50px;
  text-align: center;
  display: block;
  margin:0 auto;
}
.goods .main .none-product {
  color: #333;
  margin-left: 13.7px;
}
/* 主要内容区CSS END */
</style>