import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController,Events} from 'ionic-angular';
@Component({
	selector: 'page-positions',
	templateUrl: 'positions.html',
})
export class PositionsPage {
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private events: Events,
		private alertCtrl: AlertController
	) {
		events.subscribe('setPrice',(val)=>{
			if(val){
				console.log(val)
			}
		})
	}
	ionViewDidLoad(){
		
	}
	//设置止盈止损
	setDetail(val){
		this.events.publish('modalMock',{
			modal:val
		})
	}
}