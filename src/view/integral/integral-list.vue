<template>
  <div class="container">
    <div class="header">
      <div class="title">积分列表</div>
      <!-- 分组选择下拉框 -->
      <el-input
        size="medium"
        style="width:240px;"
        v-model="userName"
        placeholder="请输入用户名"
        @change="handleChange"
        clearable
      ></el-input>
    </div>
    <!-- 表格 -->
    <lin-table
      :tableColumn="tableColumn"
      :tableData="tableData"
      :operate="operate"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
      v-loading="loading"
    ></lin-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :background="true"
        :page-size="pageCount"
        :current-page="currentPage"
        v-if="refreshPagination"
        layout="prev, pager, next, jumper"
        :total="total_nums"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Integral from '@/model/integral'
import LinTable from '@/component/base/table/lin-table'

export default {
  components: { LinTable },
  data() {
    return {
      id: 0, // 用户id
      refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
      editIndex: null, // 编辑的行
      total_nums: 0, // 分组内的用户总数
      currentPage: 1, // 默认获取第一页的数据
      pageCount: 10, // 每页10条数据
      tableData: [], // 表格数据
      tableColumn: [], // 表头数据
      operate: [], // 表格按键操作区
      userName: '',
      activeTab: '修改信息',
      form: {
        // 表单信息
        username: '',
        password: '',
        confirm_password: '',
        email: '',
        group_ids: [],
      },
      loading: false,
    }
  },
  methods: {
    // 根据分组 刷新/获取分组内的用户
    async getIntegralList() {
      let res
      const currentPage = this.currentPage - 1
      try {
        this.loading = true
        res = await Integral.getIntegral({ userName: this.userName, pageNo: currentPage, pageSize: this.pageCount }) // eslint-disable-line
        console.log(res)
        this.loading = false
        this.tableData = res.items
        this.total_nums = res.total
      } catch (e) {
        this.loading = false
        console.log(e)
      }
    },

    // 获取所拥有的权限并渲染  由子组件提供
    async handleDetail(val) {
      this.$router.push(`/integral/detail?userId=${val.userid}`)
    },
    // 用户名搜索
    async handleChange() {
      this.currentPage = 1
      this.loading = true
      await this.getIntegralList()
      this.loading = false
    },
    // 切换table页
    async handleCurrentChange(val) {
      this.currentPage = val
      this.loading = true
      await this.getIntegralList('changePage')
      this.loading = false
    },
    handleDelete() {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        try {
          // this.loading = true
          // res = await Admin.deleteOneUser(val.row.id)
          // this.loading = false
          // if (res.code < window.MAX_SUCCESS_CODE) {
          //   if (this.total_nums % this.pageCount === 1 && this.currentPage !== 1) {
          //     // 判断删除的是不是每一页的最后一条数据
          //     this.currentPage--
          //   }
          //   await this.getAdminUsers()
          //   this.$message({
          //     type: 'success',
          //     message: `${res.message}`,
          //   })
          // }
        } catch (e) {
          this.loading = false
        }
      })
    },
    handleEdit() {},
    // 双击 table ro
    rowClick() {
      // this.handleEdit(row)
    },
  },
  async created() {
    await this.getIntegralList()
    this.tableColumn = [
      { prop: 'username', label: '名称' },
      { prop: 'available', label: '可用积分' },
      { prop: 'total', label: '总积分' },
    ] // 设置表头信息
    this.operate = [
      { name: '详情', func: 'handleDetail', type: 'primary' },
      { name: '积分处理', func: 'handleEdit', type: 'primary' },
    ]
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}

.info {
  margin-left: -55px;
  margin-bottom: -30px;
}

.password {
  margin-top: 20px;
  margin-left: -55px;
  margin-bottom: -20px;
}
</style>
