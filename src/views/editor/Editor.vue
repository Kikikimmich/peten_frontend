<template>
    <div class="wrap flex flex-direction">
      <div class="write-header flex justify-between align-center">
        <div class="header-left">
          <input
            type="text"
            v-model="form.title"
            placeholder="输入文章标题"
          />
        </div>
        <div class="header-right">
          <el-button type="primary" @click="publish">{{
            id ? "更新" : "发布"
          }}</el-button>
          <div class="panel" v-show="isPanel" @blur="publish">
            <h3>发布文章</h3>
            <div class="up">
              <h4>封面图片</h4>
              <div class="flex-center">
                <el-image
                  class="header-img"
                  fit="cover"
                  :src="form.cover || defaultImg"
                ></el-image>
                <UploadImg :isLimit="false" @success="success"></UploadImg>
              </div>
            </div>
            <!-- <div class="up">
              <h4>BGM</h4>
              <div class="flex flex-direction">
                <span>{{ form.BGM }}</span>
                <UploadImg
                  :isLimit="false"
                  :type="'sound'"
                  @success="successBGM"
                ></UploadImg>
              </div>
            </div> -->
            <!-- <div>
              <h4>分类</h4>
              <ul class="flex">
                <li
                  v-for="(item, index) in tag"
                  :key="index"
                  @click="tagTab(index)"
                  :class="{ active: index === tagIndex }"
                >
                  {{ item }}
                </li>
              </ul>
            </div> -->
            <div>
              <h4>标签</h4>
              <ul>
                <div>
                  <input
                    class="tag-input"
                    type="text"
                    v-model="form.tags"
                    placeholder="添加标签"
                  />
                </div>
              </ul>
            </div>
            <div class="flex-ali btn">
              <el-button type="primary" @click="submit">{{
                id ? "确定并更新" : "确定并发布"
              }}</el-button>
            </div>
          </div>
        </div>
      </div>
      <MarkDown
        :value="form.content"
        class="flex-sub"
        :editable="true"
        :subfield="true"
        :tool="true"
        defaultOpen=""
        @change="change"
      ></MarkDown>
    </div>
</template>
  
<script>
import MarkDown from "@/components/MarkDown";
import UploadImg from "@/components/UploadImg";
import { articreInsert, detail, update } from "@/api/write";
import { mapGetters } from "vuex";
import notify from "@/utils/notify";
export default {
  name: "Write",
  components: { MarkDown, UploadImg },
  data() {
    return {
    //   form: {
    //     blog_title: "",
    //     blog_tag: "前端",
    //     blog_cover: "",
    //     blog_brief: "",
    //     blog_content: "",
    //     BGM: "",
    //   },
        form:{
            title: '', // 标题
            tags: [], // 标签
            content: '', // 内容
            cover: '' // 文章封面
        },
      tag: ["前端", "后端", "其他"],
      tagIndex: 0,
      defaultImg: require("@/assets/image/default-avatar.svg"),
      isPanel: false,
      id: this.$route.query.id,

      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          {
            min: 1,
            max: 25,
            message: '长度在 1 到 25 个字符',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    if (this.id) this.init(this.id);
  },
  methods: {
    init(id) {
      detail({
        blog_id: id,
      }).then((res) => {
        if (res.status == 1) {
          this.form = res.data;
          console.log(this.form);
        }
      });
    },
    tagTab(index) {
      this.tagIndex = index;
      this.form.tag.push(this.tag[index]);
    },
    success(value) {
      this.form.cover = value;
    },
    // successBGM(value) {
    //   this.form.BGM = value.realname;
    // },
    publish() {
      this.isPanel = !this.isPanel;
    },
    change(value) {
      this.form.content = value;
    },
    submit() {
      if (this.form.title == "") {
        notify.error("请填写标题", "top-left");
        return;
      }
      if (this.form.cover == "") {
        notify.error("请上传封面图", "top-left");
        return;
      }
      console.log(this.form);
      if (!this.id) {
        articreInsert(this.form).then((res) => {
          if (res.code === 200) {
            this.$message.success("发布成功");
            this.$router.replace("/");
          } else {
            this.$message.error("发布失败");
          }
          this.publish();
        });
      } else {
        update(this.form).then((res) => {
          if (res.code === 200) {
            this.$message.success("更新成功");
            this.$router.back();
          } else {
            this.$message.error("更新失败");
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100vh;
  background: white;
}

.wrap .write-header {
  width: 100%;
  height: 64px;
  padding: 0 16px;
}

.wrap .write-header .header-left {
    float: left;
  width: 60%;
  max-width: 80%;
  height: 64px;
}

.wrap .write-header .header-left input[type="text"] {
  max-width: 100%;
  height: 64px;
  font-size: 24px;
  outline: none;
  border: none;
  font-weight: 700;
}

.wrap .write-header .header-right {
    position: relative;
    float: right;
    margin-top: 15px;
}


.wrap .write-header .header-right .panel {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 6666;
  width: 336px;
  padding: 24px;
  white-space: nowrap;
  color: #909090;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 2px;
  box-shadow: 0 1px 2px #f1f1f1;
  margin-top: 14px;
}

.wrap .write-header .header-right .panel::before {
  content: "";
  position: absolute;
  margin-left: -0.5rem;
  top: -0.6rem;
  left: 78%;
  width: 1rem;
  height: 1rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-right: none;
  border-bottom: none;
  transform: rotate(45deg);
}

.wrap .write-header .header-right .panel > h3 {
  opacity: 0.8;
  margin-bottom: 14px;
}

.wrap .write-header .header-right .panel h4 {
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 12px;
}

.wrap .write-header .header-right .panel .up {
  margin-bottom: 8px;
}

.wrap .write-header .header-right .panel .up span {
  display: inline-block;
  width: 250px;
  text-overflow: 250px;
  margin-bottom: 5px;
}

.wrap .write-header .header-right .panel .header-img {
  width: 72px;
  height: 72px;
  margin-right: 12px;
  object-fit: cover;
}

.wrap .write-header .header-right .panel li {
  margin: 0 5px 12px 0;
  font-size: 14px;
  white-space: nowrap;
  border: 1px solid #f1f1f1;
  border-radius: 2px;
  padding: 4px 8px;
  cursor: pointer;
}

.wrap .write-header .header-right .panel li:hover {
  border-color: rgba(0, 127, 255, 0.15);
  background-color: rgba(0, 127, 255, 0.05);
}

.wrap .write-header .header-right .panel .active {
  border-color: rgba(0, 127, 255, 0.15);
  background-color: rgba(0, 127, 255, 0.05);
}

.wrap .write-header .header-right .tag-input {
  padding: 5px 0;
  width: 100%;
  font-size: 0.9em;
  border: none;
  border-bottom: 1px solid #f1f1f1;
  border-radius: 0;
  outline: none;
  color: #909090;
}

.wrap .write-header .header-right .btn {
  margin-top: 10px;
}

.v-note-wrapper{
    min-height: 100%;
    max-height: 100%;
}

</style>