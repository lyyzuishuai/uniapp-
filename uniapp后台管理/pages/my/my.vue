<template>
	<view class="my">
		<!-- 头部 -->
		<view class="my-header">
			<view class="header-main">
				<view class="header-config" @tap="goConfig">
					<image class="config-img" src="../../static/images/config.png"></image>
				</view>
				<view class="header-logo">
					<image class="logo-img" :src="loginStatus ? userInfo.imgUrl : '../../static/images/问号.png'" mode=""></image>
					<view class="logo-name">{{loginStatus ? userInfo.nickName : "查无此人"}}</view>
				</view>
			</view>
		</view>
		<!-- 我的订单 -->
		<view class="order">
			<view class="order-title" @tap='goOrder'>
				<view class="">我的订单</view>
				<view class="">全部订单 ></view>
			</view>
			<view class="order-list">
				<view class="order-item">
					<image class="order-img" src="../../static/img/order1.png" mode=""></image>
					<view class="">待付款</view>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/order2.png" mode=""></image>
					<view class="">待付款</view>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/order3.png" mode=""></image>
					<view class="">待付款</view>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/order4.png" mode=""></image>
					<view class="">待付款</view>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/order5.png" mode=""></image>
					<view class="">待付款</view>
				</view>
			</view>
		</view>
		
		<!--内容列表-->
		<view class='my-content'>
			<view class="my-content-item">
				<view>我的收藏</view>
				<view>></view>
			</view>
			<view class="my-content-item">
				<view>我的收藏</view>
				<view>></view>
			</view>
			<view class="my-content-item">
				<view>我的收藏</view>
				<view>></view>
			</view>
			<view class="my-content-item">
				<view>我的收藏</view>
				<view>></view>
			</view>
			<view class="my-content-item">
				<view>我的收藏</view>
				<view>></view>
			</view>
			<view class="my-content-item">
				<view>我的收藏</view>
				<view>></view>
			</view>
			<view class="my-content-item">
				<view>我的收藏</view>
				<view>></view>
			</view>
			
		</view>
		<Tabbar cureentPage='my'></Tabbar>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import Tabbar from '../../components/common/Tabbar.vue'
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapState({
				loginStatus:state=>state.user.loginStatus,
				userInfo:state=>state.user.userInfo
			})
		},
		
		methods: {
			goConfig(){
				uni.navigateTo({
					url:"../my-config/my-config"
				})
			},
			goOrder(){
				uni.navigateTo({
					url:"../my-order/my-order"
				})
			},
		},
		components:{
			Tabbar
		}
	}
</script>

<style lang="scss" scoped>
.my-header{
	background: url('../../static/images/xk2.jpg') no-repeat;
	width: 100%;
	height: 400rpx;
	.header-main{
		position: relative;
		top: 120rpx;
		.header-config{
			position: absolute;
			left: 40rpx;
			.config-img{
				position: absolute;
				width: 40rpx;
				height: 40rpx;
				top: -85rpx;
				left: -10rpx;
			}
		}
		.header-logo{
			position: absolute;
			width: 120rpx;
			left: 50%;
			margin-left: -50rpx;
			.logo-img{
				width: 120rpx;
				height: 120rpx;
				border: 2rpx solid #CCCCCC;
				background-color: #FFFFFF;
				border-radius: 50%;
			}
			.logo-name{
				color: #FFFFFF;
				text-align: center;
				// background-color: pink;
			}
		}
	}
}
.order-title{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
}
.order-list{
	display: flex;
	padding: 20rpx;
	.order-item{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.order-img{
			width: 60rpx;
			height: 60rpx;
		}
	}
}
.my-content{
	margin:20rpx 0;
	padding:0 20rpx;
	.my-content-item{
		display: flex;
		justify-content: space-between;
		align-items:center;
		padding:20rpx 0; 
		border-bottom: 2px solid #CCCCCC;
	}
}


</style>
