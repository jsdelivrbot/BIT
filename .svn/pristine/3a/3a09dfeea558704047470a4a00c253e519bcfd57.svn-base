/**
 * Created by siyongkang. 2017/6/22
 */
import {Injectable} from '@angular/core';
@Injectable()
export class GlobalData {

  private _userId: string;//用户id
  private _account: string;//账户名
  private _childAccountNo : number;//子账户名
  private _nickname: string;//昵称
  private _token: string;//token
  private _portrait: string;//头像
  private _avatarId : string;//头像id
  private _avatarPath : string;//头像path
  
  private _refreshToken: string;//刷新token

  private _funds: number;//账户余额
  private _authState: boolean;//实名认证状态
  private _isMentionPassword: boolean;//是否设置提现密码 
  private _isBankCard: boolean;//是否绑定银行卡

  //设置http请求是否显示loading,注意:设置为false,接下来的请求会不显示loading,请求执行完成会自动设置为true
  private _showLoading: boolean = true;

  //app更新进度.默认为0,在app升级过程中会改变
  private _updateProgress: number = -1;

  get funds(): number {
    return this._funds;
  }

  set funds(value: number) {
    this._funds = value;
  }
  get avatarId(): string {
    return this._avatarId;
  }

  set avatarId(value: string) {
    this._avatarId = value;
  }
  get avatarPath(): string {
    return this._avatarPath;
  }

  set avatarPath(value: string) {
    this._avatarPath = value;
  }
  get refreshToken(): string {
    return this._refreshToken;
  }
  set refreshToken(value: string) {
    this._refreshToken = value;
  }
  get childAccountNo(): number {
    return this._childAccountNo;
  }
  set childAccountNo(value: number) {
    this._childAccountNo = value;
  }
  get authState(): boolean {
    return this._authState;
  }

  set authState(value: boolean) {
    this._authState = value;
  }
  get isMentionPassword(): boolean {
    return this._isMentionPassword;
  }

  set isMentionPassword(value: boolean) {
    this._isMentionPassword = value;
  }
  get isBankCard(): boolean {
    return this._isBankCard;
  }

  set isBankCard(value: boolean) {
    this._isBankCard = value;
  }


  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  get account(): string {
    return this._account;
  }

  set account(value: string) {
    this._account = value;
  }

  get nickname(): string {
    return this._nickname;
  }

  set nickname(value: string) {
    this._nickname = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get showLoading(): boolean {
    return this._showLoading;
  }

  set showLoading(value: boolean) {
    this._showLoading = value;
  }

  get updateProgress(): number {
    return this._updateProgress;
  }

  set updateProgress(value: number) {
    this._updateProgress = value;
  }

  get portrait(): string {
    return this._portrait;
  }

  set portrait(value: string) {
    this._portrait = value;
  }
}
