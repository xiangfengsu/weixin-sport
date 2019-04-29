<template>
  <div class="applyquery">
    <div class="queryPanel">
      <van-cell-group :border="false">
        <van-cell is-link
                  @click="showPicker"
                  arrow-direction="down">
          <template slot="title">
            <span>锻炼日期:</span>
            <span class="picker">{{showDate===''?'请选择查询日期':showDate}}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <div class="listBox"
         v-if="resultsList.length!==0">
      <div class="listCard"
           v-for="item in resultsList"
           :key="item.subID">
        <div class="header">
          <van-row type="flex"
                   justify="space-between"
                   align="center">
            <van-col span="2">
              <van-icon name="manager" />
            </van-col>
            <van-col span="12">
              <p class="info">
                <span>递交时间</span>
                <span>{{item.submitTime}}</span>
              </p>
            </van-col>
            <van-col span="10">
              <p :class="{status:true, status_1:item.status === 1,status_2:item.status === 2,status_3:item.status === 3}">
                <span>{{dic[item.status]}}</span>
              </p>
            </van-col>
          </van-row>
        </div>
        <div class="body">
          <van-cell-group :border="false">
            <van-cell title="姓名"
                      :value="item.name" />
            <van-cell title="学校"
                      :value="item.school" />
            <van-cell title="班级"
                      :value="item.className" />
            <van-cell title="地点"
                      :value="item.address" />
            <van-cell title="项目"
                      :value="item.item" />
            <van-cell title="有效时长"
                      :value="item.time" />
            <van-cell title="锻炼形式"
                      :value="item.style" />
            <van-cell title="锻炼成果"
                      :value="item.result" />
            <van-cell title="参与伙伴"
                      :value="item.witness" />
            <van-cell title="本次分数"
                      :value="item.score" />

          </van-cell-group>
        </div>
        <div class="footer"
             v-if="item.status === 1">
          <span class="btn-handle">
            <van-button plain
                        v-if="item.userType === 1"
                        type="primary"
                        @click="$_updateHandle(item.subID)">修改</van-button>
            <van-button plain
                        v-if="item.userType === 2"
                        type="primary"
                        @click="$_checkHandle(item.subID,1)">审核通过</van-button>
          </span>
          <span class="btn-handle">
            <van-button plain
                        v-if="item.userType === 1"
                        type="danger"
                        @click="$_delHandle(item.subID)">删除</van-button>
            <van-button plain
                        v-if="item.userType === 2"
                        type="danger"
                        @click="$_checkHandle(item.subID,2)">审核不通过</van-button>
          </span>
        </div>
      </div>
    </div>
    <div class="noData"
         v-else>暂无数据</div>
    <van-popup v-model="show"
               position="bottom">
      <van-datetime-picker v-model="currentDate"
                           @cancel="show=false"
                           @confirm="onConfirmHandle"
                           @change="onDateChange"
                           :max-date="maxDate"
                           :min-date="minDate"
                           type="date" />
    </van-popup>
  </div>
</template>

<script>
import { msToDate, getWeek } from "../../../core/utils/utils";
export default {
  name: "apply-query",
  data() {
    const y = new Date(Date.now()).getFullYear();
    const m = new Date(Date.now()).getMonth();
    const d = new Date(Date.now()).getDate();

    return {
      dic: {
        1: "待审核",
        2: "审核通过",
        3: "审核不通过"
      },
      currentDate: new Date(y, m, d),
      currentShowDate: "",
      show: false,
      maxDate: new Date(y, m, d),
      minDate: new Date(y, 0, 1)
    };
  },
  computed: {
    showDate() {
      return this.currentShowDate === ""
        ? ""
        : `${this.currentShowDate} ${getWeek(this.currentShowDate)}`;
    },
    resultsList() {
      return this.$store.state.applyquery.results;
    },
    loading() {
      return this.$store.state.applyquery.loading;
    }
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

  methods: {
    showPicker() {
      this.show = true;
    },
    onConfirmHandle(value) {
      this.currentDate = value;
      this.currentShowDate = msToDate(value);
      this.show = false;
      this.$store.dispatch({
        type: "applyquery/getApplyList",
        payload: {
          date: this.currentShowDate
        }
      });
    },
    onDateChange(c) {
      const value = c.getValues().join("-");
      this.currentShowDate = value;
    },
    $_checkHandle(subID, status) {
      this.$dialog.confirm({
        message: status === 1 ? "确定审核通过？" : "确定审核不通过?",
        beforeClose: (action, done) => {
          if (action === "confirm") {
            this.$store.dispatch({
              type: "applyquery/checkApplyItem",
              payload: {
                subID,
                status,
                done,
                context: this
              }
            });
          } else {
            done();
          }
        }
      });
    },
    $_delHandle(subID) {
      this.$dialog.confirm({
        message: "确定删除？",
        beforeClose: (action, done) => {
          if (action === "confirm") {
            this.$store.dispatch({
              type: "applyquery/delApplyItem",
              payload: {
                subID,
                done,
                context: this
              }
            });
          } else {
            done();
          }
        }
      });
    },
    $_updateHandle(subID) {
      this.$store.dispatch({
        type: "applyquery/getApplyItem",
        payload: {
          subID,
          context: this,
          done: item => {
            // console.log(item);
            this.$router.push({
              name: "apply",
              query: { type: "update", updateItem: JSON.stringify(item) }
            });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" >
.applyquery {
  padding: 10px;
  font-size: 14px;
  .queryPanel {
    padding: 1px 1px;
    background-color: #1abc9c;
    span {
      display: inline-block;
    }
    .picker {
      margin-left: 20px;
      // border: 1px solid red;
    }
  }
  .listBox {
    .listCard {
      padding: 12px;
      border: 1px solid #1abc9c;
      border-radius: 4px;
      margin: 24px auto;
      .header {
        color: #1abc9c;
        font-weight: bold;
        border-bottom: 1px solid #1abc9c;
        padding-bottom: 12px;
        .van-icon {
          font-size: 28px;
        }
        .info {
          span {
            display: block;
            font-size: 16px;
          }
        }
        .status {
          text-align: right;
          font-size: 26px;
          &.status_1 {
            color: #ff6600;
          }
          &.status_2 {
            color: #009900;
          }
          &.status_3 {
            color: #ff0000;
          }
        }
      }
      .footer {
        text-align: center;
        .btn-handle {
          display: inline-block;
          margin: 0 10px;
        }
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
