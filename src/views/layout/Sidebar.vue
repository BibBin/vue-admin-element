<template>
    <el-menu mode="vertical" background-color="#324157"  text-color="#fff" active-text-color="#3a8ee6" unique-opened :default-active="$route.path" :collapse="isCollapse">
      <div :style="style">LOGO</div>
      <sidebar-item :routes='getRoutes'></sidebar-item>
    </el-menu>
</template>
<script>
import { mapGetters } from 'vuex'
import routes from '@/router/routes'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      this.style =  this.sidebar.opened?this.styleOne:this.styleTwo
      return !this.sidebar.opened;
    }
  },
  data() {
      return {
        getRoutes:routes,
        style:'',
        styleOne:{
          'text-align':'center',
          'font-size':'30px',
          'padding-top':'10px',
          color:'#fff'
        },
        styleTwo:{
          'text-align':'center',
          'font-size':'10px',
          'padding-top':'10px',
          color:'#fff'
        }
      }
  },
  methods: {
  },
  mounted() {

  }
}
</script>
