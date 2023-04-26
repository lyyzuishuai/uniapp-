<template>
	<view class="index">
		<scroll-view scroll-x="true" class="scroll-content" :scroll-into-view="scrollIntoIndex">
			<view class="scroll-item" v-for="(item,index) in topBar" :key="index" @tap="changeTap(index)" :id="'top'+index">
				<text :class='topBarIndex === index?"f-active-color":"f-color"'>{{item.name}}</text>
			</view>
		</scroll-view>
		
		<swiper @change="onChangeTab" :current="topBarIndex"  :style="`height:${CleanHeight}px`">
			<swiper-item v-for="(item,index) in newTopBar" :key="index">
				<scroll-view scroll-y="true"  :style="'height:'+CleanHeight+'px;'" @scrolltolower="loadMore(index)">
					<block v-if='item.data.length > 0 '>
						<block v-for="(k,i) in item.data" :key="i">
							<!-- 推荐 -->
							<IndexSwiper v-if="k.type ==='swiperList'" :dataList="k.data"></IndexSwiper>
								<template v-if="k.type ==='recommendList'">
									<Recommend :dataList="k.data" ></Recommend>
									<Card cardTitle="猜你喜欢"></Card>
								</template>
								<!-- 运动户外以及其它 -->
								<Banner v-if="k.type === 'bannerList'" :dataList='k.imgUrl'></Banner>
								
								<template v-if="k.type === 'iconsList'">
									<Icons :dataList="k.data"></Icons>
									<Card cardTitle="热销爆品"></Card>
								</template>
								
								<template v-if="k.type === 'hotList'">
									<Hot :dataList="k.data"></Hot>
									<Card cardTitle="推荐店铺"></Card>
								</template>
								
								<template v-if="k.type === 'shopList'">
									<Shop :dataList="k.data"></Shop>
									<Card cardTitle="为您推荐"></Card>
								</template>
								
								<CommodityList v-if="k.type ==='commodityList'" :dataList="k.data"></CommodityList>	
	
					</block>
						</block>
					<view v-else>
						暂无数据...
					</view>
					<view class="load-text f-color">
						{{item.loadText}}
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<Tabbar cureentPage='index'></Tabbar>
	</view>
</template>

<script>
	import $http from "../../components/common/api/request.js"
	import IndexSwiper from "@/components/index/IndexSwuiper.vue"
	import Recommend from "@/components/index/Recommend.vue"
	import Card from "@/components/common/Card.vue"
	import CommodityList from "@/components/common/CommodityList.vue"
	import Banner from "@/components/index/Banner.vue"
	import Icons from "@/components/index/Icons.vue"
	import Hot from "@/components/index/Hot.vue"
	import Shop from "@/components/index/Shop.vue"
	import Tabbar from '../../components/common/Tabbar.vue'
	
	export default {
		data() {
			return {
				// 选中的下标值
				topBarIndex:0,
				// 顶栏跟随的索引id值
				scrollIntoIndex:"top0",
				// 顶栏数据
				// 内容块的高度值
				CleanHeight:0,
				topBar:[],
				// 承载数据
				newTopBar:[],
			}
		},
			
		components:{
			IndexSwiper,
			Recommend,
			Card,
			CommodityList,
			Banner,
			Icons,
			Hot,
			Shop,
			Tabbar
		},
		
		onLoad() {
			this.__init();
		},
		
		onReady(){
			uni.getSystemInfo({
				success: (res) => {
				this.CleanHeight = res.windowHeight - this.getClientHeight();
				}
			})
		},
		
		// 标题栏按钮点击
		onNavigationBarButtonTap(e){
			if(e.float == "left"){
				uni.navigateTo({
					url:"../search/search"
				})
			}
		},
		
		methods: {
			__init(){
				$http.request({
					url:"/index_list/data"
				}).then((res)=>{
					this.topBar = res.topBar
					this.newTopBar = this.initData(res)
				}).catch(()=>{
					// uni.showToast({
					// 	title:"请求失败",
					// 	icon:"none",
					// })
				})
			
			},
			initData(res){
				let arr = [];
				for(let i = 0;i<this.topBar.length;i++){
					let obj = {
						data:[],
						load:"first",
						loadText:"上拉加载更多..."
					}
					// 首次获取的数据
					if(i==0){
						obj.data = res.data
					}
					arr.push(obj)
				}
				return arr; 
			},
			
			changeTap(index){
				if(this.topBarIndex === index){
					return
				}
				this.topBarIndex = index
				this.scrollIntoIndex = "top"+index
				
				// 每一次滑动赋值为first
				if(this.newTopBar[this.topBarIndex].load === "first"){
					this.addData()
				}
				
			},
			
			//获取可视区域高度【兼容】
			getClientHeight(){
				const res = uni.getSystemInfoSync();
				const system = res.platform;
				if( system ==='ios' ){
					return 44+res.statusBarHeight;
				}else if( system==='android' ){
					return 48+res.statusBarHeight;
				}else{
					return 0;
				}
			},
			// 对应滑动(和顶栏)
			onChangeTab(e){
				this.changeTap(e.detail.current)
			},
			// 对应显示不同数据
			addData(callback){
				// 拿到索引
				let index = this.topBarIndex
				// 拿到id
				let id = this.topBar[index].id;
				// 请求不同的数据
				let page = Math.ceil(this.newTopBar[index].data.length / 5) + 1; 
				
				// 请求数据
				$http.request({
					url:'/index_list/'+id+'/data/'+page+''
				}).then((res)=>{
					this.newTopBar[index].data = [...this.newTopBar[index].data,...res]
				}).catch(()=>{
					uni.showToast({
						title:"请求失败",
						icon:"none"
					})
				})
				
				// uni.request({
				// 	url:'http://10.150.169.97:3000/api/index_list/'+id+'/data/'+page+'',
				// 	success:(res)=>{
				// 		if(res.statusCode != 200){
				// 			return;
				// 		}else{
				// 			let data = res.data.data
				// 			this.newTopBar[index].data = [...this.newTopBar[index].data,...data]
				// 		}
				// 	}
				// })
				
				// 当请求结束后重新赋值
				this.newTopBar[index].load = "last"
				if(typeof callback === 'function'){
					callback();
				}
			},
			// 上拉加载更多
			loadMore(index){
				this.newTopBar[index].loadText = "加载中..."
				// 请求完数据, 文字提示信息又换成上拉加载更多...
				this.addData(()=>{
					this.newTopBar[index].loadText = "加载更多..."
				})
			},
		}
	}
</script>

<style lang="scss">
.scroll-content{
	width: 100%;
	height: 80rpx;
	white-space: nowrap;
	.scroll-item{
		display: inline-block;
		padding: 10rpx 30rpx;
		font-size: 32rpx;
		.f-active-color{
			padding:10rpx 0;
			border-bottom: 4rpx solid #49B0f8;
		}
	}
}
.load-text{
	border-top: 2rpx solid #636263;
	line-height: 60rpx;
	text-align: center;
	
}
</style>
