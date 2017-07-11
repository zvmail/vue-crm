<template>
  <div class="app-container calendar-list-container">
    <div>基于Elm的table控件，功能比较全 https://github.com/njleonzhang/vue-data-tables</div>
    <br>
    <div>利用columns，封装了列的定义等等，可以在created的时候从后台动态产生</div>
    <br>
    <data-tables :data="tableData" :checkbox-filter-def="getCheckFilterDef()" :actions-def="getActionsDef()" :row-action-def="getRowActionsDef()" :search-def="getSearchDef()" action-col-width="200" @row-click="rowClick" ref="table1">
      <el-table-column v-for="item in columns" :key="item" :prop="item.prop" :label="item.label" :sortable="item.sortable">
      </el-table-column>
    </data-tables>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        { id: 1, prop: 'flow_no', label: '服务编号', sortable: 'custom' },
        { id: 2, prop: 'content', label: '服务内容', sortable: 'custom' },
        { id: 3, prop: 'state', label: '服务状态', sortable: 'custom' }],
      tableData: [{ flow_no: '001', content: 'sdasd', state: 'created' }, { flow_no: '002', content: '测试', state: 'created' }]
    }
  },
  methods: {
    rowClick(row) {
      this.$message('row clicked' + row)
    },
    getActionsDef() {
      let self = this;
      return {
        width: 5,
        def: [{
          name: 'new',
          handler() {
            self.$message('new clicked')
          },
          icon: 'plus'
        }]
      }
    },
    getCheckFilterDef() {
      return {
        width: 14,
        props: 'state',
        def: [{ 'code': 'created', 'name': '未处理' },
        { 'code': 'accepted', 'name': '已接单' },
        { 'code': 'closed', 'name': '已结束' },
        { 'code': 'cancelled', 'name': '已取消' }]
      }
    },
    getRowActionsDef() {
      let self = this;
      return [{
        type: 'primary',
        handler(row) {
          self.$message('Edit clicked')
          console.log('Edit in row clicked', row)
        },
        name: 'Edit'
      }, {
        type: 'primary',
        handler(row) {
          self.$message('RUA in row clicked')
          console.log('RUA in row clicked', row)
        },
        name: 'RUA'
      }]
    },
    getSearchDef() {
      return {
        placeholder: 'input searchkey',
        props: ['content', 'flow_no'] // can be string or Array
      }
    },

    // 事件监控
    handleSelect(selection, row) {
      console.log('handleSelect', selection, row)
    },
    handleAllSelect(selection) {
      console.log('handleAllSelect', selection)
    },
    handleCurrentRowChange(currentRow, oldCurrentRow) {
      console.log('handleCurrentRowChange', currentRow, oldCurrentRow)
    },
    handleFilterDataChange(filteredData) {
      console.log('handleFilterDataChange', filteredData)
      this.filteredData = filteredData
    }
  }
}
</script>

