var User = {
	//查询用户名
	queryUserName( param ){
		//phone = 应该是手机号这个变量[属性],为了后面好操作所有名称改为:userName
		return "select * from user where userName = '"+param.userName+"' or phone = '"+param.userName+"' ";
	},
	//验证用户名和密码
	queryUserPwd( param ){
		return "select * from user where userName = '"+param.userName+"' or phone = '"+param.userName+"' and userPwd = '"+param.userPwd+"' ";
	},
	
	//增加一条用户数据
	insertData( param ){
		let userName = param.userName || param.openid.slice(0,2);
		const jwt = require('jsonwebtoken');
		let payload = {name:userName}; //用户名
		let secret = 'xiaoluxian';//口令
		let token = jwt.sign(payload,secret);
		let nickName = param.nickName || "你的名字";
		let avatarUrl = param.avatarUrl || "../../static/images/头像.jpg";
		return 'insert into user (userName,userPwd,phone,imgUrl,nickName,token,provider,openid) values ("","1234567","'+userName+'","'+avatarUrl+'","'+nickName+'","'+token+'","'+param.provider+'","'+param.openid+'")';
	}
}

exports = module.exports = User;

