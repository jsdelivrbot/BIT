import {Injectable} from '@angular/core';
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {HttpService} from "../../providers/HttpService";
import { APP_SERVE_URL } from "../../providers/Constants";
@Injectable()
export class TradeService {
    constructor(public httpService: HttpService) {
    }
    //获取内外盘期货列表
	getFutures(type){
		return this.httpService.get(APP_SERVE_URL+'Futureses?type='+type).map((res: Response) =>  res.json());
    }
    //获取蜡烛图历史行情
    getCandle(futuresCode,endTime,minute,way){
        return this.httpService.get(APP_SERVE_URL+'Futureses/Market?futuresCode='+futuresCode+'&endTime='+endTime+'&minute='+minute+'&way='+way).map((res: Response) =>  res.json());
    }
    //获取内外盘期货列表
	getTime(futuresCode){
		return this.httpService.get(APP_SERVE_URL+'Futureses/MarketTime?futuresCode='+futuresCode).map((res: Response) =>  res.json());
    }
    //获取下单初始化信息
    getPurchaseInfo(accountId,futuresCode){
        return this.httpService.get(APP_SERVE_URL+'Futureses/Position?accountId='+accountId+'&futuresCode='+futuresCode).map((res: Response) =>  res.json());
    }
}