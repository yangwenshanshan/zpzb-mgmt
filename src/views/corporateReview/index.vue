<template>
  <div class="app-container">
    <el-input class="container-textarea" type="textarea" placeholder="请输入企业综述"></el-input>
    <div class="btn-list">
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.container-textarea{
  height: 200px;
  width: 600px;
  textarea{
    height: 100%;
  }
}
</style>