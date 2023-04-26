<template>
	<view class='tabbar'>
		<view 
			class='tab' 
			v-for="(item,index) in tabbarList" 
			:key='index'
			@tap='navigatorTo(item.pagePath)'
		 >
			<image v-if=' item.pagePath === cureentPage ' :src="item.selectedIconPath" mode=""></image>
			<image v-else :src="item.iconPath" mode=""></image>
			<view class='text'>{{item.text}}</view>
		</view>
	</view>
</template>

<script>
export default{
	props:{
		cureentPage:{
			type:String,
			default:'index'
		}
	},
	data () {
		return {
			tabbarList:[
				
				{
					"pagePath": "index",
					"iconPath":"/static/icon/首页.png",
					"selectedIconPath":"/static/icon/首页 (1).png",
					"text": "首页"
				}, 
				{
					"pagePath": "list",
					"iconPath":"/static/icon/分类 (1).png",
					"selectedIconPath":"/static/icon/分类.png",
					"text": "分类"
				},
				{
					"pagePath": "shopcar",
					"iconPath":"/static/icon/购物车空 (1).png",
					"selectedIconPath":"/static/icon/购物车空.png",
					"text": "购物车"
				},
				{
					"pagePath": "my",
					"iconPath":"/static/icon/关于我们.png",
					"selectedIconPath":"/static/icon/关于我们 (1).png",
					"text": "我的"
				}
			]
		}
	},
	methods:{
		navigatorTo(e){
			if(  e==='shopcar'  ||  e==='my' ){
				this.navigateTo({
					url:`../../pages/${e}/${e}`,
					animationType:"fade-in",
					animationDuration:0
				})
			}else{
				uni.redirectTo({
					url:`../../pages/${e}/${e}`
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.tabbar{
	border-top:2rpx solid #636263;
	background-color: #FFFFFF;
	z-index: 9999;
	position: fixed;
	left:0;
	bottom:0;
	width:100%;
	height: 100rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	.tab{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
}

image{
	width: 40rpx;
	height: 40rpx;
}
.text{
	padding:8rpx 0;
	font-size:24rpx;
}
</style>
