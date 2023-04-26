<template>
  <div class="app-container" v-loading="loading">
    <el-form ref="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="params.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="params.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ id ? '立即修改' : '立即创建' }}</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postArticle, getArticleDetail, putArticle } from '@/api'
export default {
  data () {
    return {
      loading: false,
      params: {
        title: '',
        author: 'admin',
        content: '',
        type: 'BUSINESS_AREA'
      },
      id: 0,
    }
  },
  created () {
    this.id = this.$route.query.id
    if (this.id) {
      getArticleDetail({
        id: this.id
      }).then(res => {
        if (res.code === 'SUCCESS') {
          this.params = {
            title: res.data.title,
            author: 'admin',
            content: res.data.content,
            type: 'BUSINESS_AREA'
          }
        }
      })
    }
  },
  methods: {
    onSubmit () {
      if (!this.params.content) {
        return false
      }
      if (this.id) {
        this.loading = true
        putArticle({
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
        postArticle(this.params).then(res => {
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