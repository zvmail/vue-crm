<template>
  <div>
    My name is {{name}}, 我是Child component！ 外人都叫我：{{myName}}
    <div>
      这里是一个Solt演示：
      <slot> 父组件可以插入内容到此 </slot>
      <br>
      输入内容将返回给父组件:
      <el-input @keyup.enter.native="onEnter" v-model="input_return" style="width: 200px;" class="filter-item" placeholder="文本">
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  id: 'child',
  props: ['myName'], // 利用props属性，父组件可以赋值给子控件
  data() {
    return {
      name: 'Vincent',
      input_return: ''
    }
  },
  methods: {
    onEnter() {
        console.info('input:' + this.input_return);
        this.$emit('onEnter', this.input_return);
    }
  }
}
</script>
