<template>
  <div >
    <el-tag
    v-for="item,index in tags"
    :key="item.name"
    :closable = "item.name !== 'home'"
    @click="changeMenu(item)"
    @close="closeTag(item,index)"
    size="small"
    >
    {{ item.label }}
  </el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
   name:'CommonTag',
   data() {
    return {
        
    }
   },
   computed:{
     ...mapState({ 
        tags: state=>state.tab.tabsList
     })
   },
   methods: {
    changeMenu(item){
     this.$router.push(item.path)
    },
    ...mapMutations(['delTag']),
    // 点击删除tag功能
    closeTag(item,index){ 
        const length = this.tags.length
        this.delTag(item)
        // if(item.name !=this.$router.name ){ 
        //   return 
        // }
        if(index+1 == length){ 
          this.$router.push({ 
            name:this.tags[index-1].name
          })
        }else{ 
          this.$router.push({ 
            name:this.tags[index].name
          })
        }
    }
   },
}
</script>

<style lang="less" scoped>
 .el-tag{ 
   margin:8px;
   cursor: pointer;
 }
</style>