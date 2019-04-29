<template>
  <div class="home">
    <div class="home-card">
      <div class="title">
        <van-row type="flex"
                 justify="space-between"
                 align="center">
          <van-col span="12">
            <p class="name">{{userName}}</p>
            <p class="desc">{{title}}</p>
          </van-col>
          <van-col span="12">
            <p class="t-r"><span>评价等级：</span><span class="level">{{level}}</span></p>
            <p class="t-r"><span>诚信等级：</span><span class="level">{{credLevel}}</span></p>
            <p class="t-r">积分：{{score}}</p>
          </van-col>
        </van-row>
      </div>
      <div class="btn-handle-box">

        <van-button round
                    class="btn-mg"
                    type="primary"
                    size="large"
                    v-if="userType === 1"
                    @click="$_gotoPage('declare')">我要申报
        </van-button>
        <van-button round
                    class="btn-mg"
                    type="primary"
                    size="large"
                    v-if="userType === 2"
                    @click="$_gotoPage('check')">申报审核
        </van-button>
        <van-button round
                    class="btn-mg"
                    type="primary"
                    size="large"
                    v-if="userType === 1 || userType===2"
                    @click="$_gotoPage('search',search)">申报查询

        </van-button>
      </div>
    </div>
    <div class="home-card">
      <div class="title">
        <p class="name t-c">光荣榜</p>
      </div>
      <div class="btn-handle-box">
        <van-button round
                    class="btn-mg"
                    type="primary"
                    size="large"
                    @click="$_gotoPage('scoreTop',scoreTop)">学生个人积分前20排名

        </van-button>
        <van-button round
                    class="btn-mg"
                    type="primary"
                    size="large"
                    @click="$_gotoPage('scorePgrTop',scorePgrTop)">学生个人积分进步前20排行榜

        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  created() {
    this.$store.dispatch({
      type: "home/getUserInfo"
    });
  },
  computed: {
    info() {
      return this.$store.state.home.info;
    },
    userName() {
      return this.info.userName || "";
    },
    title() {
      return this.info.title || "";
    },
    userType() {
      // 1-学生，2-老师，3-领导
      return this.info.userType || 1;
    },
    level() {
      return this.info.level || "";
    },
    credLevel(){
      return this.info.credLevel || "";
    },
    score() {
      return this.info.score || "";
    },
    declare() {
      return this.info.declare - 0;
    },
    search() {
      return this.info.search - 0;
    },
    scoreTop() {
      return this.info.scoreTop - 0;
    },
    scorePgrTop() {
      return this.info.scorePgrTop - 0;
    }
  },
  methods: {
    $_gotoPage(type) {
      console.log(type);
      switch (type) {
        case "declare":
          this.$router.push({ name: "apply", query: { type: "create" } });
          break;
        case "search":
          this.$router.push({ name: "applyquery", query: { type: "search" } });
          break;
        case "check":
          this.$router.push({ name: "applyquery", query: { type: "check" } });
          break;
        case "scoreTop":
          this.$router.push({
            name: "honorquery",
            query: { title: "学生个人积分前20排名", type: "scoretop" }
          });
          break;
        case "scorePgrTop":
          this.$router.push({
            name: "honorquery",
            query: {
              title: "学生个人积分进步前20排行榜",
              type: "scorepgrtop"
            }
          });
          break;
      }
    }
  }
};
</script>
<style lang="scss" >
.home {
  padding: 10px;
  .home-card {
    padding: 12px;
    border: 1px solid #1abc9c;
    border-radius: 4px;
    margin-bottom: 24px;
    .title {
      font-weight: 600;
      color: #1abc9c;
      border-bottom: 1px solid;
      padding: 0 6px 10px 6px;
      .name {
        font-size: 32px;
      }
      .level {
        color: red;
        font-size: 26px;
      }
    }
    .btn-handle-box {
      width: 80%;
      margin: 12px auto;
    }
    .btn-mg {
      margin: 12px 0;
    }
  }
}
</style>
