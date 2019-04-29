<template>
  <div class="honorquery">
    <div class="title">
      {{title}}(月)
    </div>
    <div>
      <div class="queryPanel">
        <van-cell-group :border="false">
          <van-cell is-link
                    @click="showPicker('Schools')"
                    arrow-direction="down">
            <template slot="title">

              <span class="picker">{{schoolText === ''?'请选择学校':schoolText}}</span>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div class="queryPanel">
        <van-cell-group :border="false">
          <van-cell is-link
                    @click="showPicker('Grades')"
                    arrow-direction="down">
            <template slot="title">

              <span class="picker">{{gradeText === '' ? '请选择年级':gradeText}}</span>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div class="queryPanel">
        <van-cell-group :border="false">
          <van-cell is-link
                    @click="showPicker('Classes')"
                    arrow-direction="down">
            <template slot="title">

              <span class="picker">{{classText === '' ? '请选择班级' : classText}}</span>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
    <div class="btn-handle">
      <van-button type="primary"
                  round
                  size="large"
                  @click="$_queryHandle">查询</van-button>

    </div>
    <van-popup v-model="showSchools"
               position="bottom">
      <van-picker :columns="schoolsList"
                  :loading="false"
                  show-toolbar
                  value-key="name"
                  :default-index="0"
                  @cancel="showSchools=false"
                  @confirm="onConfirmHandle" />
    </van-popup>

    <van-popup v-model="showGrades"
               position="bottom">
      <van-picker :columns="gradesList"
                  :loading="false"
                  show-toolbar
                  value-key="name"
                  :default-index="0"
                  @cancel="showGrades=false"
                  @confirm="onConfirmHandle" />
    </van-popup>

    <van-popup v-model="showClasses"
               position="bottom">
      <van-picker :columns="classesList"
                  :loading="false"
                  show-toolbar
                  value-key="name"
                  :default-index="0"
                  @cancel="showClasses=false"
                  @confirm="onConfirmHandle" />
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "honor-query",
  data() {
    return {
      title: "",
      showSchools: false,
      showGrades: false,
      showClasses: false,
      schoolText: "",
      gradeText: "",
      classText: "",
      schoolID: -1,
      gradeID: -1,
      classID: -1,
      type: ""
    };
  },
  created() {
    const { title } = this.$route.query;
    this.title = title;
    this.$store.dispatch({
      type: "honorquery/getSchoolsList"
    });
  },
  computed: {
    ...mapState("honorquery", [
      "schoolsList",
      "gradesList",
      "classesList",
      "sLoading",
      "gLoading",
      "cLoading"
    ])
  },
  methods: {
    showPicker(type) {
      this.type = type;
      this[`show${type}`] = true;
    },
    onConfirmHandle(value) {
      console.log(value);
      const { ID, name } = value;
      const { type } = this;

      if (type === "Schools") {
        this.schoolText = name;
        this.schoolID = ID;
        this.gradeText = "";
        this.classText = "";
        this.gradeID = -1;
        this.classID = -1;
        this.$store.dispatch({
          type: "honorquery/getGradesList",
          payload: {
            schoolID: ID
          }
        });
      } else if (type === "Grades") {
        this.gradeText = name;
        this.gradeID = ID;
        this.classText = "";
        this.classID = -1;
        this.$store.dispatch({
          type: "honorquery/getClassesList",
          payload: {
            schoolID: this.schoolID,
            gradeID: ID
          }
        });
      } else {
        this.classText = name;
        this.classID = ID;
      }
      this[`show${type}`] = false;
    },
    $_queryHandle() {
      const { title, type } = this.$route.query;
      this.$router.push({
        name: "honorresult",
        query: {
          title,
          type,
          formValue: {
            schoolID: this.schoolID,
            gradeID: this.gradeID,
            classID: this.classID
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" >
.honorquery {
  padding: 10px;
  font-size: 14px;
  .title {
    color: #1abc9c;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin: 12px 0;
  }
  .queryPanel {
    padding: 1px 1px;
    background-color: #1abc9c;
    margin-bottom: 12px;
    span {
      display: inline-block;
    }
  }
  .btn-handle {
    width: 60%;
    margin: 24px auto;
  }
}
</style>
