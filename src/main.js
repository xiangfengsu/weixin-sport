import Vue from "vue";
import router, { store } from "@/core/common/router";
import "@/core/style/base.scss";
import {
  Icon,
  Button,
  Field,
  Cell,
  CellGroup,
  Row,
  Col,
  Popup,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
  Picker,
  DatetimePicker,
  Toast,
  Dialog,

} from "vant";
import App from "./App.vue";

Vue.use(Button)
  .use(Icon)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(Row)
  .use(Col)
  .use(Popup)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Radio)
  .use(RadioGroup)
  .use(Picker)
  .use(DatetimePicker)
  .use(Toast)
  .use(Dialog)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
