<template>
  <div class="box-apply">
    <van-cell-group :border="false">
      <van-cell title="日期:">
        <div slot="label">
          <van-radio-group v-model="formValue.date">
            <van-radio v-for="item in dateList"
                       :key="item.key"
                       :name="item.key"
                       :class="{dateBlock:true}">
              {{ item.value }}
            </van-radio>
          </van-radio-group>
        </div>
      </van-cell>
      <!-- <van-field value="输入框已禁用"
                 label="日期:"
                 v-model="formValue.date"
                 :style="{padding:'10px 15px'}"
                 disabled /> -->
    </van-cell-group>
    <van-cell-group>
      <van-cell title="地点:">
        <div slot="label">
          <van-radio-group v-model="formValue.address">
            <van-radio v-for="item in addressList"
                       :key="item.key"
                       :name="item.key">
              {{ item.value }}
            </van-radio>
          </van-radio-group>
        </div>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="项目:">
        <div slot="label">
          <van-checkbox-group v-model="formValue.item">
            <van-checkbox v-for="item in itemList"
                          :key="item.key"
                          :name="item.key">
              {{ item.value }}
            </van-checkbox>
          </van-checkbox-group>
          <van-cell-group>
            <van-field placeholder="如非以上项目请手工填写"
                       v-model="formValue.itemInput" />
          </van-cell-group>
        </div>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="有效时长:">
        <div slot="label">
          <van-field placeholder="请输入有效时长"
                     type="number"
                     v-model="formValue.time">
            <p slot="button">
              <span class="unit">分钟</span>
              <span class="c-i unit">(范围：30-120分钟)</span></p>
          </van-field>
        </div>

      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="锻炼形式:">
        <div slot="label">
          <van-radio-group v-model="formValue.style">
            <van-radio v-for="item in styleList"
                       :key="item.key"
                       :disabled="item.disabled"
                       :name="item.key">
              {{ item.value }}
            </van-radio>
          </van-radio-group>
        </div>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="锻炼成果:">
        <div slot="label">
          <van-field placeholder="填写每天锻炼成果"
                     maxLength="30"
                     v-model="formValue.result">
            <p slot="button">
              <span class="c-i unit">(限30个字)</span></p>
          </van-field>
        </div>

      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="参与伙伴:">
        <div slot="label">
          <van-field placeholder="请输入姓名"
                     v-model="formValue.witnessName">
          </van-field>
          <van-field placeholder="请输入关系"
                     v-model="formValue.witnessRelation">
          </van-field>
          <van-field placeholder="请输入手机号"
                     type="tel"
                     maxlength="11"
                     v-model="formValue.witnessPhone">
          </van-field>
        </div>

      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="本次分数:">
        <div slot="label">
          <van-field :style="{width:'30%'}"
                     :value="score"
                     disabled>
            <p slot="button">
              <span class="unit">分</span></p>
          </van-field>
        </div>

      </van-cell>
    </van-cell-group>
    <div class="btn-mg">
      <van-button round
                  :style="{marginBottom:'24px'}"
                  size="large"
                  @click="$_handleTip">填报帮助

      </van-button>
      <van-button round
                  type="primary"
                  size="large"
                  @click="$_handleSubmit">递交审核

      </van-button>
    </div>
    <van-dialog v-model="dialogShow"
                title="填报帮助"
                :showCancelButton="false"
                show-cancel-button>
      <description />
    </van-dialog>
  </div>

</template>

<script>
import debounce from "lodash/debounce";
import Description from './description';
import { dateList, addressList, itemList, styleList } from "./constant";

export default {
  name: "apply",
  data() {
    return {
      dialogShow:false,
      dateList,
      addressList,
      itemList,
      styleList,
      formValue: {
        subID: "",
        date: dateList[0].key,
        address: -1,
        item: [],
        itemInput: "",
        time: "",
        style: -1,
        result: "",
        witnessName: "",
        witnessRelation: "",
        witnessPhone: "",
        score: "0"
      }
    };
  },
  components:{
    Description
  },
  created() {
    const { type, updateItem } = this.$route.query;
    if (type === "update" && updateItem) {
      const items = JSON.parse(updateItem);
      console.log("updateItem", items);
      Object.assign(this.formValue, { ...items });
    }
    if (type === "create") {
      this.debouncedGetPartner = debounce(this.$_getPartnerInfo, 500);
      this.$store.dispatch({
        type: "apply/getPartner"
      });
    }
  },
  computed: {
    info() {
      return this.$store.state.apply.info;
    },
    partnerName() {
      return this.$store.state.apply.partnerName;
    },
    score() {
      const { time, style } = this.formValue;
      const curUnit =
        style === -1 ? 0 : styleList.find(item => item.key === style).unit;
      const minutes = ((time - 0) / 60).toFixed(2) - 0;
      // console.log("minutes", minutes);
      // console.log("curUnit", curUnit);
      return (minutes * curUnit).toFixed(2);
    }
  },
  watch: {
    partnerName(n, o) {
      this.formValue.witnessName = n;
    },
    "formValue.time": {
      handler(n, o) {
        if (n - 0 > 120) {
          this.formValue.time = 120;
        }
      }
    },
    "formValue.witnessName": {
      handler(n, o) {
        if (n !== o) {
          this.debouncedGetPartner();
        }
      }
    },
    info: {
      handler(n, o) {
        const { name, relations, phone } = n;

        this.formValue.witnessRelation = relations;
        this.formValue.witnessPhone = phone;
      }
    }
  },
  methods: {
    $_handleSubmit() {
      if (this.$_verifyHandle()) {
        // console.log(this.formValue);
        const { item } = this.formValue;
        this.$store.dispatch({
          type: "apply/applyIn",
          payload: {
            ...this.formValue,
            item: item.join(","),
            score: this.score
          }
        });
      }
    },
    $_verifyHandle() {
      if (this.formValue.address === -1) {
        this.$toast("请选择地点!");
        return false;
      }
      if (this.formValue.item.length === 0) {
        this.$toast("请选择项目!");
        return false;
      }
      console.log("time", this.formValue.time - 0);
      if (
        this.formValue.time === "" ||
        this.formValue.time - 0 > 120 ||
        this.formValue.time - 0 < 30
      ) {
        this.$toast("请输入有效时长,范围30-120分钟!");
        return false;
      }
      if (this.formValue.style === -1) {
        this.$toast("请选择锻炼形式!");
        return false;
      }
      if (this.formValue.result === "") {
        this.$toast("请输入锻炼成果!");
        return false;
      }
      if (this.formValue.witnessName === "") {
        this.$toast("请输入参与伙伴姓名!");
        return false;
      }
      if (this.formValue.witnessRelation === "") {
        this.$toast("请输入参与伙伴关系!");
        return false;
      }
      if (this.formValue.witnessPhone === "") {
        this.$toast("请输入参与伙伴电话!");
        return false;
      } else {
        return true;
      }
    },
    $_timeInput(value) {
      console.log(value);
    },
    $_handleTip() {
      this.dialogShow = true;
    },
    $_getPartnerInfo() {
      this.$store.dispatch({
        type: "apply/queryPartner",
        payload: {
          name: this.formValue.witnessName
        }
      });
      console.log("#");
    }
  }
};
</script>
<style lang="scss" >
.dateBlock .van-radio__label {
  width: 90px;
}
.box-apply {
  padding: 10px;
  .btn-mg {
    width: 60%;
    margin: 20px auto;
  }
}
.van-checkbox,
.van-radio {
  display: inline-block;
}
.van-checkbox__icon,
.van-radio__icon {
  display: none;
}
.van-radio__label--disabled {
  color: #c8c9cc !important;
}
.van-checkbox__icon--checked + .van-checkbox__label,
.van-radio__icon--checked + .van-radio__label {
  background: #ffa847;
  color: #fff;
  border: 1px solid #ffa847;
}
.van-checkbox__label,
.van-radio__label {
  color: #1abc9c;
  margin-left: 0px;
  border: 1px solid;
  display: inline-block;
  padding: 2px;
  text-align: center;
  width: 65px;
  margin-right: 8px;
  margin: 5px;
  border-radius: 2px;
  font-size: 14px;
}
.c-i {
  color: rgb(153, 153, 153);
}
.unit {
  display: inline-block;
  margin-right: 10px;
}
.van-field {
  padding: 10px 0;
}
.van-field__control,
.van-field__control:disabled {
  color: #ffa847;
  font-size: 14px;
}
.van-cell__title {
  flex: 1;
}
.van-cell__value {
  flex: 4;
}
</style>
