<script setup>

</script>

<template>
  <div class="header">
    <div class="left">
      <img src="@/assets/头像.jpg" alt="头像">
    </div>
    <div class="middle"></div>
    <div class="right"></div>
  </div>
</template>

<style scoped lang="less">
.header {
  // background-color: #fff;
  width: 100%;
  height: 3rem;
  border-bottom: 1px solid #666;
  display: flex;
  .left {
    background-color: yellow;
    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
    }
  }
  .middle {
    background-color: skyblue;
  }
  .right {
    background-color: pink;
  }
}
</style>
