import {Injectable} from '@angular/core';
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {HttpService} from "../../providers/HttpService";
import { APP_SERVE_URL } from "../../providers/Constants";
@Injectable()
export class myService {
  constructor(public httpService: HttpService) {
  }
	//获取用户信息
    getUserInfo(userId){
		return this.httpService.get(APP_SERVE_URL+'ChildAccounts/'+userId).map((res: Response) =>  res.json());
    }
	//实名认证 
	nameVerify(userId,val){
		return this.httpService.patch(APP_SERVE_URL+'ChildAccounts/RealNameAuthentication/'+userId,{
			realName :val.name,
			identityCard :val.verify
		}).map((res: Response) =>  res.json());
	}
	//修改手机号
	modifyPhone(userId,val){
		return this.httpService.patch(APP_SERVE_URL+'ChildAccounts/PhoneMob/'+userId,{
			newPhoneMob :val.account,
			verifyCode :val.verify
		}).map((res: Response) =>  res.json());
	}
	//修改登录密码
	modifyLoginPassword(userId,val){
		return this.httpService.patch(APP_SERVE_URL+'ChildAccounts/Password/'+userId,{
			oldPassword :val.oldpassword,
			newPassword :val.newpassword,
			confirmPassword :val.confirmpassword
		}).map((res: Response) =>  res.json());
	}
	//设置提现密码
	setDrawPassword(userId,val){
		return this.httpService.post(APP_SERVE_URL+'ChildAccounts/MentionPassword/'+userId,{
			password :val.drawpassword,
			confirmPassword :val.drawpassword
		}).map((res: Response) =>  res.json());
	}
	//修改提现密码
	modifyDrawPassword(userinfo,val){
		return this.httpService.patch(APP_SERVE_URL+'ChildAccounts/MentionPassword/'+userinfo.userId,{
			phoneMob:userinfo.account,
			newPassword :val.password,
			verifyCode :val.verify
		}).map((res: Response) =>  res.json());
	}
	//获取优惠券
	getCoupon(userId){
		return this.httpService.get(APP_SERVE_URL+'ChildAccounts/Coupon/'+userId).map((res: Response) =>  res.json());
	}
	
	//提现
	withDraw(userId,money,cardId,mentionPassword){
		return this.httpService.post(APP_SERVE_URL+'ChildAccounts/Withdraw/'+userId,{
			money:money,
			cardId:cardId,
			mentionPassword:mentionPassword
		}).map((res: Response) =>  res.json());
	}
	//获取全部资金明细
	getAllDetail(userId,pageIndex,pageSize,classId){
		return this.httpService.get(APP_SERVE_URL+'CapitalFlows?accountId='+userId+'&pageIndex='+pageIndex+'&pageSize='+pageSize+'&classId='+classId).map((res: Response) =>  res.json());
	}
	//获取银行卡
	getBankCard(userId){
		return this.httpService.get(APP_SERVE_URL+'ChildAccounts/BankCard/'+userId).map((res: Response) =>  res.json());
	}
	//解绑银行卡
	delBankCard(userId,id){
		return this.httpService.patch(APP_SERVE_URL+'AccountBankCards',{
			id:id,
			accountId:userId
		}).map((res: Response) =>  res.json());
	}
	//添加银行卡
	addBankCard(accountId ,bank,branch ,province ,city ,bankCardNumber ,realName ,identityCard ){
		return this.httpService.post(APP_SERVE_URL+'AccountBankCards',{
			accountId:accountId ,
			bank:bank,
			branch:branch ,
			province:province ,
			city:city ,
			bankCardNumber:bankCardNumber ,
			realName :realName,
			identityCard:identityCard
		}).map((res: Response) =>  res.json());
	}
	//获取省市区联动数据
	getCityData(){
		return this.httpService.get('../../assets/data/cityData.json').map((res: Response) =>  res.json());
	}
	//获取推广详情数据
	getPromoteData(userId){
		return this.httpService.get(APP_SERVE_URL+'ChildAccounts/Promotion/'+userId).map((res: Response) =>  res.json());
	}
	//获取我的下线列表
	getMyUser(userId){
		return this.httpService.get(APP_SERVE_URL+'ChildAccounts/PromotionAccount/'+userId).map((res: Response) =>  res.json());
	}
	getLevelDetail(){
		return this.httpService.get(APP_SERVE_URL+'PromotionLevels').map((res: Response) =>  res.json());
	}
   // 更新用户头像Id
	updateUserAvatarId(avatarId: string) {
		return this.httpService.post(APP_SERVE_URL+'PromotionLevels',{
			avatarId:avatarId
		}).map((res: Response) => res.json());
	}
}
