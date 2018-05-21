import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController} from 'ionic-angular';
@Component({
	selector: 'page-delegation',
	templateUrl: 'delegation.html',
})
export class DelegationPage {
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private alertCtrl: AlertController
	) {
	}
	ionViewDidLoad(){
	}
	//设置止盈止损
	undo(){
        this.alertCtrl.create({
            message: '确定要撤单吗？',
            buttons: [
              {
                text: '取消',
                handler: () => {
                  console.log('取消');
                }
              },
              {
                text: '确定',
                handler: () => {
                  console.log('确定');
                }
              }
            ]
          }).present();
	}
}