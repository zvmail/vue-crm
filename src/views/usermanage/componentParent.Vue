<template>
  <div class="app-container calendar-list-container">
    <h3>这里是Parent component，我给Vincent起名叫{{childName}}</h3>
    <child v-bind:myName="childName" @onEnter="onEnter">
      <slot>这些内容在父组件设定，插入到子组件solt</slot>
    </child>
    <br>
    子控件返回：{{msg}}
  </div>
</template>

<script>
import child from './componentChild';

export default {
  components: { "child": child },
  data() {
    return {
      childName: 'Xiao Zhang',
      msg: ''
    }
  },
  methods: {
    onEnter: function(msg) {
      this.msg = msg;
    }
  }
};

</script>

