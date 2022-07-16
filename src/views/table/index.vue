<template>
    <div class="page index">
        <el-table :data="tableData" style="width: 100%" height="calc(100% - 60px)">
            <el-table-column label="Date" width="180">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                    <el-icon><timer /></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Name" width="180">
                <template #default="scope">
                    <el-popover effect="light" trigger="hover" placement="top" width="auto">
                    <template #default>
                        <div>name: {{ scope.row.name }}</div>
                        <div>address: {{ scope.row.address }}</div>
                    </template>
                    <template #reference>
                        <el-tag>{{ scope.row.name }}</el-tag>
                    </template>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="Operations">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                    >Edit</el-button
                    >
                    <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >Delete</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                :currentPage="currentPage2"
                :page-size="pageSize2"
                :page-sizes="[100, 200, 300, 400]"
                :small="small"
                :disabled="disabled"
                :background="background"
                layout="sizes, prev, pager, next"
                :total="1000"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                />
        </div>
    </div>
</template>

<script setup lang='ts'>
import {ref,reactive,onMounted,toRefs,nextTick} from 'vue'

            // 接口
            interface User {
            date: string
            name: string
            address: string
            }
            // 接口实现
          const tableData:User[]=[
            {
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
          ]
        
        
            const handleEdit=()=>{
                alert(111)
            };
            const handleDelete=()=>{};
        
</script>

<style lang='less' scoped>
.index{
    .pagination{
        width: 100%; height: 40px;margin-top: 20px;display: flex; justify-content: center;
    }
}

</style>