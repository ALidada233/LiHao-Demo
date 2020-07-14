export const formatDateTime=(timeStamp,type)=> {
	var date = new Date(); 
	 date.setTime(timeStamp); 
	 var y = date.getFullYear();
	 var m = date.getMonth() + 1;
	 m = m < 10 ? ('0' + m) : m;
	 var d = date.getDate();
	 d = d < 10 ? ('0' + d) : d;
	 var h = date.getHours();
	 h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	if(type==1){
		return y + '-' + m + '-' + d+" "+h+":"+minute+":"+second;
	}else if(type==2){
		return y
	}else{
		return y + '-' + m + '-' + d;
	}
}
export const  formatTime=(time, option)=>{
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}