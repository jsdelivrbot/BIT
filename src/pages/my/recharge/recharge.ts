import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
	selector: 'page-recharge',
	templateUrl: 'recharge.html',
})
export class RechargePage {
	passwordForm: any;
	private pay_type:string='zhifubao';
	private moneyamount:number=100;
	//屏幕分辨比
	public dpr:string=sessionStorage.dpr;
	constructor(private navCtrl: NavController, private navParams: NavParams,private formBuilder: FormBuilder,) {
		// this.passwordForm = this.formBuilder.group({
		// 	oldpassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20)]],// 第一个参数是默认值, Validators.minLength(4)
		// 	newpassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
		// 	confirmpassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
    	// });
	}

	ionViewDidLoad() {
	}
	//选择金额数值
	moneyAmount(val){
		this.moneyamount=val;
	}
	test(){
		console.log(this.pay_type)
	}
}
