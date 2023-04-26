<template>
	<view class="shop-car">
		<template v-if="list.length > 0">
		<!-- 自定义导航栏 -->
			<uniNavBar title="购物车" 
			:right-text='isNavBar?"完成":"编辑"'
			fixed="true" 
			status-bar="true" 
			@clickRight="isNavBar = !isNavBar"
			>
			</uniNavBar>
			
			<!-- 商品内容 -->
			<view class="shop-list">
				<view class='shop-item' v-for='(item,index) in list' :key='index'>
					<label class="radio" @tap="selectedItem(index)">
						<radio value="" color="#FF3333" :checked="item.checked" /><text></text>
					</label>
					<image :src="item.imgUrl" mode=""></image>
					<view class="shop-text">
						<view class="shop-name">{{item.name}}</view>
						<view class="shop-color f-color">{{item.color}}</view>
						<view class="shop-price">
							<view>{{item.pprice}}</view>
							<template v-if="!isNavBar">
								<view class="">*{{item.num}}</view>
							</template>
							<template v-else>
								<uniNumberBox
								:value='item.num'
								min='1'
								@change='changeNumber($event,index)'
								>
									
								</uniNumberBox>
							</template>
						</view>
					</view>
				</view>
			</view>
			<!--底部-->
			<view class='shop-foot'>
				<label class="radio foot-radio" @tap="checkedAllFn">
					<radio value="" color='#FF3333' :checked="checkedAll" /><text>全选</text>
				</label>
				<template v-if="!isNavBar">
					<view class='foot-total'>
						<view class='foot-count'>合计：<text class='f-active-color'>¥{{totalCount.pprice}}</text></view>
						<view class='foot-num' @tap="goConfirmOrder">结算({{totalCount.num}})</view>
					</view>
				</template>
				<template v-else>
					<view class='foot-total'>
						<view class='foot-count' style="background-color: #000000;">移入收藏夹</view>
						<view class='foot-num' @tap="delGoodsFn">删除</view>
					</view>
				</template>
			</view>
		</template>
		<template v-else>
			<uniNavBar title="购物车"></uniNavBar>
			<view class="shop-else-list">
				<text>亲~购物车已清空</text>
				<image src="../../static/images/qk.jpg" mode=""></image>
			</view>
		</template>
		<Tabbar cureentPage='shopcart'></Tabbar>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni/uni-nav-bar/uni-nav-bar.vue"
	import uniNumberBox from "../../components/uni/uni-number-box/uni-number-box.vue"
	import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
	import Tabbar from '../../components/common/Tabbar.vue'
	export default {
		data() {
			return {
				isNavBar:false,	
			}
		},
		computed:{
			...mapState({
				list:state=>state.cart.list
			}),
			...mapGetters(['checkedAll','totalCount'])
		},
		components:{
			uniNavBar,
			uniNumberBox,
			Tabbar
		},
		methods:{
			...mapActions(['checkedAllFn','delGoodsFn']),
			...mapMutations(['selectedItem']),
			changeNumber(value,index){
				this.list[index].num = value;
			},
			// 结算确认订单
			goConfirmOrder(){
				uni.navigateTo({
					url:'../confirm-order/confirm-order'
				})
			}
		},
	}
</script>

<style lang="scss">
.shop-item{
	display: flex;
	position: relative;
	padding: 20rpx;
	align-items: center;
	background-color: #F7F7F7;
	margin-top: 10rpx;
		image{
			width: 200rpx;
			height: 200rpx;
		}
		.shop-text{
			flex: 1;
			padding-left: 20rpx;
			.shop-color{
				font-size: 24rpx;
			}
			.shop-price{
				display: flex;
				justify-content: space-between;
			}
		}
}
.shop-else-list{
	background-color: #F7F7F7;
	width: 100%;
	height: 100%;
	display: flex;
	margin-top: 100rpx;
	flex-direction:column;
	align-items: center;
	justify-content: center;
	image{
		margin-top: 100rpx;
	}
}
.shop-foot{
	border-top:2rpx solid #F7F7F7;
	background-color: #FFFFFF;
	position: fixed;
	bottom:65rpx;
	left:0;
	width:100%;
	height: 100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.foot-radio{
		padding-left:20rpx;
	}
	.foot-total{
		display: flex;
		.foot-count{
			color: #F7F7F7;
			line-height: 75rpx;
			padding:0 10rpx;
			font-size:28rpx;
		}
		.foot-num{
			background-color: #49BDFB;
			color:#FFFFFF;
			padding:0 60rpx;
			line-height: 75rpx;
		}
	}
}
</style>
