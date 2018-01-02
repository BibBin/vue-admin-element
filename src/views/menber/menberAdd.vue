<template>
<el-form ref="form" :model="form" label-width="80px" style="max-width: 500px;margin-top:20px;">
  <el-form-item label="会员名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="所属大区">
    <el-select v-model="form.region" placeholder="请选择所属大区">
      <el-option label="华南大区" value="shanghai"></el-option>
      <el-option label="苏南大区" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="会员等级">
    <el-select v-model="form.region" placeholder="请选择">
      <el-option label="白银" value="shanghai"></el-option>
      <el-option label="黄金" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="会员标签">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="吃货" name="type"></el-checkbox>
      <el-checkbox label="喜辣" name="type"></el-checkbox>
      <el-checkbox label="重口味" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="性别">
    <el-radio-group v-model="form.resource">
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="会员描述">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
