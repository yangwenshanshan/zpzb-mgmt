<template>
  <div class="app-container">
    <div class="filter-container" v-if="canAdd">
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">新增</el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column align="center" label="ID" prop="id"></el-table-column>
      <el-table-column align="center" label="图片">
        <template slot-scope="scope">
          <el-image class="lubbo-img" :src="scope.row.url" :preview-src-list="[scope.row.url]"></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称" prop="name"></el-table-column>
      <el-table-column align="center" label="创建时间" prop="createTime"></el-table-column>
      <el-table-column align="center" label="更新时间" prop="updateTime"></el-table-column>
      <el-table-column label="Actions" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button  size="mini" type="primary" @click="goAdd(row)">
            编辑
          </el-button>
          <el-button type="danger" size="mini" @click="delRow(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPicture, delPicture } from '@/api'

export default {
  name: 'ComplexTable',
  data() {
    return {
      canAdd: false,
      tableKey: 0,
      list: [],
      listLoading: true,
    }
  },
  created() {
    this.getPicture()
  },
  methods: {
    delRow (row) {
      this.$confirm('是否确认删除', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        delPicture({
          id: row.id
        }).then(res => {
          this.listLoading = false
          if (res.code === 'SUCCESS') {
            this.$message.success('删除成功')
            this.getPicture()
          }
        }).catch(() => {
          this.listLoading = false
        })
      })
    },
    goAdd (row) {
      this.$router.push({
        path: '/dashboard/add',
        query: {
          id: row.id
        }
      })
    },
    handleCreate () {
      this.$router.push({
        path: '/dashboard/add'
      })
    },
    getPicture() {
      this.listLoading = true
      getPicture({
        type: 'BANNER'
      }).then(response => {
        this.listLoading = false
        this.list = response.data
        if (this.list.length < 3) {
          this.canAdd = true
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.filter-container{
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}
.lubbo-img{
  width: 60px;
  height: 60px;
  object-fit: contain;
  cursor: pointer;
}
</style>