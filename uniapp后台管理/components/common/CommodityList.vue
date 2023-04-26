<template>
	<view class='commodity-list'>
		
		<!-- 商品列表组件 -->
		<Commodity :dataList='dataList'></Commodity>
		
	</view>
</template>

<script>
import Commodity from './Commodity.vue'
export default {
	props:{
		dataList:Array
	},
	components:{
		Commodity
	}
}
</script>

<style>
</style>
