<template>
  <div class="container">
    <div class="title">
      <span>修改频道</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>
    <el-divider></el-divider>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" v-loading="loading" @submit.native.prevent>
            <el-form-item label="频道名" prop="title">
              <el-input size="medium" v-model="form.title" placeholder="请填写频道名"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="summary">
              <el-input size="medium" type="textarea" :rows="4" placeholder="请输入简介" v-model="form.summary">
              </el-input>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('form')">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import channel from '@/model/channel'

export default {
  props: {
    editChannelID: {
      type: Number,
    },
  },
  data() {
    return {
      loading: false,
      form: {
        title: '',
        summary: '',
      },
    }
  },
  async mounted() {
    this.loading = true
    this.form = await channel.getChannel(this.editChannelID)
    this.loading = false
  },
  methods: {
    async submitForm() {
      const res = await channel.editChannel(this.editChannelID, this.form)
      if (res.code < window.MAX_SUCCESS_CODE) {
        this.$message.success(`${res.message}`)
        this.$emit('editClose')
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    back() {
      this.$emit('editClose')
    },
  },
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0;
}

.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;

    .back {
      float: right;
      margin-right: 40px;
      cursor: pointer;
    }
  }

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
}
</style>
