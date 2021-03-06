import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'yuanFormat'
})
export class YuanFormatPipe implements PipeTransform {
	transform(value: any, dot:number,noUnit:boolean): any {
		if(value&&value!="--") {
			dot = dot > 0 && dot <= 20 ? dot : 2; 
			value = parseFloat((value + "").replace(/[^\d\.-]/g, "")).toFixed(dot) + ""; 
			let l = value.split(".")[0].split("").reverse(), r = value.split(".")[1]; 
			let t = ""; 
			for (let i = 0; i < l.length; i++) { 
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
			} 
			return noUnit?t.split("").reverse().join("") + "." + r:"￥"+t.split("").reverse().join("") + "." + r; 
		} else {
			if (value==0) {
				return noUnit?"0.00":"￥0.00"
			}else{
				return "--"
			}
		}
	}
}