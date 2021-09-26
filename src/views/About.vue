<template>
  <el-container>
    <el-main>
      <el-row justify="center" class="example">
        示例：“https://fastmarket.oss-cn-shenzhen.aliyuncs.com/oss/static/other/1/images/baseMap_index.jpg”
      </el-row>
      <!-- 输入图片URL -->
      <el-row justify="center" class="change-padding">
        <el-col :span="8">
          <el-input
            v-model="picUrl"
            placeholder="请输入您想转化的图片URL地址"
            type="textarea"
            rows="5"
            id="input"
            :autosize="{ minRows: 6, maxRows: 8 }"
            resize="none"
          ></el-input>
        </el-col>

        <!-- 输出图片base64编码 -->
        <el-col :span="8">
          <el-input
            v-model="picBase64"
            placeholder="获取对应图片base64编码"
            type="textarea"
            rows="5"
            id="input"
            :autosize="{ minRows: 6, maxRows: 6 }"
            resize="none"
            class="textarea"
          ></el-input>
        </el-col>
      </el-row>

      <el-row justify="center">
        <el-col :span="5">
          <el-button type="primary" v-on:click="submit">转换</el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            type="text"
            class="clear-button"
            v-on:click="clearTest('input')"
          >
            清空结果
          </el-button>
        </el-col>
        <el-col :span="1">
          <el-button
            type="text"
            class="copy-button"
            v-on:click="copyText('rcode')"
          >
            复制
          </el-button>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" v-on:click="submit">转换</el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            type="text"
            class="clear-button"
            v-on:click="clearTest('input')"
          >
            清空结果
          </el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="text" class="copy-button" v-on:click="copyUrl">
            复制
          </el-button>
        </el-col>
      </el-row>

      <el-row justify="center">
        <div id="container1"></div>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      picUrl: "",
      picBase64: "",
    };
  },
  methods: {
    getBase64(imgUrl) {
      var that = this;
      window.URL = window.URL || window.webkitURL;
      var xhr = new XMLHttpRequest();
      xhr.open("get", imgUrl, true);
      xhr.responseType = "blob";
      xhr.onload = function() {
        if (this.status == 200) {
          //得到一个blob对象
          var blob = this.response;
          console.log("blob", blob);
          let oFileReader = new FileReader();
          oFileReader.onloadend = function(e) {
            // 此处拿到的已经是 base64的图片了
            let base64 = e.target.result;
            that.picBase64 = base64;
            // console.log(base64)
          };
          oFileReader.readAsDataURL(blob);
          //====为了在页面显示图片，可以删除====
          var img = document.createElement("img");
          img.onload = function(e) {
            window.URL.revokeObjectURL(img.src); // 清除释放
          };
          let src = window.URL.createObjectURL(blob);
          img.src = src;
          // img.style.cssText ="max-width: 100% !important, max-height: 100% !important,display: block,margin: auto"
          // 设置 img 样式无效
          img.className = "img";
          document.getElementById("container1").appendChild(img);
          //====为了在页面显示图片，可以删除====
        }
      };
      xhr.send();
    },
    submit() {
      this.getBase64(this.picUrl);
    },
    async copyUrl() {
      await navigator.clipboard.writeText(this.picBase64);
      ElMessage({
        message: "复制成功！",
        type: "success",
      });
    },
  },
};
</script>

<style scoped>
.el-row {
  margin: 15px;
}
.change-padding .el-col {
  margin: 0 50px;
}
.change-text {
  font-weight: 700;
}
.clear-button {
  margin-left: 30px;
  font-size: 13px;
  color: #0474c8;
  cursor: pointer;
}
.example {
  margin: -10px 0 30px 0;
}
.textarea {
  overflow: hidden;
}
#container1 {
  width: 500px;
  height: 400px;
  /* overflow: hidden; */
}
#container1 .img {
  max-width: 100%;
  max-height: 100%;
  margin: auto;
}
.copy-button {
  color: rgb(44, 58, 75);
}
</style>
