<template>
  <div class="app-container" v-loading="loading">
    <el-form ref="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item label="链接">
        <el-input v-model="params.link"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ id ? '立即修改' : '立即创建' }}</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postPartnerlink, getPartnerlinkDetail, putPartnerlink } from '@/api'
export default {
  data () {
    return {
      loading: false,
      params: {
        name: '',
        link: '',
      },
      id: 0,
    }
  },
  created () {
    this.id = this.$route.query.id
    if (this.id) {
      getPartnerlinkDetail({
        id: this.id
      }).then(res => {
        if (res.code === 'SUCCESS') {
          this.params = res.data
        }
      })
    }
  },
  methods: {
    onSubmit () {
      if (!this.params.name) {
        return false
      }
      if (!this.params.link) {
        return false
      }
      if (this.id) {
        this.loading = true
        putPartnerlink({
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
        postPartnerlink(this.params).then(res => {
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