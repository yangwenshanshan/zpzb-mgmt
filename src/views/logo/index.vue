<template>
  <div class="app-container logo-main">
    <preview-upload-image @change="imageChange"></preview-upload-image>
    <div class="btn-list">
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
  import PreviewUploadImage from '@/components/PreviewUploadImage.vue';
  export default {
    components: {
      PreviewUploadImage
    },
    data() {
      return {
        imageUrl: ''
      };
    },
    methods: {
      imageChange (res) {
        console.log(res)
      },
    }
  }
</script>

<style lang="scss">
  .logo-main{
    .btn-list{
      width: 300px;
    }
  }
</style>