export default{
	state:{
		list:[
			// {
			// 	name:"张三",
			// 	tel:"13687179759",
			// 	city:"湖北省宜昌市西陵区",
			// 	details:"2号楼",
			// 	isDefault:false
			// },
			// {
			// 	name:"李四",
			// 	tel:"13687179759",
			// 	city:"湖北省宜昌市西陵区",
			// 	details:"2号楼",
			// 	isDefault:true
			// },
		]
	},
	getters:{
		defaultPath(state){
			return state.list.filter(v=>v.isDefault)
		}
	},
	mutations:{
		//拿到初始化请求当当前用户收货地址数据
		__initAddressList(state,list){
			state.list = list;
		},
		
		createPath(state,obj){
			state.list.unshift(obj);
		},
		// 解构obj
		updatePath(state,{index,item}){
			for(let key in item){
				state.list[index][key] = item[key];
			}
		},
		// 把之前选中的编程未选中
		removePath(state){
			state.list.forEach(v=>{
				if(v.isDefault){
					v.isDefault = false
				}
			})
		}
	},
	actions:{
		createPathFn({commit},obj){
			if(obj.isDefault){
				commit('removePath');
			}
			commit('createPath',obj)
		},
		updatePathFn({commit},obj){
			if(obj.item.isDefault){
				commit('createPath',obj)
			}
			commit('updatePath',obj)
		}
	}
}