// 定义共用的errorlog，我觉得不应该放在此目录
// 在main.js中用到
const errLog = {
  state: {
    errLog: []
  },
  pushLog(log) {
    this.state.errLog.unshift(log)
  },
  clearLog() {
    this.state.errLog = [];
  }
};

export default errLog;
