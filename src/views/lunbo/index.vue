<template>
  <div class="app-container">
    <div class="filter-container">
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
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini">
            查看
          </el-button>
          <el-button  size="mini" type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getPicture } from '@/api/table'
import Pagination from '@/components/Pagination/index.vue' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      total: 0,
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
      },
    }
  },
  created() {
    this.getPicture()
  },
  methods: {
    handleCreate () {

    },
    getPicture() {
      this.listLoading = true
      // this.listQuery
      getPicture({
        type: 'BANNER'
      }).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
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