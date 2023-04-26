<template>
  <div class="app-container" v-loading="loading">
    <el-form ref="form" label-width="80px">
      <el-form-item label="图片">
        <preview-upload-image :url="params.url" @change="imageChange" @success="imageSuccess"></preview-upload-image>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-input v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ id ? '立即修改' : '立即创建' }}</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postPicture, getPictureDetail, putPicture } from '@/api'
export default {
  data () {
    return {
      loading: false,
      params: {
        name: '',
        url: '',
        type: 'BANNER'
      },
      file: null,
      id: 0,
    }
  },
  created () {
    this.id = this.$route.query.id
    if (this.id) {
      getPictureDetail({
        id: this.id
      }).then(res => {
        if (res.code === 'SUCCESS') {
          this.params = {
            name: res.data.name,
            url: res.data.url,
            type: 'BANNER'
          }
        }
      })
    }
  },
  methods: {
    imageChange (file) {
      if (!this.params.name) {
        this.$set(this.params, 'name', file.name)
      }
    },
    imageSuccess (data) {
      this.params.url = data.data
    },
    onSubmit () {
      if (!this.params.url) {
        return false
      }
      if (this.id) {
        this.loading = true
        putPicture({
          id: this.id,
          ...this.params
        }).then(res => {
          this.loading = false
          if (res.code === 'SUCCESS') {
            this.$message.success('修改成功')
            this.$router.go(-1)
          }
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.loading = true
        postPicture(this.params).then(res => {
          this.loading = false
          if (res.code === 'SUCCESS') {
            this.$message.success('创建成功')
            this.$router.go(-1)
          }
        }).catch(() => {
          this.loading = false
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>