<template>
    <div class="app-container calendar-list-container">
        <!-- 功能区： 过滤/排序/新增 -->
        <div class="filter-container">
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="listQuery.name">
            </el-input>

            <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.sex" placeholder="性别">
                <el-option v-for="item in  sexTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
                </el-option>
            </el-select>
    
            <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort" placeholder="排序">
                <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
                </el-option>
            </el-select>
    
            <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
            <el-button class="filter-item" type="primary" icon="document" @click="handleExport">导出</el-button>
            <!--<el-checkbox class="filter-item" @change='tableKey=tableKey+1' v-model="showAuditor">显示审核人</el-checkbox>-->
        </div>
    
        <!-- table 组件 -->
        <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="序号" width="65">
                <template scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>
    
            <el-table-column width="110px" align="center" label="用户ID">
                <template scope="scope">
                    <span>{{scope.row.code}}</span>
                </template>
            </el-table-column>
    
            <el-table-column align="center" label="用户名">
                <template scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
    
            <el-table-column width="110px" align="center" label="性別">
                <template scope="scope">
                    <span>{{scope.row.sex | sexFilter}}</span>
                </template>
            </el-table-column>
    
            <el-table-column align="center" label="操作" width="150">
                <template scope="scope">
                    <el-button v-if="scope.row.sex!='F'" size="small" type="success" @click="handleModifyStatus(scope.row,'published')">发布
                    </el-button>
                    <el-button v-if="scope.row.sex!='M'" size="small" @click="handleModifyStatus(scope.row,'draft')">草稿
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
    
        </el-table>
    
        <!-- 分页 -->
        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    
        <!-- detail窗口 -->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
                
    
                <el-form-item label="用户ID">
                    <el-input v-model="temp.code"></el-input>
                </el-form-item>

                <el-form-item label="姓名">
                    <el-input v-model="temp.name"></el-input>
                </el-form-item>
    
                <el-form-item label="性别">
                    <el-select class="filter-item" v-model="temp.sex" placeholder="请选择">
                        <el-option v-for="item in sexTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="创建时间">
                    <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>

                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
                <el-button v-else type="primary" @click="update">确 定</el-button>
            </div>
        </el-dialog>
    
    </div>
</template>

<script>
import { listfetch, userfetch } from 'api/user';

const sexTypeOptions = [
      { key: 'F', display_name: '女' },
      { key: 'M', display_name: '男' }
    ];

// arr to obj
const sexTypeKeyValue = sexTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name;
    return acc
}, {});


export default {
    name: 'usermanage',
    data() {
        return {
            list: null,
            total: null,
            user: null,
            listLoading: true, // loading 窗口
            listQuery: {
                page: 1,
                limit: 20,
                sex: '',
                name: '',
                sort: '+id'
            },
            temp: {
                id: undefined,
                code: '',
                name: '',
                sex: '',
                timestamp: undefined
            },
            // 控制对话框
            dialogFormVisible: false,
            dialogStatus: '',
            tableKey: 0,
            // 过滤
            sexTypeOptions,
            // 排序
            sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],

            textMap: {
                update: '编辑',
                create: '创建'
            }
        }
    },
    filters: {
        sexFilter(sex) {
            return sexTypeKeyValue[sex];
        }
    },
    methods: {
        // 调用数据部分
        getList() {
            this.listLoading = true;
            listfetch(this.listQuery).then(response => {
                this.list = response.data.items;
                //console.log(response.data.items);
                this.total = response.data.total;
                this.listLoading = false;
            })
        },
        getUser() {
            this.listLoading = true;
            userfetch().then(response => {
                this.user = response.data;
                this.listLoading = false;
            })
        },

        // 控制分页部分
        handleSizeChange(val) {
            this.listQuery.limit = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getList();
        },

        // 增删改查部分
        handleModifyStatus(row, status) {
            this.$message({
                message: '操作成功',
                type: 'success'
            });
            row.sex = row.sex === 'F' ? 'M' : 'F';
        },
        handleDelete(row) {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$notify({
                    title: '操作提示',
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                });
                const index = this.list.indexOf(row);
                this.list.splice(index, 1);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleCreate() {
            // 弹出窗口，输入后提交后台，返回结果
            this.temp = {
                id: undefined,
                code: '',
                name: '',
                sex: ''
            };
            this.dialogStatus = 'create';
            this.dialogFormVisible = true;
        },
        create() {
            console.log('create and validate');

            if (this.temp.sex === '') {
                this.$notify({
                    title: '错误',
                    message: '性别不能为空',
                    type: 'error',
                    duration: 1000
                });
                return;
            }

            this.temp.id = parseInt(Math.random() * 100);
            this.list.unshift(this.temp);
            this.total = this.total + 1;
            this.dialogFormVisible = false;
            this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 1000
            });
        },
        update() {
            console.log('update');
        },
        handleExport() { // 导出到excel
            require.ensure([], () => {
                const { export_json_to_excel } = require('vendor/Export2Excel');
                const tHeader = ['序号', '用户ID', '姓名', '性别'];
                const filterVal = ['id', 'code', 'name', 'sex'];
                const data = this.list.map(v => filterVal.map(j => v[j]));
                export_json_to_excel(tHeader, data, 'table数据');
          })
        },
        handleFilter() {
            this.getList();
        }

    },
    created() {
        this.getList();
    }

}
</script>
