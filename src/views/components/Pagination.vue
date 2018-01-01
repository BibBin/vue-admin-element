<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="this.currentPage"
    :page-sizes="this.pageSizes"
    :page-size="this.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="this.total" class="right">
  </el-pagination>
</template>

<script>
  export default {
    props:['total','currentPage', 'pageSize', 'pageSizes'],
    data() {
      return {
      };
    },
    methods: {
      handleSizeChange(pageSize) {
        this.$emit('handleSizeChange', pageSize);
      },
      handleCurrentChange(currentPage) {
        this.$emit('handleCurrentChange', currentPage);
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .right {text-align: right; margin: 20px 0;}

</style>
