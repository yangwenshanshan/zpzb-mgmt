<template>
  <div class="app-container" v-loading="loading">
    <el-form ref="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="detail.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
          <Tinymce ref="editor" v-model="detail.content" :height="400" />
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
import Tinymce from '@/components/Tinymce'
export default {
  components: {
    Tinymce
  },
  data () {
    return {
      loading: false,
      detail: {
        title: '',
        content: '',
        author: 'admin',
        type: 'NEWS_COMPANY'
      },
      file: null,
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
          this.detail = res.data
        }
      })
    }
  },
  methods: {
    onSubmit () {
      if (!this.detail.title) {
        return false
      }
      if (!this.detail.content) {
        return false
      }
      if (this.id) {
        this.loading = true
        putArticle({
          id: this.id,
          ...this.detail
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
        postArticle(this.detail).then(res => {
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