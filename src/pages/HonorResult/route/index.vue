<template>
  <div class="honorresult">
    <div class="title">
      <span class="t1">{{title}}(月)</span>
      <p class="info">{{schoolTitle}}</p>
    </div>
    <div class="resultList" v-if="ranksList.length!==0">
      <div class="list-item"
           v-for="item in ranksList"
           :key="item.orderID">
        <van-row type="flex"
                 justify="space-between"
                 align="center">
          <van-col span="3">
            <p class="num t-c">{{item.orderID}}</p>
          </van-col>
          <van-col span="16"
                   class="content">
            <p class="text">{{item.name}}
            </p>
            <p class="text">{{item.identity}}
            </p>
          </van-col>
          <van-col span="5">
            <p class="text t-c">{{item.score}}</p>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="noData"
         v-else>暂无数据</div>

  </div>
</template>

<script>
export default {
  name: "honor-result",
  data() {
    return {
      title: ""
    };
  },
  created() {
    const { title, type, formValue } = this.$route.query;
    this.title = title;
    this.$_fetchData(type, formValue);
  },
  watch: {
    loading(n) {
      if (n) {
        this.$toast({
          type: "loading",
          duration: 0,
          forbidClick: true,
          loadingType: "spinner",
          message: "加载中..."
        });
      } else {
        setTimeout(() => {
          this.$toast.clear();
        }, 300);
      }
    }
  },
  computed: {
    loading() {
      return this.$store.state.honorresult.loading;
    },
    info() {
      return this.$store.state.honorresult.info;
    },
    schoolTitle() {
      return this.info.title;
    },
    ranksList() {
      return this.info.ranks;
    }
  },
  methods: {
    $_fetchData(type, formValue) {
      if (type === "scoretop") {
        this.$store.dispatch({
          type: "honorresult/getScoreTop",
          payload: {
            ...formValue
          }
        });
      } else {
        this.$store.dispatch({
          type: "honorresult/getScorepgrTop",
          payload: {
            ...formValue
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" >
.honorresult {
  padding: 10px;
  font-size: 14px;
  color: #1abc9c;
  .title {
    color: #1abc9c;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin: 12px 0;
    .t1 {
      border-bottom: 1px solid;
      padding: 6px;
    }
    .info {
      padding: 10px 0;
      color: #323233;
    }
  }
  .resultList {
    .list-item {
      margin: 12px 0;
      padding: 10px 0px;
      border: 1px solid #1abc9c;
      border-radius: 4px;
      color: #323233;
      font-weight: bold;
      .content {
        padding-left: 10px;
        border-right: 1px solid #1abc9c;
      }
      .num {
        font-size: 36px;
        border-right: 1px solid #1abc9c;
      }
      .text {
        font-size: 16px;
        color: #323233;
      }
    }
  }
  .noData {
    text-align: center;
    font-size: 16px;
    padding-top: 30px;
  }
}
</style>
