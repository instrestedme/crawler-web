<template>
  <div class="home">
    <p class="title">企鹅辅导课程</p>
    <el-tabs @tab-click="handleClick">
      <el-tab-pane v-for="idx in tabData" :key="idx" :label="idx+''"></el-tab-pane>
    </el-tabs>
    <el-table
            :data="tableData"
            style="width: 100%">
      <el-table-column
              prop="title"
              label="标题"
              width="380">
      </el-table-column>
      <el-table-column
              prop="teacher"
              label="老师"
              width="200">
      </el-table-column>
      <el-table-column
              prop="pre_price"
              label="原价">
      </el-table-column>
      <el-table-column
              prop="af_price"
              label="现价">
      </el-table-column>
      <el-table-column
              prop="category"
              label="分类">
        <template slot-scope="scope">
          <span>{{scope.row.category===1?'专题课':scope.row.category===2?'系统课':'未知'}}</span>
        </template>
      </el-table-column>
      <el-table-column
              prop="grade"
              label="年级">
      </el-table-column>
      <el-table-column
              prop="subject"
              label="科目">
      </el-table-column>
    </el-table>
    <el-pagination
            @current-change="handlePageChange"
            layout="prev, pager, next"
            :total="total">
    </el-pagination>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data(){
    return {
      tableData: [], // 表格数据
      tabData:[],// tab栏
      activeTab:0,//科目
      page:1,
      size:8,
      total:1,
    }
  },
  methods:{
    /**
     * @method 页码改变
     * */
    handlePageChange(e){
      let that=this
      console.log(e)
      that.page=e
      that.getCourse()
    },
    /**
     * @method 点击tab事件
     * */
    handleClick(e){
      let that=this
      that.activeTab=Number(e.label)
      that.getCourse()
    },
    /**
     * @method 获取课程
     * */
    getCourse(){
      let that=this
      that.$getData({
        url:"/course-list",
        params:{
          page:that.page,
          size:that.size,
          subject: that.activeTab?that.activeTab:undefined,
        }
      }).then(res=>{
        if (res.data.code===0){
          let realData=res.data.data
          that.page=realData.page
          that.tableData=realData.data
          that.total=realData.total
        }else {
          that.$message.error('获取课程失败!')
        }
      })
    },
    /**
     * @method 获取tab栏
     * */
    getSubjects(){
      let that=this
      that.$getData({
        url:"/subjects-list"
      }).then(res=>{
        console.log("打印科目返回")
        console.log(res)
        if (res.data.code===0){
          that.tabData=res.data.data
        }else {
          that.$message.error('获取科目失败!')
        }
      })
    },
  },
  created() {
    let that=this
    that.getCourse()
    that.getSubjects()
  }
}
</script>

<style lang="stylus">
  .home{
    .title{
      text-align center
      font-size 2rem
    }
  }
</style>
