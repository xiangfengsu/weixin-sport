
<template>
  <div class="exception">
    <div class="imgBlock">
      <div class="imgEle"
           :style="{backgroundImage:backgroundImage}" />
    </div>
    <div class="content">
      <h1>{{exceptionTitle}}</h1>
      <div class="desc">{{exceptionDesc}}</div>
      <div class="actions">
        <router-link to="/"
                     :style="{display:'inline-blcok'}">
          <van-button type="primary">返回首页</van-button>

          <!-- <el-button type="primary">返回首页</el-button> -->
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import config from './typeConfig';

export default {
  name: 'exception',
  props: {
    type: Number,
    title: String,
    desc: String,
  },
  data() {
    return {
      pageType: this.type in config ? this.type : 404,
    };
  },

  computed: {
    backgroundImage() {
      return `url(${config[this.pageType].img})`;
    },
    exceptionTitle() {
      return this.title ? this.title : config[this.pageType].title;
    },
    exceptionDesc() {
      return this.desc ? this.desc : config[this.pageType].desc;
    },
  },
};
</script>
<style lang="scss">
.exception {
  display: block;
  height: 80%;
  min-height: 500px;
  .imgBlock {
    flex: 0 0 62.5%;
    width: 62.5%;
    padding-right: 0px;
    margin: 0 auto;
    zoom: 1;
    &:before,
    &:after {
      content: " ";
      display: table;
    }
    &:after {
      clear: both;
      visibility: hidden;
      font-size: 0;
      height: 0;
    }
  }
  .imgEle {
    height: 360px;
    width: 100%;
    max-width: 430px;
    float: right;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
  }
  .content {
    flex: auto;
    text-align: center;
    h1 {
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      margin-bottom: 24px;
    }
    .desc {
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
    }
    .actions {
      button:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
}
</style>
