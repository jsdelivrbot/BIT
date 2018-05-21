import {Injectable} from '@angular/core';
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {HttpService} from "../../providers/HttpService";
import { APP_SERVE_URL } from "../../providers/Constants";
@Injectable()
export class HomeService {
  constructor(public httpService: HttpService) {
	}
	//获取期货列表
	getFutures(){
		return this.httpService.get(APP_SERVE_URL+'Futureses/Recommend').map((res: Response) =>  res.json());
	}
	//获取轮播图
	getBanner(){
		return this.httpService.get(APP_SERVE_URL+'Banners').map((res: Response) =>  res.json());
	}
	//获取文本资源
	getText(id){
		return this.httpService.get(APP_SERVE_URL+'NoviceCourses?id='+id).map((res: Response) =>  res.json());
	}
	//获取资讯
	getNews(){
		return this.httpService.get(APP_SERVE_URL+'Newses/HotNews').map((res: Response) =>  res.json());
	}
	//获取新手学堂列表
	getNoviceList(){
		return this.httpService.get(APP_SERVE_URL+'NoviceCourses').map((res: Response) =>  res.json());
	}
}
