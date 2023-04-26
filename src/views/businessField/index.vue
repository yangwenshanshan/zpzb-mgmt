<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">新增</el-button>
    </div>
    <el-table :key="tableKey" v-loading="listLoading" :data="list" border highlight-current-row style="width: 100%;">
      <el-table-column align="center" label="ID" prop="id"></el-table-column>
      <el-table-column align="center" label="标题" prop="title"></el-table-column>
      <el-table-column align="center" label="创建时间" prop="createTime"></el-table-column>
      <el-table-column align="center" label="更新时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="goAdd(row)">查看</el-button>
          <el-button type="danger" size="mini" @click="delRow(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" @pagination="getArticle" />
  </div>
</template>

<script>
import { getArticle, delArticle } from '@/api'
import Pagination from '@/components/Pagination/index.vue' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      total: 0,
      list: [],
      listLoading: true,
      listQuery: {
        current: 1,
        // size: 20,
      },
    }
  },
  created() {
    this.getArticle()
  },
  methods: {
    delRow (row) {
      this.$confirm('是否确认删除', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        delArticle({
          id: row.id
        }).then(res => {
          this.listLoading = false
          if (res.code === 'SUCCESS') {
            this.$message.success('删除成功')
            this.getArticle()
          }
        }).catch(() => {
          this.listLoading = false
        })
      })
    },
    goAdd (row) {
      this.$router.push({
        path: '/businessField/add',
        query: {
          id: row.id
        }
      })
    },
    handleCreate () {
      this.$router.push({
        path: '/businessField/add'
      })
    },
    getArticle() {
      this.listLoading = true
      getArticle({
        ...this.listQuery,
        type: 'BUSINESS_AREA'
      }).then(response => {
        if (response.code === 'SUCCESS') {
          this.list = response.data.content
          this.total = response.data.total
          this.listLoading = false
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
</style>