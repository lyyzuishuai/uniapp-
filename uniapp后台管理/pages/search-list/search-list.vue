<template>
	<view>
		<ShopList :keyword="keyword"></ShopList>
	</view>
</template>

<script>
	import ShopList from "@/components/common/ShopList.vue"
	export default {
		data() {
			return {
				keyword:""
			};
		},
	
		onLoad(e){
			this.keyword = e.keyword;
			var keyword = this.keyword
			// #ifdef APP-PLUS 
			var webView = this.mp.page.$getAppWebview();  
			webView.setTitleNViewSearchInputText(e.keyword);
			// #endif
			
			// #ifdef H5
			let inputSearch=document.querySelector('.uni-input-input[type=search]');
				var evt = new InputEvent('input', {
					inputType: 'insertText',
					data: keyword,
					 dataTransfer: null,
					 isComposing: false
				 });
				 if(inputSearch){
					 inputSearch.value = keyword;
					 inputSearch.dispatchEvent(evt);
				}
			// #endif
			},
		components:{
			ShopList
		}
		
	}
</script>

<style lang="scss">

</style>
