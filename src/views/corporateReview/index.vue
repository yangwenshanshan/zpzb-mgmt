<template>
  <div class="app-container" v-loading="loading">
    <el-input class="container-textarea" v-model="detail.content" type="textarea" placeholder="请输入企业综述"></el-input>
    <div class="btn-list">
      <el-button type="primary" @click="submit">保存</el-button>
    </div>
  </div>
</template>

<script>
import { getArticle, putArticle, postArticle } from '@/api'
export default {
  data () {
    return {
      id: 0,
      loading: false,
      detail: {
        title: '标题',
        author: 'admin',
        content: '',
        type: 'SUMMARY'
      }
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    submit () {
      if (!this.detail.content) {
        return false
      }
      let method = null
      if (this.id) {
        method = putArticle
      } else {
        method = postArticle
      }
      this.loading = true
      method(this.detail).then(res => {
        this.loading = false
        if (res.code === 'SUCCESS') {
          this.$message.success('保存成功')
        }
      }).catch(() => {
        this.loading = false
      })
    },
    getArticle () {
      this.loading = true
      getArticle({
        type: 'SUMMARY',
      }).then(res => {
        this.loading = false
        if (res.code === 'SUCCESS') {
          if (res.data && res.data.content && res.data.content.length) {
            this.id = res.data.content[0].id
            this.detail = res.data.content[0]
          }
        }
      }).catch(() => {
        this.loading = false
      })
    }
  }
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