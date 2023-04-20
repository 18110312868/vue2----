<template>
  <div class="manage">
    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <!-- 新增用户 -->
      <el-form
        :inline="true"
        :rules="rules"
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.birth"
            value-format="yyyy-MM-DD"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <!-- 新增区域 -->
      <el-button type="primary" @click="handleAdd">
        + 新增
      </el-button>
      <!-- 搜索区域 -->
      <el-form :model="userform" :inline="true">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userform.name"></el-input>
        </el-form-item>
        <el-button type="primary" @click="onsubmit">
          查询
        </el-button>
      </el-form>
    </div>
    <div class="common-table">
      <el-table :data="tableData" style="width: 100%" height="90%" stripe>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex == 0 ? "女" : "男" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column prop="addr" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { getUser, addUser, editUser, delUser } from "../api";
export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      form: {
        name: " ",
        age: " ",
        sex: " ",
        birth: "",
        addr: " ",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData: [],
      type: 0,
      total: 0,
      pageDate: {
        page: 1,
        limit: 10,
      },
      userform:{
        name:''
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((value) => {
        // console.log(value);
        if (value) {
          if (this.type === 0) {
            addUser(this.form).then(() => {
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              this.getList();
            });
          }
          console.log(this.form, "form");
          // 提交后清空表单
          this.$refs.form.resetFields();
          // 关闭弹窗
          this.dialogVisible = false;
        }
      });
    },
    // 重置内容
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    cancel() {
      this.handleClose();
    },
    // 编辑内容
    handleEdit(row) {
      this.type = 1;
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
    },
    // 删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleAdd() {
      this.type = 0;
      this.dialogVisible = true;
    },
    getList() {
      getUser({ params: {...this.userform,...this.pageDate}}).then(({ data }) => {
        console.log(data);
        this.tableData = data.list;
        this.total = data.count || 0;
      });
    },
    // getList() {
    //         // 获取的列表的数据
    //         getUser({params: {...this.userForm, ...this.pageData}}).then(({ data }) => {
    //             console.log(data)
    //             this.tableData = data.list

    //             this.total = data.count || 0
    //         })
    //     },
    handleCurrentChange(val) {
      this.pageDate.page = val;
      this.getList();
    },
    onsubmit(){ 
      this.getList()
    }
  },
  mounted() {
    this.getList();
  },
};
</script>
  
<style lang="less" scoped>
.manage {
  .manage-header{ 
    display: flex;
    align-items:baseline;
    justify-content: space-between;
  }
  height: 90%;
  .common-table {
    position: relative;
    height: calc(100% - 62px);
    .page {
      position: absolute;
      right: 20px;
      bottom: 0px;
    }
  }
}
</style>