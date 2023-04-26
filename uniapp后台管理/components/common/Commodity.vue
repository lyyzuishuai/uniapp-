<template>
	<!-- 单个商品组件 -->
	<view class="commodity" :style="`flex-wrap:${wrap}`">
		<view class="common-item" v-for="(item,id) in dataList" :key="item.id" :style="`width:${itemW}`" @tap="goDetails(item.id)">
			<image class="commodity-img" :src="item.imgUrl" :style="`height:${itemH}`" @tap="goDetails"></image>
			<view class="commodity-content">
				<text class="commodity-name" :style="`font-size:${nameSize}`">
					{{item.name}}
				</text>
				<view>
					<text class="pprice">{{item.pprice}}</text>
					<text class="oprice">{{item.oprice}}</text>
				</view>
				<text class="descode">{{item.descode}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		props:{
			dataList:Array,
			itemW:{
				type:String,
				default:"375rpx"
			},
			itemH:{
				type:String,
				default:"375rpx"
			},
			wrap:{
				type:String,
				default:"wrap"
			},
			nameSize:{
				type:String,
				default:"26rpx"
			},
		},
		
		methods:{
			goDetails(id){
				uni.navigateTo({
					url:"/pages/details/details?id="+id+""
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.commodity{
	display: flex;
	// flex-wrap: wrap;
	.common-item{
		// width: 375rpx;
		padding-bottom: 20rpx;
		.commodity-img{
			width: 100%;
			// height: 375rpx;
		}
		.commodity-content{
			text-align: center;
			.commodity-name{
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp:2;
				-webkit-box-orient:vertical;
				color:#333333;
				word-break: break-all;
				padding:6rpx 20rpx;
			}
			.pprice{
				// text-decoration: line-through;
				// font-size: 24rpx;
				// color: #999999;
			}
			.oprice{
				text-decoration: line-through;
				font-size: 24rpx;
				color: #999999;
			}
			.descode{
				border-radius: 4rpx;
				border: 1px solid red;
				padding: 2rpx 10rpx;
				font-size: 20rpx;
				color: red;
			}
		}
	}
}
</style>