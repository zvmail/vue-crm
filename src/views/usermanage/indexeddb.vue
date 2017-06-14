<template>
  <div class="components-container">
    <h3>浏览器数据库的使用</h3>
    <h4>增加记录，浏览列表</h4> 
    <el-button type="primary" icon="document" @click="add">ADD</el-button>
    <el-card class="box=card">
      <div v-for="i in list" class="text item">
        {{ i.name + '-' + i.code }}
      </div>
    </el-card>
  </div>
</template>

<script>
import { getUserList, addUser } from 'dao/index';

export default {
  name: 'indexeddb',
  data() {
    return {
      list: null
    }
  },
  methods: {
    getlist() {
      getUserList().then(items => {
        this.list = items;
        console.log(this.list);
      }).catch(err => {
        console.error('Uh oh! ' + err.stack);
      });
    },
    add() {
      const item = {
        code: '002',
        name: 'vsdfsdvv',
        sex: 'M',
        age: 33
        };

      addUser(item).then(() => {
        // commit
        this.getlist();
        console.log('succedd');
      }).catch(err => {
        // rollback
        console.error('Uh oh! ' + err.stack);
      });
    }
  },
  created() {
    this.getlist();
  }
}
</script>