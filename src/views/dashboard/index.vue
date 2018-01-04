<template>
  <div>
    <el-row :gutter="20" justify="center" align="middle" class="index-topTip">
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <el-card class="box-card">
          <span class="icon-item"><i class="el-icon-date"></i></span>
          <span>
            <span>活跃会员数</span>
            <i-count-up
              :start="0"
              :end="32123435"
              :decimals="0"
              :duration="2.5"
              :options="options"
            ></i-count-up>
          </span>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <el-card class="box-card">
          <span class="icon-item"><i class="el-icon-star-on"></i></span>
          <span>
            <span>昨日营销额</span>
            <i-count-up
              :start="0"
              :end="120500"
              :decimals="0"
              :duration="2.5"
              :options="options"
            ></i-count-up>
          </span>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <el-card class="box-card">
          <span class="icon-item"><i class="el-icon-view"></i></span>
          <span>
            <span>访问人数</span>
             <i-count-up
               :start="0"
               :end="170500"
               :decimals="0"
               :duration="2.5"
               :options="options"
             ></i-count-up>
          </span>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <el-card class="box-card">
          <span class="icon-item"><i class="el-icon-goods"></i></span>
          <span>
            <span>昨日营销额</span>
            <i-count-up
              :start="0"
              :end="20500"
              :decimals="0"
              :duration="2.5"
              :options="options"
            ></i-count-up>
          </span>
        </el-card>
      </el-col>
    </el-row>
    <div class="content-duty">
      <div class="title">当月指标进度</div>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="duty-item-title">下单量</div>
          <el-progress :text-inside="true" :stroke-width="15" :percentage="50"></el-progress>
          <div class="duty-item-title">销售额</div>
          <el-progress :text-inside="true" :stroke-width="15" :percentage="70"></el-progress>
          <div class="duty-item-title">促销活动</div>
          <el-progress :text-inside="true" :stroke-width="15" :percentage="100" status="success"></el-progress>
          <div class="duty-item-title">积分消费总量</div>
          <el-progress :text-inside="true" :stroke-width="15" :percentage="50" status="exception"></el-progress>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="duty-item-title">下单量</div>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="50"></el-progress>
          <div class="duty-item-title">销售额</div>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
          <div class="duty-item-title">促销活动</div>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
          <div class="duty-item-title">积分消费总量</div>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
        </el-col>
      </el-row>
    </div>
    <div class="content-duty">
      <div class="title">季度指标进度</div>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" class="circle-duty-iv">
          <el-progress :width="200" type="circle" :stroke-width="12" :percentage="30"></el-progress>
          <div class="season-item-title">下单量</div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" class="circle-duty-iv">
          <el-progress :width="200" type="circle" :stroke-width="12" :percentage="25"></el-progress>
          <div class="season-item-title">销售额</div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" class="circle-duty-iv">
          <el-progress :width="200" type="circle" :stroke-width="12" :percentage="100" status="success"></el-progress>
          <div class="season-item-title">活动宣传</div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" class="circle-duty-iv">
          <el-progress :width="200" type="circle" :stroke-width="12" :percentage="50" status="exception"></el-progress>
          <div class="season-item-title">上新菜式</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import ICountUp from 'vue-countup-v2';
  export default {
    name: 'indexView',
    components: {
      ICountUp
    },
    computed: {

    },
    data() {
      return {
        options: {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
        }
      }
    },
    methods: {

    },
    mounted() {

    },
    created() {

    }
  }
</script>
<style rel="stylesheet/scss" scoped lang="scss">
  .index-topTip{
    .box-card{
      margin-top:15px;
      .icon-item{
        font-size: 20px;
        color:#fff;
        padding:5px 6px;
        background: rgb(50, 65, 87);
        border-radius:3px;
      }
    }
  }
  .content-duty{
    margin-top:30px;
    border-top:1px solid #337ab7;
    .title{padding:10px 0;}
    .duty-item-title{
      font-size: 14px;
      color: #99a9bf;
      margin-top:15px;
    }
    .circle-duty-iv{text-align:center;}
    .season-item-title{
      font-size: 14px;
      color: #99a9bf;
      margin:15px auto;
    }
  }
</style>
