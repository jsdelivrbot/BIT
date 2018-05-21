import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,Events } from 'ionic-angular';
import { GlobalData } from "../../../../providers/GlobalData";

@Component({
	selector: 'page-feedBack',
	templateUrl: 'feedBack.html',
})
export class FeedBackPage {
    private textcont1:string;
    private textcont2:string;
    private textcont3:string;
    private textarea:boolean=false;
	constructor(
		private navCtrl: NavController, 
		private globalData: GlobalData,
		private events: Events,
		private alertCtrl: AlertController,
		private navParams: NavParams) {
         setTimeout(()=>{
            this.textarea=true;
         },100)
    }
    //提交
    sub(){
        if(this.textcont1&&this.textcont2&&this.textcont3){
            console.log(this.textcont1,this.textcont2,this.textcont3)
        }else{
            this.alertCtrl.create({
                title: '请填写完整后提交',
                subTitle: '',
                buttons: [{text: '确定'}]
              }).present();
        }
    }
}
