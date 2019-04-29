<template>
  <div id="box">

    <div class="headerBox">
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="footerBox">

    </div>
  </div>
</template>
<script>


export default {
  name: 'basic-layout',

};
</script>
<style lang="scss">
#box {

}
</style>
