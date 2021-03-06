import {Injectable} from '@angular/core';
import { CookieService } from 'ng2-cookies'
import { MyHttp } from '../myHttp/myhttp.service'

@Injectable()
export class AuthRoleService {
	// role:string="mem";
	// role:string;
	eTime:number

	sysName="crm_"

	constructor(
		private cookie:CookieService,
		private myhttp:MyHttp
		){

		this.init()
		

		//监听window刷新事件
		//

	}

	//设置cookie
	setCookie(key,value){
		this.cookie.set(this.sysName+key,value,this.eTime,'/')
	}

	role
	subsysFuncs
	userName
	employeeId
	token


	//初始化内存中的变量
	init(){
		this.role=this.cookie.get(this.sysName+'role')
		this.subsysFuncs=this.cookie.get(this.sysName+'subsysFuncs')
		this.userName=this.cookie.get(this.sysName+'userName')
		this.employeeId=this.cookie.get(this.sysName+'employeeId')
		this.token=this.cookie.get(this.sysName+'token')
	}
	//清空内存中的这几个变量
	clear(){
		this.role=""
		this.subsysFuncs=""
		this.userName=""
		this.employeeId=""
		this.token=""
	}
	
	// set role(type:string){
		

	// 	this.cookie.set(this.sysName+'role',type,this.eTime,'/')
	// }

	// get role(){
	// 	return this.cookie.get(this.sysName+'role')
	// }

	// set subsysFuncs(type:string){
	// 	this.cookie.set(this.sysName+'subsysFuncs',type,this.eTime,'/')
	// }

	// get subsysFuncs(){
	// 	return this.cookie.get(this.sysName+'subsysFuncs')
	// }

	// set userName(name:string){
	// 	this.cookie.set(this.sysName+'userName',name,this.eTime,'/')
	// }

	// get userName(){
	// 	return this.cookie.get(this.sysName+'userName')
	// }

	// set employeeId(name:string){
	// 	this.cookie.set(this.sysName+'employeeId',name,this.eTime,'/')
	// }

	// get employeeId(){
	// 	return this.cookie.get(this.sysName+'employeeId')
	// }
	
	// set token(token:string){
	// 	this.cookie.set(this.sysName+"token",token,this.eTime,'/');
	// }

	// get token():string{
	// 	return this.cookie.get(this.sysName+"token");
	// }

	fnIn(param:string[]):boolean{
    for(let o of param){
      if(this.subsysFuncs.indexOf(o)>=0){
        return true;
      }
    }
    return false;
  }

  fnRequire(param:string[]|string):boolean{
    if(param instanceof Array) {
      for (let o of param) {
        if (this.subsysFuncs.indexOf(o) === -1) {
          return false;
        }
      }
    }else if(typeof param==='string'){
      if (this.subsysFuncs.indexOf(param) === -1) {
        return false;
      }
    }
    return true;
  }

  roleIn(param:string[]):boolean{
    for(let o of param){
      if(this.role.indexOf(o)>=0){
        return true;
      }
    }
    return false;
  }

  roleRequire(param:string[]|string):boolean{
    if(param instanceof Array) {
      for(let o of param){
        if(this.role.indexOf(o)===-1){
          return false;
        }
      }
    }else if(typeof param==='string'){
      if (this.role.indexOf(param) === -1) {
        return false;
      }
    }
    return true;
  }

	refreshToken(){

		if (this.token) {
			// code...
			this.myhttp.post({
			url:this.myhttp.api.loginHost+this.myhttp.api.refreshToken.url,
			body:{
				accessToken:this.token
			}
			}).toPromise()
		  	  .then(res=>{
		  	  	let data=res.json()

		  	  	this.token=data.body.accessToken
		  	})
		}
		
		
	}



	deleteAllCookies(){
		this.cookie.set(this.sysName+'role','',1,'/')
		this.cookie.set(this.sysName+'userName','',1,'/')
		this.cookie.set(this.sysName+'token','',1,'/')
		this.cookie.set(this.sysName+'subsysFuncs','',1,'/')
		this.cookie.set(this.sysName+'employeeId','',1,'/')
		

		// this.cookie.deleteAll('','/')
		console.log("cookies",document.cookie)
	}

} 