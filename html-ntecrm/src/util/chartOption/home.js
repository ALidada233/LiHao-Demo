//optionOne(客户数据分析)
//optionTwo(客户区域分析)
//optionThree(报价&订单数据分析)

import router from '../../router/index';

export const optionOne={
	credits:{
		enabled:false
	},
	// chart: {
	// 	type: 'column'
	// },
	title: {
		text: ''
	},
	subtitle: {
		// text: '数据截止 2017-03，来源: <a href="https://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
	},
	xAxis: {
		categories: [

		],
		crosshair: true
	},
	yAxis: {
		min: 0,
		title: {
			text: '客户数'
		}
	},
	legend: {
		enabled: false
	},
	tooltip: {
		pointFormat: '客户数: <b>{point.y:.f} 个</b>'
	},
	plotOptions: {
		column: {
			colorByPoint:true
		}
	},
	series: [{
		name: '客户数',
		data: [
			  // ['上海', 24],
		],
		dataLabels: {
			enabled: false,
			rotation: 0,
			color: '#FFFFFF',
			align: 'right',
			format: '{point.y:f}', // :.1f 为保留 1 位小数
			y: 10
		}
	}]
}
export const optionTwo = {
 	credits:{
	enabled:false
	},
	colors: ['#91e8e1','#779ABE','#CBB03C','#A03B8E','#8085e9','#e4d354', '#8085e8', '#8d4653',  '#f15c80','#3F556A','#5E5781',
	'#1C6954','#415852','#A7A967','#343607','#B45A10'], 
	chart: {
		type: 'column'
	},
	title: {
		text: ''
	},
	subtitle: {
	},
	xAxis: {
		categories: [

		],
		crosshair: true
	},
	yAxis: {
		min: 0,
		title: {
			text: '生效订单数'
		}
	},
	legend: {
		enabled: false
	},
	tooltip: {
			headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			'<td style="padding:0"><b>{point.y:f} 个</b></td></tr>',
			footerFormat: '</table>',
			shared: true,
			useHTML: true
	},
	plotOptions: {
		column: {
			colorByPoint:true
		}
	},
	series: [{
		name: '订单数',
		data: [],
		dataLabels: {
			enabled: false,
			rotation: 0,
			color: '#FFFFFF',
			align: 'right',
			format: '{point.y:f}', // :.1f 为保留 1 位小数
			y: 10
		}
	}]
}
export const optionThree = {
	credits:{
		enabled:false
	},
 	chart: {
		plotBackgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		type: 'pie',
		height:400
	},
	title: {
		text: ''
	},
	tooltip: {
		// pointFormat: '{series.name}: <b>{series.y}{point.percentage:.1f}%</b>',
		enabled:true,
		formatter: function() {
        //this 为当前的点（扇区）对象，可以通过  console.log(this) 来查看详细信息
       //console.log(this.points);
        return '<span style="color: ' + this.point.color + '">'+'类别：'+this.point.name+' 个数：' 
            + this.y + '，占比<br>' + this.percentage.toFixed(2) + '%</span>';
      }
	},
	plotOptions: {
		 pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                color: '#000000',
                connectorColor: '#000000',
                formatter: function() {
                    //Highcharts.numberFormat(this.percentage,2)格式化数字，保留2位精度
                    return '<b>'+ this.point.name +' 个数: '+this.point.y+' </b> '+Highcharts.numberFormat(this.percentage,2) +' %';
                }
            }
        }
	},
	series: [{
		name: 'Brands',
		colorByPoint: true,
		data: [
		
		]
	}]
}
export const optionFour={
		credits:{
		enabled:false
	},
 	chart: {
		plotBackgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		type: 'pie',
		height:400
	},
	title: {
		text: ''
	},
	tooltip: {
		// pointFormat: '{series.name}: <b>{series.y}{point.percentage:.1f}%</b>',
		enabled:true,
		formatter: function() {
        //this 为当前的点（扇区）对象，可以通过  console.log(this) 来查看详细信息
       //console.log(this.points);
        return '<span style="color: ' + this.point.color + '">'+'品牌：'+this.point.name+' 个数：' 
            + this.y + '，占比<br>' + this.percentage.toFixed(2) + '%</span>';
      }
	},
	plotOptions: {
		 pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                color: '#000000',
                connectorColor: '#000000',
                formatter: function() {
                    //Highcharts.numberFormat(this.percentage,2)格式化数字，保留2位精度
                    return '<b>'+ this.point.name +' 个数:'+this.point.y+' </b> '+Highcharts.numberFormat(this.percentage,2) +' %';
                }
            }
        }
	},
	series: [{
		name: 'Brands',
		colorByPoint: true,
		data: [
		
		]
	}]
}
export const optionFive = {
	credits:{
		enabled:false
	},
	chart: {
		type: 'column'
	},
	colors: ['#f7a35c','#f45b5b','#f45b5b', '#90ed7d', '#8d4653', '#91e8e1','#779ABE','#CBB03C','#A03B8E','#8085e9', '#f15c80','#3F556A','#5E5781',
	'#1C6954','#415852','#A7A967','#343607','#B45A10'], 
	title: {
		text: '销售排行榜'
	},
	xAxis: {
		categories: [
			
		],
		crosshair: true
	},
	yAxis: {
		min: 0,
		title: {
			text: '(￥)金额'
		}
	},
	tooltip: {
		headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		'<td style="padding:0"><b>￥{point.y:.1f}</b></td></tr>',
		footerFormat: '</table>',
		shared: true,
		useHTML: true
	},
	plotOptions: {
		column: {
			borderWidth: 0
		},
		series: {
			cursor: 'pointer',
			events: {
			 click: function(e) {
				 //colorIndex==0累计订单 ==1 生效订单
				console.log(e.point.colorIndex);
				var homeSelTime=JSON.parse(sessionStorage.getItem('homeSelTime')) ;
				var saleList=JSON.parse(sessionStorage.getItem('saleList'));
				var selSale=saleList.filter(item=>{
					return item.name== e.point.category
				})
				if(e.point.colorIndex==0){
					router.push({path:'/admin/order',query:{createTimeStart:homeSelTime.timeStart,createTimeEnd:homeSelTime.timeEnd,saleId:selSale[0].id,linkStatus:1}})
				}else{
					router.push({path:'/admin/order',query:{createTimeStart:homeSelTime.timeStart,createTimeEnd:homeSelTime.timeEnd,saleId:selSale[0].id,linkStatus:2}})
				}
			
			 }
			}
		}
	},
	series: [
		{
			name: '累计订单金额',
			data: [600, 500]
		}, {
			name: '生效订单金额',
			data: [1000, 800]
		}
	]
}
export const optionSix = {
	credits:{
		enabled:false
	},
	// chart: {
	// 	type: 'column'
	// },
	colors: ['#8085e9','#f7a35c','#f45b5b','#f45b5b', '#90ed7d', '#8d4653', '#91e8e1','#779ABE','#CBB03C','#A03B8E','#8085e9', '#f15c80','#3F556A','#5E5781',
	'#1C6954','#415852','#A7A967','#343607','#B45A10'], 
	title: {
		text: '报价排行榜'
	},
	xAxis: {
		categories: [
			
		],
		crosshair: true
	},
	yAxis: {
		min: 0,
		title: {
			text: '(￥)金额'
		}
	},
	tooltip: {
		headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		'<td style="padding:0"><b>￥{point.y:.1f}</b></td></tr>',
		footerFormat: '</table>',
		shared: true,
		useHTML: true
	},
	plotOptions: {
		column: {
			borderWidth: 0
		},
		series: {
			cursor: 'pointer',
			events: {
			 click: function(e) {
				var homeSelTime=JSON.parse(sessionStorage.getItem('homeSelTime')) ;
				var saleList=JSON.parse(sessionStorage.getItem('saleList'));
				var selSale=saleList.filter(item=>{
					return item.name== e.point.category
				})
				router.push({path:'/admin/offerList',query:{createTimeStart:homeSelTime.timeStart,createTimeEnd:homeSelTime.timeEnd,saleId:selSale[0].id}})
			 }
			}
		}
	},
	series: [
		{
			name: '累计报价金额',
			data: []
		}
	]
}
export const optionSeven = {
	credits:{
		enabled:false
	},
	chart: {
		type: 'column'
	},
	colors: ['#90ed7d','#91e8e1','#f45b5b', '#90ed7d', '#8d4653', '#91e8e1','#779ABE','#CBB03C','#A03B8E','#8085e9', '#f15c80','#3F556A','#5E5781',
	'#1C6954','#415852','#A7A967','#343607','#B45A10'], 
	title: {
		text: '新增客户排行榜'
	},
	xAxis: {
		categories: [
			
		],
		crosshair: true
	},
	yAxis: {
		min: 0,
		title: {
			text: '数量(个)'
		}
	},
	tooltip: {
		headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		'<td style="padding:0"><b>{point.y:.1f} 个</b></td></tr>',
		footerFormat: '</table>',
		shared: true,
		useHTML: true
	},
	plotOptions: {
		column: {
			borderWidth: 0
		},
		series: {
			cursor: 'pointer',
			events: {
			 click: function(e) {
				var homeSelTime=JSON.parse(sessionStorage.getItem('homeSelTime')) ;
				var saleList=JSON.parse(sessionStorage.getItem('saleList'));
				var selSale=saleList.filter(item=>{
					return item.name== e.point.category
				})
				router.push({path:'/admin/customer',query:{createTimeStart:homeSelTime.timeStart,createTimeEnd:homeSelTime.timeEnd,saleId:selSale[0].id}})
			 }
			}
		}
	},
	series: [{
		name: '客户数量',
		data: [600, 500]
	}]
}

