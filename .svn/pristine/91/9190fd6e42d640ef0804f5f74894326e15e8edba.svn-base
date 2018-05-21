import {Injectable} from '@angular/core';
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {HttpService} from "../../providers/HttpService";
import { APP_SERVE_URL,APP_SERVE_URL2 } from "../../providers/Constants";
@Injectable()
export class LoginService {
  constructor(public httpService: HttpService) {
  }
  //获取验证码
  getVerifyCode(phone){
		return this.httpService.get(APP_SERVE_URL+'Start/SmsCode?phoneMob='+phone).map((res: Response) =>  res.json());
  }
  //注册
  register(val){
    return this.httpService.post(APP_SERVE_URL2+'Start/Register',{
      phoneMob :val.account,
      password :val.password,
      verifyCode :val.verify,
      assetunitId :val.assetunit,
      refereeId :val.recommend
    }).map((res: Response) =>  res.json());
  }
  //登录
  login(val){
    return this.httpService.post(APP_SERVE_URL+'Start/Login',{
      phoneMob :val.account,
      password :val.password,
      verifyCode :val.verifyCode,
    }).map((res: Response) =>  res.json());
  }
  //验证验证码
  confirmCode(val){
    return this.httpService.post(APP_SERVE_URL+'Start/SmsCode',{
		phone :val.account,
		verifyCode :val.verify
    }).map((res: Response) =>  res.json());
  }
  //重置密码
  resetPassword(account,val){
    return this.httpService.post(APP_SERVE_URL+'ChildAccounts/ForgetPassword',{
    phoneMob :account,
		password :val.verify
    }).map((res: Response) =>  res.json());
  }
   //获取图片验证码
   getPicVerify(text){
		return this.httpService.get(APP_SERVE_URL+'Start/VerifyCode?phoneMob='+text).map((res: Response) =>  res.json());
  }
  //是否需要图片验证码
  // getVerifyNeed(){
  //   return this.httpService.get(APP_SERVE_URL+'Start/IsNeedVerifyCode').map((res: Response) =>  res.json());
  // }
}
