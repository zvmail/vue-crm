<template>
<div class="app-container calendar-list-container">
  <h3>本地存储的测试</h3>
  <h4>绑定从localStorage中读取的数据，动态添加list并监听将数据变化存储在localStorage中，绑定点击事件改变样式</h4>
  
  <br>
  请输入保存内容：<el-input @keyup.enter.native="onEnter" v-model="input_name" style="width: 200px;" class="filter-item" placeholder="文本">
  </el-input>
  <br>
  <el-row></el-row>
  <el-card class="box-card">
    <div v-for="item in items" v-bind:class="{'class-a':item.finish}" @click="change(item)" class="text item">  
      {{'内容：' + item.text }}
    </div>
  </el-card>
  
</div>
</template>
<script>
export default {
  name: 'localstorage',
  data() {
    return {
      input_name: '',
      items: []
    }
  },
  created() { // 加载的时候从本地存储得到原来的内容
    this.fetch();
  },
  methods: {
    onEnter() { // 回车时存入数据
      this.items.push({ text: this.input_name, finish: false });
      console.log(this.items);
    },
    change(s) { // 模拟在数据改变时，直接更新localstorage
      s.finish = !s.finish;
    },
    fetch() {
      this.items = JSON.parse(window.localStorage.getItem('items') || '[]');
    }
  },
  watch: {
    items: { // 监听items的变化，存储在localstorage
      handler() {
        if (window.localStorage) {
          localStorage.setItem('items', JSON.stringify(this.items));
        } else {
          Cookie.write('menuTitle', this.items);
        }
      },
      deep: true
    }
  }
}
</script>
<style>
  .class-a{
    color:red;
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>
