// http://dexie.org/docs/API-Reference
// 此模块中封装对本地数据库的访问，export function
// 使用时通过promise方式then得到返回，catch捕捉异常并回滚
import Dexie from 'dexie';

// 用来同步执行，此方法内的调用将是同步的，不需要用then
const spawn = Dexie.spawn;

const db = new Dexie('testdb');

db.version(1).stores({
  user: '++id,code,name,sex,age',
  assets: '++id,ownerId,assetName'
});

// 使用下面代码，将返回值绑定到对象
const User = db.user.defineClass({
  id: String,
  code: String,
  name: String,
  sex: String,
  age: Number
});
User.prototype.save = function() {
  return db.user.put(this);
}



// 测试返回全部数据
export function getUserList() {
  return db.user.toArray();
}

// 数据层不能catch异常（必须throw error）, 事务才能回滚，否则将提交
// 测试事务，同时保存2个表，用then才可以得到id
export function addUser(item) {
   return db.transaction('rw', db.user, db.assets, () => {
       db.user.add(item).then(id => {
          db.assets.bulkAdd([{
                    assetName: 'car',
                    ownerId: id
                  },
                  {
                    assetName: 'house',
                    ownerId: id
                  }
          ]);
      })
   });
}

// 利用ES6新特性： funtion*  yield 实现同步执行，代码更简单
export function asyncAdd() {
  return spawn(function* () {
    // write your synchrounus-like code within a spawn() black

    // Add a user:
    const id = yield db.user.add({
      code: '001',
      name: 'vvv',
      sex: 'F',
      age: 20
    });
    yield db.assets.bulkAdd([{
        assetName: 'car',
        ownerId: id
      },
      {
        assetName: 'house',
        ownerId: id
      }
    ]);

    // now, list all user and their asset:
    const user = yield db.user.toArray();

    return user;
  })
}
