//参数el(十六进制码)，t(设置透明度)
 var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/; 
 export const colorRgba=(el,t)=>{
    var sColor = el.toLowerCase();  
    if(sColor && reg.test(sColor)){  
        if(sColor.length === 4){  
            var sColorNew = "#";  
            for(var i=1; i<4; i+=1){  
                sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));     
            }  
            sColor = sColorNew;  
        }  
        //处理六位的颜色值  
        var sColorChange = [];  
        for(var i=1; i<7; i+=2){  
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));    
        }  
       //或 return "rgb(" + sColorChange.join(",") + ")"; 
 
        return "rgba(" + sColorChange.join(",") + ","+t+")"; 
    }else{  
        return sColor;    
    }
}  

