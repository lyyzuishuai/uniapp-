<template>
	<view class="search">
		<Lines></Lines>
		<view class="search-item">
			<view class="search-title">
				<view class="f-color">最近搜索</view>
				<view class="iconfont icon-icon" @tap="clearHistory"></view>
			</view>
			<view v-if="searchData.length>0">
				<view class="search-name f-color" v-for="(item,index) in searchData" :key="index">{{item}}</view>
			</view>
			<view v-else class="search-end">
				暂无搜索记录
			</view>
		</view>
		
		<view class="search-item">
			<view class="search-title">
				<view class="f-color">热门搜索</view>
			</view>
			<view>
				<view class="search-name f-color">四件套</view>
				<view class="search-name f-color">面膜</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Lines from "@/components/common/Line.vue"
	export default {
		data() {
			return {
				// 输入额关键词
				keyword:'',
				// 搜索过的词记录
				searchData:[]
			};
		},
		onLoad(){
			uni.getStorage({
				key:"searchData",
				success:(res)=>{
					this.searchData = JSON.parse(res.data)
				}
			})
		},
		
		// 点击顶栏搜索按钮
		onNavigationBarButtonTap(e){
			this.search();
		},
		// 监听原生搜索输入框的内容
		onNavigationBarSearchInputChanged(e){
			this.keyword = e.text
		},
		// 监听软键盘点击搜索的按钮
		onNavigationBarSearchInputConfirmed(){
			
		},
		
		components:{
			Lines
		},
		
		methods:{
			// 判断关键词是否为空和跳转页面
			search(){
				if(this.keyword === ''){
					return uni.showToast({
						title: '搜索关键词不能为空',
						icon:"none"
					});
				}else{
					uni.navigateTo({
						// 传值过去(传的就是搜索的值)
						url:"../search-list/search-list?keyword="+this.keyword+""
					});
				}
				uni.hideKeyboard();
				this.addSearch()
			},
			// 记录最近搜索词
			addSearch(){
				let idx = this.searchData.indexOf(this.keyword)
				if(idx<0){
					this.searchData.unshift(this.keyword);
				}else{
					this.searchData.unshift(this.searchData.splice(idx,1)[0]);
				}
				
				uni.setStorage({
					key:"searchData",
					data:JSON.stringify(this.searchData)
				})
				
			},
			
			// 清除搜索记录
			clearHistory(){
				uni.showModal({
					title:"重要提示",
					content:"是都要清除记录",
					cancelText:"取消",
					confirmText:"确定",
					success:(res)=>{
						if(res.confirm){
							uni.removeStorage({
								key:"searchData",
								
							})
							this.searchData=[];
						}
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
.search-item{
	padding: 20rpx;
	.search-title{
		display: flex;
		justify-content: space-between;
	}
	.search-name{
		padding: 4rpx 24rpx;
		background-color: #E1E1E1;
		display: inline-block;
		border-radius: 26rpx;
		margin: 10rpx;
	}
	.search-end{
		text-align: center;
	}
}
</style>
