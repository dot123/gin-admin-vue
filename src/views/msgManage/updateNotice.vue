<template>
  <div>
    <div>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        size="mini"
        @click="handleCreate"
      >新建</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      style="width: 100%"
    >
      <el-table-column label="id" prop="id" sortable align="center" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="创建日期"
        sortable
        align="center"
        width="180px"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" align="center" width="180px">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" width="180px">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作者" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.operator }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公告标题" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公告内容" width="500px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="80px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="temp.startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            size="mini"
            style="width: 200px"
            clearable
          />
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="temp.endTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            size="mini"
            style="width: 200px"
            clearable
          />
        </el-form-item>
        <el-form-item label="公告标题" prop="title">
          <el-input
            v-model="temp.title"
            type="textarea"
            placeholder="请输入内容"
            :rows="1"
          />
        </el-form-item>
        <el-form-item label="最新公告" prop="content">
          <el-input
            v-model="temp.content"
            type="textarea"
            placeholder="请输入内容"
            :rows="10"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatYMDHMS } from '@/utils/index.js'
import { getNotices, createNotice, updateNotice, deleteNotice } from '@/api/msg'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'ComplexTable',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑公告',
        create: '新建公告'
      },
      rules: {
        startTime: [{ required: true, message: '选择开始日期时间', trigger: 'blur' }],
        endTime: [{ required: true, message: '选择结束日期时间', trigger: 'blur' }],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      temp: {
        id: 0,
        startTime: undefined,
        endTime: undefined,
        title: undefined,
        content: undefined,
        operator: undefined,
        createdAt: ''
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  created() {
  },
  methods: {
    handleEdit(index, row) {
      this.temp.id = row.id
      this.temp.startTime = row.startTime
      this.temp.endTime = row.endTime
      this.temp.title = row.title
      this.temp.content = row.content
      this.temp.operator = row.operator
      this.temp.createdAt = row.createdAt

      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(index, row) {
      deleteNotice(row.id).then((response) => {
        this.fetchData()
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: '删除公告成功!',
          type: 'success',
          duration: 2000
        })
      })
    },
    fetchData() {
      this.listLoading = true
      getNotices(this.listQuery).then((response) => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetTemp() {
      const endDate = new Date()
      endDate.setDate(endDate.getDate() + 2)
      this.temp = {
        id: 0,
        startTime: formatYMDHMS(new Date()),
        endTime: formatYMDHMS(endDate),
        content: undefined,
        operator: this.$store.getters.name
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    filterTag(value, row) {
      return row.state === value
    },
    filterType(value, row) {
      return row.user_type === value
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createNotice(this.temp).then(() => {
            this.fetchData()
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '新建公告成功!',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateNotice(this.temp).then(() => {
            this.fetchData()
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '更新公告成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>
