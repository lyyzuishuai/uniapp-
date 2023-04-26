<template>
	<view class='login-other'>
		<view class='other-text'>
			<view>或者用以下方式登录</view>
		</view>
		<view class='other'>
			<view class='other-item' @tap='loginOther("weixin")'>
				<image src="../../static/img/微信.png"  mode=""></image>
				<view>微信登录</view>
			</view>
			<view class='other-item' @tap='loginOther("sinaweibo")'>
				<image src="../../static/img/微博.png"  mode=""></image>
				<view>微博登录</view>
			</view>
			<view class='other-item' @tap='loginOther("qq")'>
				<image src="../../static/img/qq.png"  mode=""></image>
				<view>QQ登录</view>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	methods:{
		loginOther(mode){
			uni.login({
				provider:mode,
				success:(res)=>{
					//最主要的就是openid
					let openid = res.authResult.openid;
					uni.getUserInfo({
						provider:mode,
						success:(res)=>{
							console.log(res);
						}
					})
				}
			})
		}
	}
}
</script>

<style scoped>
/*  其他登录方式  */
.login-other{
	padding: 50rpx 0;
}
.other-text{
	display: flex;
	padding:50rpx 0;
}
.other-text view{
	line-height: 0rpx;
	padding:0 10rpx;
}
.other-text:after{
	flex:1;
	content: '';
	height: 2rpx;
	background-color: #CCCCCC;
}
.other-text::before{
	flex:1;
	content: '';
	height: 2rpx;
	background-color: #CCCCCC;
}
.other{
	display: flex;
	justify-content: space-around;
}
.other-item{
	display: flex;
	flex-direction: column;
	justify-content:center;
	align-items: center;
}
.other-item image{
	width:80rpx;
	height: 80rpx;
}
/*  其他登录方式  end  */
</style>
