<template>
  <el-upload
    class="avatar-uploader"
    :action="api + '/picture/upload'"
    accept="image/*"
    :headers="headers"
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :on-success="handleAvatarSuccess">
    <img v-if="imageUrl || url" :src="imageUrl ? imageUrl : url ? url : ''" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
  import { getToken } from '@/utils/auth'
  export default {
    props: ['url'],
    data() {
      return {
        api: '',
        imageUrl: '',
        headers: {
          'Authorization': 'Bearer ' + getToken()
        },
      };
    },
    created () {
      this.api = process.env.VUE_APP_BASE_API
    },
    methods: {
      beforeAvatarUpload (file) {
        this.$emit('change', file)
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$emit('success', res)
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>