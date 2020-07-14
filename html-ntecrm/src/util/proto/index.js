import Vue from 'vue'
//去掉输入框前后端空格
Vue.prototype.Vtrim=(v)=>{
  return v.replace(/(^\s*)|(\s*$)/g,"");
}
//去掉输入框特殊字符
Vue.prototype.VrChars=(v)=>{
  
}
//去掉空格特殊字符
Vue.prototype.VrSpciChars=(v)=>{
  
}
//加
Vue.prototype.plus=(num1, num2)=>{
  const num1Digits = (num1.toString().split('.')[1] || '').length
  const num2Digits = (num2.toString().split('.')[1] || '').length
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits))
   return (times(num1, baseNum) + times(num2, baseNum)) / baseNum
}
//减
Vue.prototype.minus = (num1, num2) => {
  const num1Digits = (num1.toString().split('.')[1] || '').length
  const num2Digits = (num2.toString().split('.')[1] || '').length
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits))
  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum
}
//乘
Vue.prototype.times=(num1, num2)=>{
  const num1String = num1.toString()
  const num2String = num2.toString()
  const num1Digits = (num1String.split('.')[1] || '').length
  const num2Digits = (num2String.split('.')[1] || '').length
  const baseNum =  Math.pow(10, num1Digits + num2Digits)
  return Number(num1String.replace('.', '')) * Number(num2String.replace('.', '')) / baseNum
}
//除
Vue.prototype.divide=(num1, num2)=>{
  const num1String = num1.toString()
  const num2String = num2.toString()
  const num1Digits = (num1String.split('.')[1] || '').length
  const num2Digits = (num2String.split('.')[1] || '').length
  const baseNum =  Math.pow(10, num1Digits + num2Digits)
  return Number(num1String.replace('.', '')) / Number(num2String.replace('.', '')) / baseNum
}

//过滤器
Vue.filter('trims',function(v){
  v.replace(/(^\s*)|(\s*$)/g,"");
});