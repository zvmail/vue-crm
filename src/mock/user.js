import Mock from 'mockjs';
import {
    param2Obj
} from 'utils';


// 先定义对象，然后mock模拟数据
const list = [];
const count = 100;

for (let i = 0; i < count; i++) {
    list.push(Mock.mock({
        'id|1-100': 100,
        code: '@FIRST',
        name: '@cname',
        'sex|1': ['F', 'M']
    }));
}

// 输出2个函数，然后在index.js中将url关联到函数
export default {
    getList: config => {
        // 从url转换查询参数
        const {
            limit,
            page,
            sex,
            name,
            sort
        } = param2Obj(config.url);

        // 过滤的处理
        let mocklist = list.filter(item => {
            if (name && item.name.indexOf(name) < 0) return false;
            if (sex && item.sex !== sex) return false;
            return true;
        });

        // 排序的处理
        if (sort === '-id') {
            mocklist = mocklist.reverse();
        }

        // 分页的处理
        const pageitems = mocklist.filter((item, index) => index < limit * page && index >= limit * (page - 1));
        return {
            items: pageitems,
            total: mocklist.length
        }
    },
    getUser: () => ({
        id: 1,
        code: 'demo',
        name: 'mock demo',
        sex: 'F'
    })
};