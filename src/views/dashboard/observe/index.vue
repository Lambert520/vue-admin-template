<template>
    <el-row :gutter="10">
        <el-col :span="12">
            <Search></Search>        
        </el-col>
        <el-col :span="12">
            <Category></Category>      
        </el-col>
    </el-row>
</template>

<script>
import Search from './search'
import Category from './category'
export default {
    name: 'Observe',
    components: {
        Search,
        Category
    }
}
</script>

<style>

</style>