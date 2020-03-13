<template>
  <div class="home">
    <p class="title">企鹅辅导课程</p>
    <div style="display: flex;align-items: center;">
      <span>年级：</span>
      <el-select v-model="activeGrade" placeholder="请选择" size="mini"  @change="handleGradeChange">
        <el-option :value="0" label="全部"></el-option>
        <el-option
                v-for="item in gradeData"
                :key="item"
                :label="item"
                :value="item">
        </el-option>
      </el-select>
    </div>
    <el-tabs @tab-click="handleClick">
      <el-tab-pane label="全部"></el-tab-pane>
      <el-tab-pane v-for="idx in tabData" :key="idx" :label="idx+''"></el-tab-pane>
    </el-tabs>
    <el-table
            :data="tableData"
            style="width: 100%">
      <el-table-column
              prop="title"
              label="标题"
              width="400">
      </el-table-column>
      <el-table-column
              prop="teacher"
              label="老师"
              width="400">
      </el-table-column>
      <el-table-column
              prop="pre_price"
              label="原价">
        <template slot-scope="scope">
          <span>{{Number(scope.row.pre_price)/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
              prop="af_price"
              label="现价">
        <template slot-scope="scope">
          <span>{{Number(scope.row.af_price)/100}}</span>
        </template>
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
            :page-size="size"
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
      activeGrade:0,//激活的年级
      gradeData:[], // 年级列表
      tableData: [], // 表格数据
      tabData:[],// tab栏
      activeTab:0,//激活的tab
      page:1,
      size:8,
      total:1,
    }
  },
  methods:{
    /**
     * @method 处理年级改变事件
     * */
    handleGradeChange(e){
      let that=this
      that.getCourse()
    },
    /**
     * @method 获取年级数据
     * */
    getGrades(){
      let that=this
      that.$getData({
        url:"/grade-list"
      }).then(res=>{
        console.log("打印年级返回")
        console.log(res)
        if (res.data.code===0){
          that.gradeData=res.data.data
        }else {
          that.$message.error('获取科目失败!')
        }
      })
    },
    /**
     * @method 初始化数据
     * */
    initData(){
      let that=this
      that.page=1
      that.total=1
      that.tableData=[]
    },
    /**
     * @method 页码改变
     * */
    handlePageChange(e){
      let that=this
      that.page=e
      that.getCourse()
    },
    /**
     * @method 点击tab事件
     * */
    handleClick(e){
      let that=this
      that.initData()
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
          grade:that.activeGrade?that.activeGrade:undefined,
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
    that.getGrades()
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
