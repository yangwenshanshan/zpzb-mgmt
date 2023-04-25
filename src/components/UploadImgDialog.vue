<template>
  <el-dialog class="cancel-order-dialog" title="取消订单" :visible.sync="show" width="500px">
    <div v-loading="loading">
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="show = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { cancelOrder } from "@/api/ybOrderMgmt";

export default {
  name: 'cancelOrderDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
      searchData: {
        remark: ''
      },
      show: false,
      rules: {
        remark: [
          { required: true, message: '请输入取消原因', trigger: 'blur' },
        ]
      }
    };
  },
  watch: {
    'visible': function (newValue) {
      this.show = newValue
      this.$nextTick(() => {
        if (newValue) {
          this.resetForm()
        }
      })
    },
    'show': function (newValue) {
      this.$emit('update:visible', newValue)
    }
  },
  methods: {
    submit () {
      if (this.loading) return false
      if (!this.searchData.remark) {
        this.$message({
          type: 'info',
          message: '请输入取消原因'
        });
        return false
      }
      this.loading = true
      // 要测试接口
      cancelOrder({
        ...this.params,
        ...this.searchData
      }).then(res => {
        this.loading = false
        if (res.result === 1) {
          this.$message.success('取消订单成功')
          this.show = false
          this.$emit('submit')
        }
      }).catch(() => {
        this.loading = false
      })
    },
    resetForm() {
      this.$refs.continueForm && this.$refs.continueForm.resetFields();
    }
  }
}
</script>

<style lang="scss">
.cancel-order-dialog{
  .el-dialog__footer{
    text-align: center;
  }
  .el-form{
    .el-form-item{
      margin-bottom: 16px;
      .el-input__inner{
        width: 300px;
        height: 34px;
      }
    }
  }
}
</style>