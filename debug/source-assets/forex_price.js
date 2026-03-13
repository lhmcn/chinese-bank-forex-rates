$(function () {
	if (!Object.values) {
		Object.values = function(obj) {
		  var values = [];
		  for (var key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
			  values.push(obj[key]);
			}
		  }
		  return values;
		};
	  }
		var DataBasket = function (template) {
			this.template = template;
			this.space = {};
			this.defaultSort = [];
		}
		DataBasket.prototype.put = function (spaceKey) {
			if (!this.space[spaceKey]) {
				this.defaultSort.push(spaceKey);
				this.space[spaceKey] = [];
			}
			var newData = { keyName: spaceKey };
			this.space[spaceKey].push(newData);
			return newData;
		}
		DataBasket.prototype.transform = function (sort, filter) {
			var space = this.space;
			sort = sort || this.defaultSort;
			var template = this.template;
			var htmlString = "";
			for (var i = 0, len = sort.length; i < len; i++) {
				var dataList = space[sort[i]];
				if (!dataList || filter && filter(i, dataList)) continue;
				for (var j = 0, jlen = dataList.length; j < jlen; j++) {
					var data = dataList[j];
					data && (htmlString += template.replace(/{{(.+?)}}/ig, function (match, $1) {
						return data[$1] || "";
					}))
				}
			}
			return htmlString;
		}
		
		var currencyMap = { "840": { name: '美元', img: '840.png'}, "978": { name: '欧元', img: '978.png' }, "826": { name: '英镑', img: '826.png' }, "392": { name: '日元', img: '392.png'}, "344": { name: '港币', img: '344.png' }, "036": { name: '澳大利亚元', img: '036.png' }, "124": { name: '加拿大元', img: '124.png' }, "756": { name: '瑞士法郎', img: '756.png' }, "702": { name: '新加坡元', img: '702.png' }, "208": { name: '丹麦克朗', img: '208.png' }, "578": { name: '挪威克朗', img: '578.png' }, "752": { name: '瑞典克朗', img: '752.png' }, "410": { name: '韩元', img: '410.png'}, "554": { name: '新西兰元', img: '554.png' }, "446": { name: '澳门元', img: '446.png' }, "710": { name: '南非兰特', img: '710.png' }, "764": { name: '泰铢', img: '764.png'}, "458": { name: '马来西亚林吉特', img: '458.png' }, "643": { name: '俄罗斯卢布', img: '643.png' }, "398": { name: "哈萨克斯坦坚戈", img: "398.png"},"784": { name: "阿联酋迪拉姆", img: "784.png" },"682": { name: "沙特里亚尔", img: "682.png" },"348": { name: "匈牙利福林", img: "348.png"},"484": { name: "墨西哥比索", img: "484.png" },"985": { name: "波兰兹罗提", img: "985.png" },"949": { name: "土耳其里拉", img: "949.png" },"203": { name: "捷克克朗", img: "203.png",},"376": { name: "以色列新谢客尔", img: "376.png" },"496": { name: "蒙古图格里克", img: "496.png"},"586": { name: "巴基斯坦卢比", img: "586.png" },"360": { name: "印尼卢比", img: "360.png",} };
		var jsh_sort = ['美元', '欧元', '英镑', '日元', '港币', '澳大利亚元', '加拿大元', '瑞士法郎', "澳门元",'新加坡元', '韩元', "新西兰元", '丹麦克朗', '瑞典克朗', '挪威克朗', "泰铢",
		"俄罗斯卢布","哈萨克斯坦坚戈","南非兰特","阿联酋迪拉姆","沙特里亚尔","匈牙利福林","墨西哥比索","波兰兹罗提","土耳其里拉","捷克克朗","以色列新谢客尔","蒙古图格里克"
		// ,"马来西亚林吉特","巴基斯坦卢比","印尼卢比"
		/*, '未知'*/];
		var jsh_sort_dg = ['美元', '欧元', '英镑', '日元', '港币', '澳大利亚元', '加拿大元', '瑞士法郎', "澳门元",'新加坡元', '韩元', "新西兰元", '丹麦克朗', '瑞典克朗', '挪威克朗', "泰铢",
		"俄罗斯卢布","哈萨克斯坦坚戈","南非兰特","阿联酋迪拉姆","沙特里亚尔","匈牙利福林","墨西哥比索","波兰兹罗提","土耳其里拉","捷克克朗","以色列新谢客尔","蒙古图格里克","马来西亚林吉特"
		,"巴基斯坦卢比","印尼卢比"
		/*, '未知'*/];
		

		var wh_sort = ['欧元/美元', '英镑/美元','美元/日元','美元/港币',  '澳大利亚元/美元','美元/加拿大元', '美元/瑞士法郎', "美元/澳门元",  '美元/新加坡元','美元/韩元',  "新西兰元/美元","美元/丹麦克朗", "美元/瑞典克朗", "美元/挪威克朗", "美元/泰铢","美元/俄罗斯卢布", "美元/哈萨克斯坦坚戈","美元/南非兰特", "美元/阿联酋迪拉姆","美元/沙特里亚尔", "美元/匈牙利福林","美元/墨西哥比索","美元/波兰兹罗提","美元/土耳其里拉","美元/捷克克朗","美元/以色列新谢客尔","美元/蒙古图格里克"
		// ,"美元/马来西亚林吉特","美元/巴基斯坦卢比","美元/印尼卢比",
		/*, '未知'*/];
		var wh_sort_dg = ['欧元/美元', '英镑/美元','美元/日元','美元/港币',  '澳大利亚元/美元','美元/加拿大元', '美元/瑞士法郎', "美元/澳门元",  '美元/新加坡元','美元/韩元',  "新西兰元/美元","美元/丹麦克朗", "美元/瑞典克朗", "美元/挪威克朗", "美元/泰铢","美元/俄罗斯卢布", "美元/哈萨克斯坦坚戈","美元/南非兰特", "美元/阿联酋迪拉姆","美元/沙特里亚尔", "美元/匈牙利福林","美元/墨西哥比索","美元/波兰兹罗提","美元/土耳其里拉","美元/捷克克朗","美元/以色列新谢客尔","美元/蒙古图格里克","美元/马来西亚林吉特",
		"美元/巴基斯坦卢比","美元/印尼卢比",
		/*, '未知'*/];
		
		var ckjp_sort = ['美元','欧元','日元','港币','英镑','澳大利亚元','瑞士法郎','加拿大元','新加坡元','丹麦克朗','瑞典克朗','挪威克朗','南非兰特','新西兰元','韩元'];
		var group_code_map_CN = {
			'USD/CNY':'美元',    
			'EUR/CNY':'欧元',        
			'GBP/CNY':'英镑',
			'JPY/CNY':'日元',
			'HKD/CNY':'港币',
			'AUD/CNY':'澳大利亚元',
			'CAD/CNY':'加拿大元',
			'CHF/CNY':'瑞士法郎',
			'MOP/CNY':'澳门元',
			'SGD/CNY':'新加坡元',
			'KRW/CNY':'韩元',
			'NZD/CNY':'新西兰元',
			'DKK/CNY':'丹麦克朗',
			'SEK/CNY':'瑞典克朗',
			'NOK/CNY':'挪威克朗',
			'CNY/THB':'泰铢',
			'CNY/RUB':'俄罗斯卢布',
			'CNY/KZT':'哈萨克斯坦坚戈',
			'ZAR/CNY':'南非兰特',
			'CNY/ZAR':'南非兰特',
			'CNY/AED':'阿联酋迪拉姆',
			'CNY/SAR':'沙特里亚尔',
			'CNY/HUF':'匈牙利福林',
			'CNY/MXN':'墨西哥比索',
			'CNY/PLN':'波兰兹罗提',
			'CNY/TRY':'土耳其里拉',
			'CNY/CZK':'捷克克朗',
			'CNY/ILS':'以色列新谢客尔',
			'CNY/MNT':'蒙古图格里克',
			'CNY/MYR':'马来西亚林吉特',
			'CNY/PKR':'巴基斯坦卢比',
			'CNY/IDR':'印尼卢比',
		}
		var group_code_map_HW = {
			'EUR/USD':'欧元/美元',        
			'GBP/USD':'英镑/美元',
			'USD/JPY':'美元/日元',
			'USD/HKD':'美元/港币',
			'AUD/USD':'澳大利亚元/美元',
			'USD/CAD':'美元/加拿大元',
			'USD/CHF':'美元/瑞士法郎',
			'USD/MOP':'美元/澳门元',
			'USD/SGD':'美元/新加坡元',
			'USD/KRW':'美元/韩元',
			'NZD/USD':'新西兰元/美元',
			'USD/DKK':'美元/丹麦克朗',
			'USD/SEK':'美元/瑞典克朗',
			'USD/NOK':'美元/挪威克朗',
			'USD/THB':'美元/泰铢',
			'USD/RUB':'美元/俄罗斯卢布',
			'USD/KZT':'美元/哈萨克斯坦坚戈',
			'USD/ZAR':'美元/南非兰特',
			'USD/AED':'美元/阿联酋迪拉姆',
			'USD/SAR':'美元/沙特里亚尔',
			'USD/HUF':'美元/匈牙利福林',
			'USD/MXN':'美元/墨西哥比索',
			'USD/PLN':'美元/波兰兹罗提',
			'USD/TRY':'美元/土耳其里拉',
			'USD/CZK':'美元/捷克克朗',
			'USD/ILS':'美元/以色列新谢客尔',
			'USD/MNT':'美元/蒙古图格里克',
			'USD/MYR':'美元/马来西亚林吉特',
			'USD/PKR':'美元/巴基斯坦卢比',
			'USD/IDR':'美元/印尼卢比',
		}
		var his_code_sort = ['code36','code37','code05','code06','code07','code08','code09','code12','code15','code18','code20','code22','code23','code24','code25']
		var his_data = {
			space1:{},
			space2:{},
			space3:{},
			space4:{},
			space5:{},
			space6:{},
			space7:{},
			space8:{},
			space9:{},
			space10:{},
			space11:{},
			space12:{},
			space13:{},
			space14:{},
			space15:{},
			space16:{},
			space17:{},
			space18:{},
			space19:{},
			space20:{},
			space21:{},
			space22:{},
			space23:{},
			space24:{},
			space25:{},
			space26:{},
			space27:{},
			space28:{},
			space29:{},
			space30:{},
			totalPage:'',
			totalRec:'',
		}
		// var jsyh_his_map = {
		// 	'spot':'即期',
		// 	'TOD':'今天',
		// 	'TOM':'今月',
		// 	'1D':'一天',
		// 	'1W':'七天',
		// 	'2W':'两周',
		// 	'3W':'三周',
		// 	'1M':'一个月',
		// 	'2M':'两个月',
		// 	'3M':'三个月',
		// 	'4M':'四个月',
		// 	'5M':'五个月',
		// 	'6M':'六个月',
		// 	'7M':'七个月',
		// 	'8M':'八个月',
		// 	'9M':'九个月',
		// 	'10M':'十个月',
		// 	'11M':'十一个月',
		// 	'12M':'十二个月',
		// 	'15M':'十五个月',
		// 	'18M':'十八个月',
		// 	'21M':'二十一个月',
		// 	'2Y':'两年',
		// 	'3Y':'三年',
		// 	'4Y':'四年',
		// 	'5Y':'五年',
		// 	}
			// jsyh_his_code
		var jsyh_his_map = {
			'00':{val:'spot',code:'00',name:'即期'},
			'39':{val:'TOD',code:'39',name:'今天'},
			'40':{val:'TOM',code:'40',name:'今月'},
			'36':{val:'1D',code:'36',name:'一天'},
			'37':{val:'1W',code:'37',name:'七天'},
			'05':{val:'2W',code:'05',name:'两周'},
			'06':{val:'3W',code:'06',name:'三周'},
			'07':{val:'1M',code:'07',name:'一个月'},
			'08':{val:'2M',code:'08',name:'两个月'},
			'09':{val:'3M',code:'09',name:'三个月'},
			'10':{val:'4M',code:'10',name:'四个月'},
			'11':{val:'5M',code:'11',name:'五个月'},
			'12':{val:'6M',code:'12',name:'六个月'},
			'13':{val:'7M',code:'13',name:'七个月'},
			'14':{val:'8M',code:'14',name:'八个月'},
			'15':{val:'9M',code:'15',name:'九个月'},
			'16':{val:'10M',code:'16',name:'十个月'},
			'17':{val:'11M',code:'17',name:'十一个月'},
			'18':{val:'12M',code:'18',name:'十二个月'},
			'19':{val:'15M',code:'19',name:'十五个月'},
			'20':{val:'18M',code:'20',name:'十八个月'},
			'21':{val:'21M',code:'21',name:'二十一个月'},
			'22':{val:'2Y',code:'22',name:'两年'},
			'23':{val:'3Y',code:'23',name:'三年'},
			'24':{val:'4Y',code:'24',name:'四年'},
			'25':{val:'5Y',code:'25',name:'五年'},
		}
		var decimalPointMap = {}
		var yqDecimalPointMap = {}
	var dateRegex1 = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
	var dateRegex2 = /^(\d{4})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;
		pointList();
		var htmlTemplate =
			'<ul>\
			<li><span><img src="{{BUY_IN_CURR_IMG}}" alt=""></span>{{BUY_IN_CURR_NAME}}</li>\
			<li class="{{FXR_XCH_BUYIN_color}}">{{FXR_XCH_BUYIN}} {{FXR_XCH_BUYIN_symbol}}</li>\
			<li class="{{FXR_XCH_SELLOUT_color}}">{{FXR_XCH_SELLOUT}} {{FXR_XCH_SELLOUT_symbol}}</li>\
			<li>{{LstPr_Dt}} {{LstPr_Tm}}</li>\
			<li><a target="_blank" {{zst_link}}><i class="icon-chart2"></i></a></li>\
		</ul>';
		var htmlTemplate_Group =
			'<ul>\
			<li><span><img src="{{GROUP_CURR_IMG}}" alt=""></span>{{GROUP_CURR_NAME}}</li>\
			<li class="{{FXR_XCH_BUYIN_color}}">{{FXR_XCH_BUYIN}} {{FXR_XCH_BUYIN_symbol}}</li>\
			<li class="{{FXR_XCH_SELLOUT_color}}">{{FXR_XCH_SELLOUT}} {{FXR_XCH_SELLOUT_symbol}}</li>\
			<li>{{LstPr_Dt}} {{LstPr_Tm}}</li>\
			<li><a target="_blank" {{zst_link}}><i class="icon-chart2"></i></a></li>\
		</ul>';
		if (location.pathname === '/chn/forex/exchange-quotations.shtml') {
			htmlTemplate =
			'<ul>\
				<li> <span><img src="{{SHOW_IMG}}" alt=""></span>{{SHOW_NAME}}</li>\
				<li class="{{FXR_XCH_BUYIN_color}}">{{FXR_XCH_BUYIN}} {{FXR_XCH_BUYIN_symbol}}</li>\
				<li class="{{FXR_XCH_SELLOUT_color}}">{{FXR_XCH_SELLOUT}} {{FXR_XCH_SELLOUT_symbol}}</li>\
				<li>{{LstPr_Dt}} {{LstPr_Tm}}</li>\
				<li><a target="_blank" {{zst_link}}><i class="icon-chart2" {{zst_style}}></i></a></li>\
				<li><a class="button1" target="_blank" {{style}} {{buy_link}}>购汇</a> <a class="button1" target="_blank" {{style}} {{self_link}}>结汇</a></li>\
			</ul>';
			htmlTemplate_Group =
				'<ul>\
				<li><span><img src="{{GROUP_CURR_IMG}}" alt=""></span>{{GROUP_CURR_NAME}}</li>\
				<li class="{{FXR_XCH_BUYIN_color}}">{{FXR_XCH_BUYIN}} {{FXR_XCH_BUYIN_symbol}}</li>\
				<li class="{{FXR_XCH_SELLOUT_color}}">{{FXR_XCH_SELLOUT}} {{FXR_XCH_SELLOUT_symbol}}</li>\
				<li>{{LstPr_Dt}} {{LstPr_Tm}}</li>\
				<li><a target="_blank" {{zst_link}}><i class="icon-chart2"></i></a></li>\
				<li><a target="_blank" {{style}} {{trade_link}} class="button1">外汇买卖</a></li>\
			</ul>';
			var indexTemplate =
				'<ul>\
				<li>{{keyName}}</li>\
				<li>{{NEW_PRICE}}</li>\
				<li class="{{color}}">{{symbol}} {{PCTCHNG}}</li>\
			</ul>';
			getMarketList({
				link: '/cn/home/news/zyzs.xml',
				keyMap: { '道琼斯': '道琼工业', '标准普尔': '标普500' },
				sort: ['美元指数', '道琼工业', '标普500', '恒生指数'],
				template: indexTemplate,
				containner: '#zyzs ul:eq(0)',
				key: 'NAME',
				node: 'ForeignExchangeTrad',
				callback: function (obj) {
					var NETCHNG_1 = obj['NETCHNG_1'];
					obj.color = diff_color(NETCHNG_1);
					obj.symbol = diff_symbol(NETCHNG_1);
					obj['NEW_PRICE'] = Number(obj['NEW_PRICE']).toFixed(2);
					obj['NETCHNG_1'] = Math.abs(NETCHNG_1).toFixed(2);
					obj['PCTCHNG'] = Math.round((obj['PCTCHNG']).replace(/[-%\s]/g, "") * 100) / 100;
				}
			})
			getMarketList({
				link: '/cn/home/news/shhjhq.xml',
				keyMap: { '国际黄金现货': '黄金现货', '国际铂金现货': '铂金现货', '国际钯金现货': '钯金现货', '国际白银现货': '白银现货' },
				sort: ['黄金现货', '铂金现货', '钯金现货', '白银现货'],
				template: indexTemplate,
				containner: '#shhjhq ul:eq(0)',
				key: 'GOLDNAME',
				node: 'ReferencePriceSettlement',
				callback: function (obj) {
					var NETCHNG_1 = +obj['NEW_PRICE'] - +obj['LAST_PRICE'];
					obj.color = diff_color(NETCHNG_1);
					obj.symbol = diff_symbol(NETCHNG_1);
					obj['NEW_PRICE'] = Number(obj['NEW_PRICE']).toFixed(2);
					obj['NETCHNG_1'] = Math.abs(NETCHNG_1).toFixed(2);
					obj['PCTCHNG'] = obj['NETCHNG_1'];
				}
			})
			selectTab();
			ChooseOPtion();
			$(".forex_nav a").removeClass("on").filter(":contains('外汇行情')").addClass("on");
			changePic("#zyzs_pic li:eq(0)");
			changePic("#shhjhq_pic li:eq(0)");
			$("#zyzs_pic,#shhjhq_pic").on('click', 'li', changePic);
			$(".history_check_btn").click(function () {
				$(".appointment_box_js").hide();
				$(".rate_history").show();
			});
		}
		//公司机构——产品服务——金融市场——外汇行情
		if (location.pathname === '/chn/company/gsjgsy/cpfw/jrsc/whxq/index.shtml') {
			htmlTemplate_dg =
				'<ul>\
				<li ><span><img src="{{SHOW_IMG}}" alt=""></span>{{SHOW_NAME}}</li>\
				<li class="{{FXR_XCH_BUYIN_color}}">{{FXR_XCH_BUYIN}} {{FXR_XCH_BUYIN_symbol}}</li>\
				<li class="{{FXR_XCH_SELLOUT_color}}">{{FXR_XCH_SELLOUT}} {{FXR_XCH_SELLOUT_symbol}}</li>\
				<li>{{LstPr_Dt}} {{LstPr_Tm}}</li>\
				<li><a target="_blank" {{zst_link}}><i class="icon-chart2" {{zst_style}}></i></a></li>\
			</ul>';
			// <li><a class="button1" target="_blank" {{style}} {{buy_link}}>购汇</a> <a class="button1" target="_blank" {{style}} {{self_link}}>结汇</a></li>\
			htmlTemplate_Group =
				'<ul>\
			<li><span><img src="{{GROUP_CURR_IMG}}" alt=""></span>{{GROUP_CURR_NAME}}</li>\
				<li class="{{FXR_XCH_BUYIN_color}}">{{FXR_XCH_BUYIN}} {{FXR_XCH_BUYIN_symbol}}</li>\
				<li class="{{FXR_XCH_SELLOUT_color}}">{{FXR_XCH_SELLOUT}} {{FXR_XCH_SELLOUT_symbol}}</li>\
				<li>{{LstPr_Dt}} {{LstPr_Tm}}</li>\
				<li><a target="_blank" {{zst_link}}><i class="icon-chart2" {{zst_style}}></i></a></li>\
			</ul>';
			// <li><a target="_blank" {{style}} {{trade_link}} class="button1">外汇买卖</a></li>\

			htmlTemplage_ckjp ='<ul class="h2">\
			<li style="height: 106px;line-height: 106px;"><span><img src="{{BUY_IN_CURR_IMG}}" alt=""></span>{{BUY_IN_CURR_NAME}}</li>\
			<li><span class="db">买入价</span><span>卖出价<span></li>\
			<li><span class="db">{{FXR_XCH_BUYIN_1W}}</span><span>{{FXR_CUR_SELLOUT_1W}} <span></li>\
			<li><span class="db">{{FXR_XCH_BUYIN_1M}}</span><span>{{FXR_CUR_SELLOUT_1M}} <span></li>\
			<li><span class="db">{{FXR_XCH_BUYIN_3M}}</span><span>{{FXR_CUR_SELLOUT_3M}} <span></li>\
			<li><span class="db">{{FXR_XCH_BUYIN_6M}}</span><span>{{FXR_CUR_SELLOUT_6M}} <span></li>\
			<li><span class="db">{{FXR_XCH_BUYIN_9M}}</span><span>{{FXR_CUR_SELLOUT_9M}} <span></li>\
			<li><span class="db">{{FXR_XCH_BUYIN_12M}}</span><span>{{FXR_CUR_SELLOUT_12M}} <span></li>\
			</ul>'
			htmlTemplage_lsjg =
				'<ul class="template_lsjg">\
				<li><span><img src="{{BUY_IN_CURR_IMG}}" alt=""></span>{{curName}}</li>\
					<li>{{offPr_Dt}}</li>\
					<li>{{his_name}}</li>\
				<li>{{Buy_Fwd_Prc}}</li>\
				<li>{{Sell_Fwd_Prc}} </li>\
			</ul>';
			var indexTemplate =
				'<ul>\
				<li>{{keyName}}</li>\
				<li>{{NEW_PRICE}}</li>\
				<li class="{{color}}">{{symbol}} {{PCTCHNG}}</li>\
			</ul>';
			getMarketList({
				link: '/cn/home/news/zyzs.xml',
				keyMap: { '道琼斯': '道琼工业', '标准普尔': '标普500' },
				sort: ['美元指数', '道琼工业', '标普500', '恒生指数'],
				template: indexTemplate,
				containner: '#zyzs ul:eq(0)',
				key: 'NAME',
				node: 'ForeignExchangeTrad',
				callback: function (obj) {
					var NETCHNG_1 = obj['NETCHNG_1'];
					obj.color = diff_color(NETCHNG_1);
					obj.symbol = diff_symbol(NETCHNG_1);
					obj['NEW_PRICE'] = Number(obj['NEW_PRICE']).toFixed(2);
					obj['NETCHNG_1'] = Math.abs(NETCHNG_1).toFixed(2);
					obj['PCTCHNG'] = Math.round((obj['PCTCHNG']).replace(/[-%\s]/g, "") * 100) / 100;
				}
			})
			getMarketList({
				link: '/cn/home/news/shhjhq.xml',
				keyMap: { '国际黄金现货': '黄金现货', '国际铂金现货': '铂金现货', '国际钯金现货': '钯金现货', '国际白银现货': '白银现货' },
				sort: ['黄金现货', '铂金现货', '钯金现货', '白银现货'],
				template: indexTemplate,
				containner: '#shhjhq ul:eq(0)',
				key: 'GOLDNAME',
				node: 'ReferencePriceSettlement',
				callback: function (obj) {
					var NETCHNG_1 = +obj['NEW_PRICE'] - +obj['LAST_PRICE'];
					obj.color = diff_color(NETCHNG_1);
					obj.symbol = diff_symbol(NETCHNG_1);
					obj['NEW_PRICE'] = Number(obj['NEW_PRICE']).toFixed(2);
					obj['NETCHNG_1'] = Math.abs(NETCHNG_1).toFixed(2);
					obj['PCTCHNG'] = obj['NETCHNG_1'];
				}
			})
			selectTab();
			ChooseOPtion();
			$(".forex_nav a").removeClass("on").filter(":contains('外汇行情')").addClass("on");
			changePic("#zyzs_pic li:eq(0)");
			changePic("#shhjhq_pic li:eq(0)");
			$("#zyzs_pic,#shhjhq_pic").on('click', 'li', changePic);
			$(".history_check_btn").click(function () {
				$(".appointment_box_js").hide();
				$(".rate_history").show();
			});
		}
		intervalGetCurrencyList(2*60*1000);
		if (location.pathname === '/chn/company/gsjgsy/cpfw/jrsc/whxq/index.shtml') {
			
			lsjgList(1)
			$('#jshyq_lsjg .button1').click(lsjgList1)
		}
		function intervalGetCurrencyList(interval) {
			currencyList(jsh_sort, wh_sort);  
			if (location.pathname === '/chn/company/gsjgsy/cpfw/jrsc/whxq/index.shtml') {
				cpkjStageList(ckjp_sort)
			}
			window.cid = setInterval(function () {
				currencyList(jsh_sort, wh_sort);
				if (location.pathname === '/chn/company/gsjgsy/cpfw/jrsc/whxq/index.shtml') {
					cpkjStageList(ckjp_sort)
				}
			}, interval)
		}
		function pointList(){
			$.ajax({
				url: '/cn/home/news/hbdxsw.xml',
				dataType: "xml",
				success: function (ResponseText) {
					$(ResponseText).find('ReferencePriceSettlement').each(function (i, v) {
						var _this = $(this);
						var gourp_name = _this.find('CcyPair_EngShtNm').text();
						decimalPointMap[gourp_name] = _this.find('Spot_ExRt_SnBit').text();
						yqDecimalPointMap[gourp_name] = Number(_this.find('Fwd_Prc_DecDgt_Val').text()) + Number(_this.find('FwdSwapToSpotAdj_Pctg').text())

					})
					// console.log(yqDecimalPointMap)
				}
			})
		}
		function currencyList(jsh_sort, wh_sort) {
			getCurrencyList({
				link: '/cn/home/news/jshckpj_new2.xml',
				isSingle: true,
				sort: jsh_sort,
				template: htmlTemplate,
				containner: '#jshckpj ul:eq(0)',
				imgPath: '/uiFramework/commonResource/zip/cn/cn/forex/v3/images/jsh_guoqi/',
				tempKey: 'jshckpj',
				filter: function (i, v) {
					if (location.pathname === '/chn/forex/indexv3.shtml' && i >= 7) {
						return true;
					}
				},
				callback: function (obj, options) {
				
					/* ~'丹麦克朗|瑞典克朗|挪威克朗|马来西亚林吉特|泰铢|南非兰特|俄罗斯卢布|哈萨克斯坦坚戈'.indexOf(obj.BUY_IN_CURR_NAME) ? (obj.style = 'style="background: #ddd;"', obj.zst_style = 'style="background-image: url(/cn/forex/v3/images/icon_chart_grey.png);"') :
						
							*/
					
					// 引导页

					// ~'丹麦克朗|瑞典克朗|挪威克朗|马来西亚林吉特|泰铢|南非兰特|俄罗斯卢布|哈萨克斯坦坚戈'.indexOf(obj.BUY_IN_CURR_NAME) ? (obj.style = 'style="background: #ddd;"', obj.zst_style = 'style="background-image: url(/cn/forex/v3/images/icon_chart_grey.png);"') :
					// (obj.buy_link = 'href="http://www.ccb.com/chn/home/ydy/bankqr/index.shtml?menu=20"', 
					// 	obj.self_link = 'href="http://www.ccb.com/chn/home/ydy/bankqr/index.shtml?menu=21"',
					//         obj.zst_link = 'href="http://tool.ccb.com/webtran/static/trendchart/price04.html?group=3&sec_code=' + obj.BUY_IN_CURR_COD + "_" + obj.SELL_OUT_CURR_COD + '"');
					~'澳大利亚元|加拿大元|港币|日元|韩元|澳门元|新西兰元|新加坡元|瑞士法郎|英镑|美元|欧元|丹麦克朗|瑞典克朗|挪威克朗|南非兰特|俄罗斯卢布'.indexOf(obj.BUY_IN_CURR_NAME) ?  (obj.zst_link = 'href="http://tool.ccb.com/webtran/static/trendchart/price04.html?group=3&sec_code=' + obj.BUY_IN_CURR_COD + "_" + obj.SELL_OUT_CURR_COD + '"'):(obj.zst_style = 'style="background-image: url(/cn/forex/v3/images/icon_chart_grey.png);"')
					~'美元|欧元|英镑|日元|港币|澳大利亚元|加拿大元|瑞士法郎|澳门元|新加坡元|韩元|新西兰元'.indexOf(obj.BUY_IN_CURR_NAME) ?(obj.self_link = 'href="http://www.ccb.com/chn/home/ydy/bankqr/index.shtml?menu=21"',obj.buy_link = 'href="http://www.ccb.com/chn/home/ydy/bankqr/index.shtml?menu=20"'):obj.style = 'style="background: #ddd;"'
					var engN = ''
					var selectName = obj.BUY_IN_CURR_NAME
					if(obj.BUY_IN_CURR_NAME=='未知'){
						selectName = obj.SELL_OUT_CURR_NAME
						obj.SHOW_NAME = obj.SELL_OUT_CURR_NAME
						obj.SHOW_IMG = obj.SELL_OUT_CURR_IMG
					}else{
						obj.SHOW_NAME = obj.BUY_IN_CURR_NAME
						obj.SHOW_IMG = obj.BUY_IN_CURR_IMG
					}
					$.each(group_code_map_CN,function(key,val){
						
						if(val == selectName){
							engN = key
						}
					})
					obj.FXR_XCH_BUYIN = formatDecimalPoint(obj.FXR_XCH_BUYIN,engN,decimalPointMap)
					obj.FXR_XCH_SELLOUT = formatDecimalPoint(obj.FXR_XCH_SELLOUT,engN,decimalPointMap)
					obj.FXR_CUR_BUYIN = formatDecimalPoint(obj.FXR_CUR_BUYIN,engN,decimalPointMap)
					obj.FXR_CUR_SELLOUT = formatDecimalPoint(obj.FXR_CUR_SELLOUT,engN,decimalPointMap)

				}
				// mounted: function (options) {
				// 	if ($('.jsh_list_js li').length > 0) return;
				// 	$.each(this.defaultSort, function (k, v) {
				// 		$('.jsh_list_js').append('<li>' + v + '</li>');
				// 	})
				// 	$(".jsh_list_js").on('click', 'li', function () {
				// 		$(this).parents(".select_list").find(".select_value").text($(this).text());
				// 	});
				// }
			})
			//对公
			if (location.pathname === '/chn/company/gsjgsy/cpfw/jrsc/whxq/index.shtml') {
				wh_sort = wh_sort_dg
				jsh_sort = jsh_sort_dg
				getCurrencyList({
					link: '/cn/home/news/jshckpj_dg.xml',
					isSingle: true,
					sort: jsh_sort,
					template: htmlTemplate_dg,
					containner: '#jshckpj_dg ul:eq(0)',
					imgPath: '/uiFramework/commonResource/zip/cn/cn/forex/v3/images/jsh_guoqi/',
					tempKey: 'jshckpj_dg',
					filter: function (i, v) {
						
					},
					callback: function (obj, options) {
					

						/* ~'丹麦克朗|瑞典克朗|挪威克朗|马来西亚林吉特|泰铢|南非兰特|俄罗斯卢布|哈萨克斯坦坚戈'.indexOf(obj.BUY_IN_CURR_NAME) ? (obj.style = 'style="background: #ddd;"', obj.zst_style = 'style="background-image: url(/cn/forex/v3/images/icon_chart_grey.png);"') :
							; */
						
						// 引导页
		
						// ~'丹麦克朗|瑞典克朗|挪威克朗|马来西亚林吉特|泰铢|南非兰特|俄罗斯卢布|哈萨克斯坦坚戈'.indexOf(obj.BUY_IN_CURR_NAME) ? (obj.style = 'style="background: #ddd;"', obj.zst_style = 'style="background-image: url(/cn/forex/v3/images/icon_chart_grey.png);"') :
						// (obj.buy_link = 'href="http://www.ccb.com/chn/home/ydy/bankqr/index.shtml?menu=20"', 
						// 	obj.self_link = 'href="http://www.ccb.com/chn/home/ydy/bankqr/index.shtml?menu=21"',
						//         obj.zst_link = 'href="http://tool.ccb.com/webtran/static/trendchart/price04.html?group=3&sec_code=' + obj.BUY_IN_CURR_COD + "_" + obj.SELL_OUT_CURR_COD + '"');
						~'澳大利亚元|加拿大元|港币|日元|韩元|澳门元|新西兰元|新加坡元|瑞士法郎|英镑|美元|欧元|丹麦克朗|瑞典克朗|挪威克朗|南非兰特|俄罗斯卢布'.indexOf(obj.BUY_IN_CURR_NAME) ?  (obj.zst_link = 'href="http://forex.ccb.com/tran/WCCMainPlatV5?CCB_IBSVersion=V5&SERVLET_NAME=WCCMainPlatV5&TXCODE=WHCK04&CCYPAIR=' + obj.BUY_IN_CURR_COD + "/" + obj.SELL_OUT_CURR_COD+'&CND_TYPE=1"'):(obj.zst_style = 'style="background-image: url(/cn/forex/v3/images/icon_chart_grey.png);"')
						~'美元|欧元|英镑|日元|港币|澳大利亚元|加拿大元|瑞士法郎|澳门元|新加坡元|韩元|新西兰元'.indexOf(obj.BUY_IN_CURR_NAME) ?(obj.self_link = 'href="http://www.ccb.com/chn/home/ydy/bankqr/index.shtml?menu=21"',obj.buy_link = 'href="http://www.ccb.com/chn/home/ydy/bankqr/index.shtml?menu=20"'):obj.style = 'style="background: #ddd;"'
						var engN = ''
						var selectName = obj.BUY_IN_CURR_NAME
						if(obj.BUY_IN_CURR_NAME=='未知'){
							selectName = obj.SELL_OUT_CURR_NAME
							obj.SHOW_NAME = obj.SELL_OUT_CURR_NAME
							obj.SHOW_IMG = obj.SELL_OUT_CURR_IMG
						}else{
							obj.SHOW_NAME = obj.BUY_IN_CURR_NAME
							obj.SHOW_IMG = obj.BUY_IN_CURR_IMG
						}
						$.each(group_code_map_CN,function(key,val){
							
							if(val == selectName){
								engN = key
							}
						})
						obj.FXR_XCH_BUYIN = formatDecimalPoint(obj.FXR_XCH_BUYIN,engN,decimalPointMap)
						obj.FXR_XCH_SELLOUT = formatDecimalPoint(obj.FXR_XCH_SELLOUT,engN,decimalPointMap)
						obj.FXR_CUR_BUYIN = formatDecimalPoint(obj.FXR_CUR_BUYIN,engN,decimalPointMap)
						obj.FXR_CUR_SELLOUT = formatDecimalPoint(obj.FXR_CUR_SELLOUT,engN,decimalPointMap)
						// console.log(obj)

					}
					// mounted: function (options) {
					// 	if ($('.jsh_list_js li').length > 0) return;
					// 	$.each(this.defaultSort, function (k, v) {
					// 		$('.jsh_list_js').append('<li>' + v + '</li>');
					// 	})
					// 	$(".jsh_list_js").on('click', 'li', function () {
					// 		$(this).parents(".select_list").find(".select_value").text($(this).text());
					// 	});
					// }
				})
			}

			getCurrencyList({
				link: '/cn/home/news/whckpj_new2.xml',
				isSingle: false,
				sort: wh_sort,
				template: htmlTemplate_Group,
				containner: '#whckpj ul:eq(0)',
				imgPath: '/uiFramework/commonResource/zip/cn/cn/forex/v3/images/whmm_guoqi/',
				tempKey: 'whckpj',
				filter: function (i, v) {
					if (location.pathname === '/chn/forex/indexv3.shtml' && i >= 7) {
						return true;
					}
				},
				callback: function (obj, options) {
					// obj.zst_link = 'href="http://tool.ccb.com/webtran/static/trendchart/price04.html?group=3&sec_code=' + obj.BUY_IN_CURR_COD + "_" + obj.SELL_OUT_CURR_COD+'"';
				/* 	~'美元/马来西亚林吉特'.indexOf(obj.GROUP_CURR_NAME) ? (obj.style = 'style="background: #ddd;"') :
						(obj.trade_link = 'href="/CCBIS/V6/STY1/CN/login.jsp?ccbParam=F_TXCODE=322200,CURBUYIN=' + obj.BUY_IN_CURR_COD + ',CURBUYOUT=' + obj.SELL_OUT_CURR_COD+'"'); */
					
						// 引导页
					var engN = ''
					$.each(group_code_map_HW,function(key,val){
						if(val == obj.GROUP_CURR_NAME){
							engN = key
						}
					})
					obj.FXR_XCH_BUYIN = formatDecimalPoint(obj.FXR_XCH_BUYIN,engN,decimalPointMap)
					obj.FXR_XCH_SELLOUT = formatDecimalPoint(obj.FXR_XCH_SELLOUT,engN,decimalPointMap)
					~'美元/马来西亚林吉特|美元/印尼卢比|美元/巴基斯坦卢比'.indexOf(obj.GROUP_CURR_NAME) ? (obj.style = 'style="background: #ddd;"') :
					(obj.trade_link = 'href="http://www.ccb.com/chn/home/ydy/bankqr/index.shtml?menu=18"');
					~'美元/加拿大元|美元/瑞士法郎|美元/丹麦克朗|美元/港币|美元/日元|美元/澳门元|美元/挪威克朗|美元/新加坡元|美元/泰铢|澳大利亚元/美元|欧元/美元|英镑/美元|新西兰元/美元|澳大利亚元/新西兰元|欧元/澳大利亚元|瑞士法郎/加拿大元|澳大利亚元/新加坡元|澳大利亚元/加拿大元|欧元/加拿大元|瑞士法郎/日元|澳大利亚元/瑞士法郎|欧元/瑞士法郎|欧元/新西兰元|欧元/瑞典克朗|欧元/挪威克朗|英镑/新西兰元|英镑/港币|英镑/加拿大元|英镑/澳大利亚元|欧元/英镑|港币/日元|加拿大元/港币|欧元/港币|加拿大元/日元|澳大利亚元/日元|欧元/日元|新西兰元/日元|新西兰元/瑞士法郎|新西兰元/新加坡元|美元/南非兰特|美元/俄罗斯卢布|美元/哈萨克斯坦坚戈|美元/韩元|美元/阿联酋迪拉姆|美元/沙特里亚尔|美元/匈牙利福林|美元/墨西哥比索|美元/波兰兹罗提|美元/土耳其里拉|美元/以色列新谢客尔|美元/蒙古图格里克'.indexOf(obj.GROUP_CURR_NAME) ? obj.zst_link = 'href="http://forex.ccb.com/tran/WCCMainPlatV5?CCB_IBSVersion=V5&SERVLET_NAME=WCCMainPlatV5&TXCODE=WHCK04&CCYPAIR=' + obj.BUY_IN_CURR_COD + "/" + obj.SELL_OUT_CURR_COD+'&CND_TYPE=1"':(obj.zst_style = 'style="background-image: url(/cn/forex/v3/images/icon_chart_grey.png);"');
					if(obj.zst_link && location.pathname != '/chn/company/gsjgsy/cpfw/jrsc/whxq/index.shtml'){
					obj.zst_link = 'href="http://tool.ccb.com/webtran/static/trendchart/price04.html?group=3&sec_code=' + obj.BUY_IN_CURR_COD + "_" + obj.SELL_OUT_CURR_COD+'"'
					}
				}
			})


		}
		//历史价格可选时间不得超过30天
		$('#selectDateStar').on('change',function(e){
			var dateEnd = $("#selectDateEnd")
			var dateStar = $("#selectDateStar")
		if(!dateRegex1.test(e.target.value)){
			return
		}
			if(!e.target.value){
				dateEnd.val('')
				dateStar.attr('min','')
				dateStar.attr('max','')
				dateEnd.attr('min','')
				dateEnd.attr('max','')
				return
			}

			var defTime = new Date(e.target.value).getTime()
			var endTime = new Date(dateEnd.val())
			var limit = 1000*24*60*60*30
			if(defTime<new Date('2024-10-20').getTime()){
				dateStar.val('')
				alert('起始日期需大于等于2024年10月20日')
				return
			}
			dateEnd.attr('min',e.target.value)
			dateEnd.attr('max',new Date((defTime+limit)).toJSON().slice(0,10))
			if(endTime<new Date(e.target.value) || endTime>new Date((defTime+limit))){
				dateEnd.val('')
			}
		})
		$('#selectDateEnd').on('change',function(e){
			// console.log(e.target.value)
			// var dateEnd = $("#selectDateEnd")
			// var dateStar = $("#selectDateStar")
			// console.log(e.target.value)
			// if(!e.target.value){
			// 	dateStar.val('')
			// 	dateStar.attr('min','')
			// 	dateStar.attr('max','')
			// 	dateEnd.attr('min','')
			// 	dateEnd.attr('max','')
			// 	return
			// }
			// // var defTime = new Date(e.target.value).getTime()
			// var limit = 1000*24*60*60*30
			// dateStar.attr('min',new Date((defTime-limit)).toJSON().slice(0,10))
			// dateStar.attr('max',e.target.value)
		})
		//公司参考价牌
		function cpkjStageList(ckjp_sort){
			if(location.pathname=="/chn/company/gsjgsy/cpfw/jrsc/whxq/index.shtml"){ //公司
				getCurrencyYQList({
					link: '/cn/home/news/dgwhyqpj.xml', 
					sort: ckjp_sort,
					template: htmlTemplage_ckjp, 
					containner: '#jshyq_ckpj ul:eq(0)',
					imgPath: '/uiFramework/commonResource/zip/cn/cn/forex/v3/images/jsh_guoqi/',
					filter: function (i, v) {
						if (location.pathname === '/chn/forex/indexv3.shtml' && i >= 7) {
							return true;
						}
					},
					tempKey: 'cpkjdg',
					callback: function (obj, options) {
					}
				})
			}
		}
		//分页跳转
		function lsjgList1(){
			his_data = {
				space1:{},
				space2:{},
				space3:{},
				space4:{},
				space5:{},
				space6:{},
				space7:{},
				space8:{},
				space9:{},
				space10:{},
				space11:{},
				space12:{},
				space13:{},
				space14:{},
				space15:{},
				space16:{},
				space17:{},
				space18:{},
				space19:{},
				space20:{},
				space21:{},
				space22:{},
				space23:{},
				space24:{},
				space25:{},
				space26:{},
				space27:{},
				space28:{},
				space29:{},
				space30:{},
				totalPage:'',
				totalRec:'',
			}
			lsjgList(1,0)
		}
		function tolsjgList(){
			lsjgList($('.wh_input_page').val(),1)
		}
		
		$(document).on('click','.page_btn',tolsjgList)
		$(document).on('click','.company_wh_page .tolsjgList',function(event){
			lsjgList(event.target.innerText,1)
		})
		//分页跳转结束
		//历史价格
		function lsjgList(page,isTo){
			isTo=isTo?isTo:0
			var data = {}
			var limit = 30
			var selectCCN = $('#jsyh_code .select_value')[0].innerText;
			var selectDateStar =$('#selectDateStar').val()
			var selectDateEnd =$('#selectDateEnd').val()
			
			if((selectDateStar && !selectDateEnd) || (!selectDateStar && selectDateEnd)){
				alert('请选择起止日期')
				return
			}
			
		if (selectDateStar&&selectDateEnd){
			if(!dateRegex1.test(selectDateStar) || !dateRegex1.test(selectDateEnd)){
				if(!dateRegex2.test(selectDateStar) || !dateRegex2.test(selectDateEnd)){
					alert('请输入8位格式日期，例如"20250101"')
					return
				}else{
					selectDateStar = selectDateStar.substring(0,4)+'-'+selectDateStar.substring(4,6)+'-'+selectDateStar.substring(6,8)
					selectDateEnd = selectDateEnd.substring(0,4)+'-'+selectDateEnd.substring(4,6)+'-'+selectDateEnd.substring(6,8)
				}
			}
			
		}
			var choosedate = (new Date(selectDateEnd).getTime()-new Date(selectDateStar).getTime())/(1000*24*60*60)
		if(choosedate&& choosedate>30){
			$('#selectDateStar').val('')
			$('#selectDateEnd').val('')
			alert('起止日期不可大于30天,请重新输入')
			return;
		}
			var selectHis = $('#jsyh_his .select_value')[0].innerText == '请选择期限'?'':$('#jsyh_his .select_value')[0].innerText
			data.Trm_Cd = ''
			data.PAGE = 1
			data.REC_IN_PAGE = (choosedate*50)>1000?1000:choosedate*50
			data.REC_IN_PAGE = selectDateStar == selectDateEnd?50:data.REC_IN_PAGE
			data.REC_IN_PAGE = data.REC_IN_PAGE?data.REC_IN_PAGE:50
			$.each(jsyh_his_map,function(key,val){
				if(val.name == selectHis){
					data.Trm_Cd = key
				}
			})
			$.each(group_code_map_CN,function(key,val){
				if(val == selectCCN){
					data.CcyPair_EngShtNm = key
				}
			})
			data.Txn_Dt_Strt = selectDateStar?selectDateStar.split('-').join(''):formatDate('yyyyMMdd')
			data.Txn_Dt_End = selectDateEnd?selectDateEnd.split('-').join(''):formatDate('yyyyMMdd')
			
			if(page > 1||isTo ==1){
				var basket = new DataBasket(htmlTemplage_lsjg);
				var $containner = $('#jshyq_lsjg .tit');
				if (!$containner.length > 0) return;
				$('.template_lsjg').remove()
				$containner.nextUntil(".company_wh_page").remove();
				basket.space = his_data['space'+page]
				var htmlString = basket.transform(his_code_sort);
				$containner.after(htmlString);
				var HTMLTEMP = ''
					
				if(his_data.totalPage>0){
					for(var i =1;i<=his_data.totalPage;i++){
						if(i == page){
							HTMLTEMP+='<span><a href="javascript:;" class="tolsjgList cur" >'+i+'</a></span>'
						}else{
							HTMLTEMP+='<span><a href="javascript:;" class="tolsjgList">'+i+'</a></span>'
						}
					}
					HTMLTEMP+='<span>共<span class="total">'+his_data.totalRec+'</span>条记录，当前第<font>'+page+'/'+his_data.totalPage+'</font>页</span>\
		<span>到<input type="text" class="wh_input_page">页</span><a class="page_btn" \href="javascript:;">确定</a>'
				}
				
				$('.company_wh_page')[0].innerHTML = HTMLTEMP
			}else{
				getLsjgList({
					link: '/tran/WCCMainPlatV5?CCB_IBSVersion=V5&SERVLET_NAME=WCCMainPlatV5&TXCODE=NWHYQ2', //todo
					isSingle: false,
					query:data,
					curName:selectCCN,
					template: htmlTemplage_lsjg, 
					containner: '#jshyq_lsjg .tit',
					sort:his_code_sort,
					imgPath: '/uiFramework/commonResource/zip/cn/cn/forex/v3/images/jsh_guoqi/',
					filter: function (i, v) {
						if (location.pathname === '/chn/forex/indexv3.shtml' && i >= 7) {
							return true;
						}
					},
					callback: function (obj, options) {
						// console.log(obj,'callback')
					}
				})
			}
			
		}
		function getLsjgList(options){
			var link = options.link,sort = options.sort, template = options.template,curName=options.curName
			containner = options.containner, imgPath = options.imgPath, query= options.query,
			callback = options.callback;
			var $containner = $(containner);
			if (!$containner.length > 0) return;
			$('.template_lsjg').remove()
			$containner.nextUntil(".company_wh_page").remove();
			$.ajax({
				url: link,
				data:query,
				dataType: "json",
				success: function (ResponseText) {
					var responseTextList = ResponseText.DOCUMENT.BODY.Price_Group||[]
					result = responseTextList.filter(function(v,i){
						return sort.indexOf('code'+v.Trm_Cd)!=-1
					})
					if(result){
						var basket = new DataBasket(template);
						var Date_Reg = /^(\d{4})(\d{2})(\d{2})/;
						result.forEach(function(v,i){
							var CCCodeEng = v.CcyPair_EngShtNm
							var CCCodeName = group_code_map_CN[CCCodeEng]
							var BUY_IN_CURR = ''
							$.each(currencyMap,function(key,val){
								if(val.name == CCCodeName){
									BUY_IN_CURR_COD = key
								}
							})
							var BUY_IN_CURR = currencyMap[BUY_IN_CURR_COD];
							var BUY_IN_CURR_IMG = BUY_IN_CURR && imgPath + BUY_IN_CURR.img || '';
							var offPr_Dt = v.Ofr_Dt
							var his_code = v.Trm_Cd
							var Buy_Fwd_Prc = v.Cst_Buy_Prc
							var Sell_Fwd_Prc = v.Cst_Sell_Prc
							// console.log('code'+his_code)
							var _data = basket.put('code'+his_code)
							_data.BUY_IN_CURR_IMG = BUY_IN_CURR_IMG
							_data.curName = curName;
							_data.Buy_Fwd_Prc=formatDecimalPoint(Buy_Fwd_Prc,CCCodeEng,yqDecimalPointMap);
							_data.Sell_Fwd_Prc=formatDecimalPoint(Sell_Fwd_Prc,CCCodeEng,yqDecimalPointMap);
							_data.his_name=jsyh_his_map[his_code].name;
							_data.offPr_Dt = Date_Reg.test(offPr_Dt) ? offPr_Dt.replace(Date_Reg, "$1-$2-$3") : "";
							callback && callback(_data);
							
						})
						// console.log(basket.space)
						var pageNum = 20
						var totalPage =  Math.ceil(result.length/pageNum)  //ResponseText.DOCUMENT.BODY.TOTAL_PAGE
						var totalRec = result.length; //ResponseText.DOCUMENT.BODY.TOTAL_REC
						var curNum = 0
						var curpage = 1
						var sortList = {}

						his_code_sort.map(function(v,i){
							if(basket.space[v]){
								// console.log(v)
								sortList[v] = basket.space[v]
								sortList[v].id = i
							}
							
						})

						// console.log(Object.keys(sortList))
						var sortList2 = Object.values(sortList).sort(function(a,b){
							return a.id-b.id
						})
						// console.log(sortList2)
						var sortList3 = {}
						// console.log(Object.keys(sortList),'Object.keys(sortList)')
						
						sortList2.forEach(function(val,index){
								// console.log(Object.keys(sortList)[index],'(Object.keys(sortList)[index]')
							// sortList3[Object.keys(sortList)[index]] = val
							sortList3[val[0].keyName] = val
						})


					console.log(sortList3)
					$.each(sortList3,function(key,val){
						if(curNum<pageNum){
							curNum += val.length
							
							if(curNum>pageNum){
								var overData = curNum%pageNum
								var times = Math.floor(curNum/pageNum)
								if(times>1){
				
									var part = pageNum-curNum+val.length
									his_data['space'+curpage][key] = val.slice(0,part)
									for(var i=1;i<times;i++){
										curpage++;
										his_data['space'+curpage][key] = val.slice(part,pageNum+part)
										part = pageNum+part
									}
									curpage++;
									his_data['space'+curpage][key] = val.slice(val.length - overData)
									
								}else{
									his_data['space'+curpage][key] = val.slice(0,-overData)
									curpage++;
									his_data['space'+curpage][key] = val.slice(val.length - overData)
								}
								
								
								
								curNum = overData
							}else{
								his_data['space'+curpage][key] = val
							}
							if(curNum == pageNum){
								curNum = 0;
								curpage++;
							}
							
						}
					})
					his_data.totalPage = totalPage
					his_data.totalRec = totalRec
					basket.space = his_data.space1
					var htmlString = basket.transform(sort);
					// console.log(basket)
					// console.log(his_data)
					$containner.after(htmlString);
				}
				var HTMLTEMP = ''
				
				if(totalPage>0){
					for(var i =1;i<=totalPage;i++){
						if(i == query.PAGE){
							HTMLTEMP+='<span><a href="javascript:;" class="tolsjgList cur" >'+i+'</a></span>'
						}else{
							HTMLTEMP+='<span><a href="javascript:;" class="tolsjgList">'+i+'</a></span>'
						}
					}
					HTMLTEMP+='<span>共<span class="total">'+totalRec+'</span>条记录，当前第<font>'+query.PAGE+'/'+totalPage+'</font>页</span>\
		<span>到<input type="text" class="wh_input_page">页</span><a class="page_btn" \href="javascript:;">确定</a>'
				}else{
					HTMLTEMP+='暂无记录'
				}
				
				$('.company_wh_page')[0].innerHTML = HTMLTEMP
				return
			}
		})
	}
	function getMarketList(options) {
		var link = options.link, sort = options.sort, node = options.node, template = options.template,
			containner = options.containner, key = options.key, keyMap = options.keyMap, callback = options.callback;
		var $containner = $(containner);
		if (!$containner.length > 0) return;
		$.ajax({
			url: link,
			dataType: "xml",
			success: function (ResponseText) {
				var basket = new DataBasket(template);
				$(ResponseText).find(node).each(function (i, v) {
					var _this = $(this);
					var name = _this.find(key).text();
					if (keyMap) name = keyMap[name] || name;
					var _data = basket.put(name);
					_this.children().each(function (i, v) {
						var _v = $(v), key = _v[0].nodeName, value = _v.text();
						_data[key] = value;
					})
					callback && callback(_data);
				})
				var htmlString = basket.transform(sort);
				$containner.after(htmlString);
			}
		})
	}

		function diff_match(newBasket, oldBasket) {
			if (!oldBasket) return true;
			var isFresh = false;
			var newSpace = newBasket.space;
			var oldSpace = oldBasket.space;
			for (var spaceKey in newSpace) {
				var newDataList = newSpace[spaceKey];
				var oldDataList = oldSpace[spaceKey];
				if (!oldDataList) {
					isFresh = true;
					continue;
				}
				for (var i = 0, len = newDataList.length; i < len; i++) {
					var newData = newDataList[i];
					for (var j = 0, jlen = oldDataList.length; j < jlen; j++) {
						var oldData = oldDataList[j];
						if (oldData.GROUP_CURR_NAME === newData.GROUP_CURR_NAME) {
							diff_compute(newData, oldData) && (isFresh = true);
						}
					}
				}
			}
			return isFresh;
		}
		function diff_compute(newData, oldData) {
			var diffList = ['FXR_XCH_BUYIN', 'FXR_XCH_SELLOUT', 'FXR_CUR_BUYIN', 'FXR_CUR_SELLOUT'];
			var isChange = false;
			for (var i = 0, len = diffList.length; i < len; i++) {
				var key = diffList[i];
				if (newData[key] !== oldData[key]) {
					var newvalue = +newData[key], oldvalue = +oldData[key], difference = newvalue - oldvalue;
					newData[key + '_color'] = diff_color(difference);
					newData[key + '_symbol'] = diff_symbol(difference);
					console.log(newData[key + '_color'], newData[key + '_symbol'])
					isChange || (isChange = true);
				}
			}
			return isChange;
		}
		function diff_color(diff_val) {
			return diff_val > 0 ? 'red' : diff_val < 0 ? 'green' : 'normal';
		}
		function diff_symbol(diff_val) {
			return diff_val > 0 ? '↑' : diff_val < 0 ? '↓' : ' ';
		}
		function getCurrencyList(options) {
			var link = options.link, isSingle = options.isSingle, sort = options.sort, template = options.template,
				containner = options.containner, imgPath = options.imgPath, tempKey = options.tempKey, filter = options.filter, callback = options.callback, mounted = options.mounted;
			var $containner = $(containner);
			if (!$containner.length > 0) return;
			$.ajax({
				url: link,
				dataType: "xml",
				success: function (ResponseText) {
					ResponseText = $(ResponseText);
					var responseString = ResponseText.text();
					if (DataBasket[tempKey + "_text"] === responseString) return;
					var Date_Reg = /^(\d{4})(\d{2})(\d{2})/;
					var Time_Reg = /^(\d{2})(\d{2})(\d{2})/;
					var basket = new DataBasket(template);
					ResponseText.find('ReferencePriceSettlement').each(function (i, v) {
						var _this = $(this);
						var BUY_IN_CURR_COD = _this.find('Ofrd_Ccy_CcyCd').text();
						var SELL_OUT_CURR_COD = _this.find('Ofr_Ccy_CcyCd').text();
						var BUY_IN_CURR = currencyMap[BUY_IN_CURR_COD];
						var SELL_OUT_CURR = currencyMap[SELL_OUT_CURR_COD];
						var BUY_IN_CURR_NAME = BUY_IN_CURR && BUY_IN_CURR.name || '未知';
						var SELL_OUT_CURR_NAME = SELL_OUT_CURR && SELL_OUT_CURR.name || '未知';
						var GROUP_CURR_NAME = BUY_IN_CURR_NAME + '/' + SELL_OUT_CURR_NAME;
						var GROUP_CURR_NAME_TEMP = BUY_IN_CURR && SELL_OUT_CURR && GROUP_CURR_NAME || '未知';
						var BUY_IN_CURR_IMG = BUY_IN_CURR && imgPath + BUY_IN_CURR.img || '';
						var SELL_OUT_CURR_IMG = SELL_OUT_CURR && imgPath + SELL_OUT_CURR.img || '';
						var GROUP_CURR_IMG = BUY_IN_CURR && SELL_OUT_CURR && (imgPath + BUY_IN_CURR_COD + '&' + SELL_OUT_CURR_COD + '.png') || '';
						var _data = isSingle ? basket.put(BUY_IN_CURR_NAME == '未知'?SELL_OUT_CURR_NAME:BUY_IN_CURR_NAME) : basket.put(GROUP_CURR_NAME_TEMP);
						_data.BUY_IN_CURR_COD = BUY_IN_CURR_COD;//买入币种编号
						_data.SELL_OUT_CURR_COD = SELL_OUT_CURR_COD;//卖出币种编号
						_data.BUY_IN_CURR_NAME = BUY_IN_CURR_NAME;//买入币种名称
						_data.SELL_OUT_CURR_NAME = SELL_OUT_CURR_NAME;//卖出币种名称
						_data.GROUP_CURR_NAME = GROUP_CURR_NAME;//组合币种名称
						_data.BUY_IN_CURR_IMG = BUY_IN_CURR_IMG;//买入币种图片
						_data.SELL_OUT_CURR_IMG = SELL_OUT_CURR_IMG;//卖出币种图片
						_data.GROUP_CURR_IMG = GROUP_CURR_IMG;//组合币种图片
						_data.FXR_XCH_BUYIN = _this.find('BidRateOfCcy').text();//现汇买入汇率
						_data.FXR_XCH_SELLOUT = _this.find('OfrRateOfCcy').text();//现汇卖出汇率
						_data.FXR_CUR_BUYIN = _this.find('BidRateOfCash').text();//现钞买入汇率
						_data.FXR_CUR_SELLOUT = _this.find('OfrRateOfCash').text();//现钞卖出汇率
						var LstPr_Dt = _this.find('LstPr_Dt').text();//日期
						_data.LstPr_Dt = Date_Reg.test(LstPr_Dt) ? LstPr_Dt.replace(Date_Reg, "$1-$2-$3") : "";
						var LstPr_Tm = _this.find('LstPr_Tm').text();//时间
						_data.LstPr_Tm = Time_Reg.test(LstPr_Tm) ? LstPr_Tm.replace(Time_Reg, "$1:$2:$3") : "";
						callback && callback.call(basket, _data, options);
					})
					if (diff_match(basket, basket.constructor[tempKey])) {
						basket.constructor[tempKey + "_text"] = responseString;
						basket.constructor[tempKey] = basket;
						var htmlString = basket.transform(sort, filter);
						$containner.nextUntil(".end").remove();
						$containner.after(htmlString);
						mounted && mounted.call(basket, options);
					}
				}
			})
		}
		function getCurrencyYQList(options){
			var link = options.link, sort = options.sort, template = options.template,
			containner = options.containner, imgPath = options.imgPath,tempKey = options.tempKey, callback = options.callback, mounted = options.mounted;;
			var $containner = $(containner);
			if (!$containner.length > 0) return;
			$.ajax({
				url: link,
				dataType: "xml",
				success: function (ResponseText) {
					var resultList = {};
					ResponseText = $(ResponseText);
					var responseString = ResponseText.text();
					if (DataBasket[tempKey + "_text"] === responseString) return;
					var basket = new DataBasket(template);
					ResponseText.find('ReferencePriceSettlement').each(function (i, v) {
						var _this = $(this);
						var CCCodeEng = _this.find('CcyPair_EngShtNm').text()
						var CCCodeName = group_code_map_CN[CCCodeEng]
						var BUY_IN_CURR_COD = ''
						$.each(currencyMap,function(key,val){
							if(val.name == CCCodeName){
								BUY_IN_CURR_COD = key
							}
						})
						var BUY_IN_CURR = currencyMap[BUY_IN_CURR_COD];
						var BUY_IN_CURR_NAME = BUY_IN_CURR && BUY_IN_CURR.name || '未知';
						var BUY_IN_CURR_IMG = BUY_IN_CURR && imgPath + BUY_IN_CURR.img || '';
						var Dstl_stage = _this.find('Dstl_Txn_Ddln_Cd').text()
						var FXR_XCH_BUYIN = _this.find('Cst_Buy_Prc').text()
						var FXR_CUR_SELLOUT = _this.find('Cst_Sell_Prc').text()
						if(!resultList[BUY_IN_CURR_COD]){
							resultList[BUY_IN_CURR_COD] = {
								BUY_IN_CURR_COD:BUY_IN_CURR_COD,
								BUY_IN_CURR_NAME:BUY_IN_CURR_NAME,
								BUY_IN_CURR_IMG:BUY_IN_CURR_IMG
							}
						}
						switch(Dstl_stage){
							case '37':
								resultList[BUY_IN_CURR_COD]['FXR_XCH_BUYIN_1W'] = formatDecimalPoint(FXR_XCH_BUYIN,CCCodeEng,yqDecimalPointMap);
								resultList[BUY_IN_CURR_COD]['FXR_CUR_SELLOUT_1W'] = formatDecimalPoint(FXR_CUR_SELLOUT,CCCodeEng,yqDecimalPointMap);
								break;
							case '07':
								resultList[BUY_IN_CURR_COD]['FXR_XCH_BUYIN_1M'] = formatDecimalPoint(FXR_XCH_BUYIN,CCCodeEng,yqDecimalPointMap);
								resultList[BUY_IN_CURR_COD]['FXR_CUR_SELLOUT_1M'] = formatDecimalPoint(FXR_CUR_SELLOUT,CCCodeEng,yqDecimalPointMap);
								break;
							case '09':
								resultList[BUY_IN_CURR_COD]['FXR_XCH_BUYIN_3M'] = formatDecimalPoint(FXR_XCH_BUYIN,CCCodeEng,yqDecimalPointMap);
								resultList[BUY_IN_CURR_COD]['FXR_CUR_SELLOUT_3M'] = formatDecimalPoint(FXR_CUR_SELLOUT,CCCodeEng,yqDecimalPointMap);
								break;
							case '12':
								resultList[BUY_IN_CURR_COD]['FXR_XCH_BUYIN_6M'] = formatDecimalPoint(FXR_XCH_BUYIN,CCCodeEng,yqDecimalPointMap);
								resultList[BUY_IN_CURR_COD]['FXR_CUR_SELLOUT_6M'] = formatDecimalPoint(FXR_CUR_SELLOUT,CCCodeEng,yqDecimalPointMap);
								break;
							case '15':
								resultList[BUY_IN_CURR_COD]['FXR_XCH_BUYIN_9M'] = formatDecimalPoint(FXR_XCH_BUYIN,CCCodeEng,yqDecimalPointMap);
								resultList[BUY_IN_CURR_COD]['FXR_CUR_SELLOUT_9M'] = formatDecimalPoint(FXR_CUR_SELLOUT,CCCodeEng,yqDecimalPointMap);
								break;
							case '18':
								resultList[BUY_IN_CURR_COD]['FXR_XCH_BUYIN_12M'] = formatDecimalPoint(FXR_XCH_BUYIN,CCCodeEng,yqDecimalPointMap);
								resultList[BUY_IN_CURR_COD]['FXR_CUR_SELLOUT_12M'] = formatDecimalPoint(FXR_CUR_SELLOUT,CCCodeEng,yqDecimalPointMap);
								break;
						}            
					})
					$.each(resultList,function(key,val){
						var _data = basket.put(val.BUY_IN_CURR_NAME);
						_data.BUY_IN_CURR_COD = val.BUY_IN_CURR_COD;//买入币种编号
						_data.BUY_IN_CURR_NAME = val.BUY_IN_CURR_NAME;//买入币种名称
						_data.BUY_IN_CURR_IMG = val.BUY_IN_CURR_IMG;//买入币种图片
						_data.FXR_XCH_BUYIN_1W= val.FXR_XCH_BUYIN_1W //一周买入价
						_data.FXR_CUR_SELLOUT_1W= val.FXR_CUR_SELLOUT_1W //一周卖出价
						_data.FXR_XCH_BUYIN_1M= val.FXR_XCH_BUYIN_1M  //1个月买入价
						_data.FXR_CUR_SELLOUT_1M= val.FXR_CUR_SELLOUT_1M  //1个月卖出价
						_data.FXR_XCH_BUYIN_3M= val.FXR_XCH_BUYIN_3M  //3个月买入价
						_data.FXR_CUR_SELLOUT_3M= val.FXR_CUR_SELLOUT_3M //3 个月卖出价
						_data.FXR_XCH_BUYIN_6M= val.FXR_XCH_BUYIN_6M //6个月买入价
						_data.FXR_CUR_SELLOUT_6M= val.FXR_CUR_SELLOUT_6M  //6个月卖出价
						_data.FXR_XCH_BUYIN_9M= val.FXR_XCH_BUYIN_9M //9个月买入价
						_data.FXR_CUR_SELLOUT_9M= val.FXR_CUR_SELLOUT_9M  //9个月卖出价
						_data.FXR_XCH_BUYIN_12M= val.FXR_XCH_BUYIN_12M //12个月买入价
						_data.FXR_CUR_SELLOUT_12M= val.FXR_CUR_SELLOUT_12M  //12个月卖出价
						callback && callback(_data);
					})
					if (diff_match(basket, basket.constructor[tempKey])) {
						basket.constructor[tempKey + "_text"] = responseString;
						basket.constructor[tempKey] = basket;
						var htmlString = basket.transform(sort);
						$containner.nextUntil(".end").remove();
						$containner.after(htmlString);
						mounted && mounted.call(basket, options);
					}
				}
			})
		}
		function formatDecimalPoint(val,name,map){
			// console.log(decimalPointMap[name])
			if(!map[name]){
				console.log(name)
				return val
			}
			var result = val
			var requireLength = map[name]
			result = Number(val).toFixed(requireLength)
			return result
			// var afterDecLength = val.split('.')[1]?val.split('.')[1].length:0
			// var requireLength = decimalPointMap[name]
			// var result = val
			// if(requireLength && afterDecLength<requireLength){
			// result = val+'0'.repeat(requireLength-afterDecLength)
			// }
			// return result
		}
		function changePic(e) {
			var _this = typeof e === 'object' ? e.target : e;
			var val = $(_this).attr('data');
			var htmlString = "";
			var selectorString = '<a href="javascript:;" class="zst_hover">日K</a> <a href="javascript:;">周K</a> <a href="javascript:;">月K</a>';
			var getPicPath = getPicPath_wrapper(val);
			if (!/DJII|NSDI|S5CI/.test(val)) {
				htmlString += getPicPath('/zoushi/big/');
				selectorString = '<a href="javascript:;" class="zst_hover">走势图</a> <a href="javascript:;">日K</a> <a href="javascript:;">周K</a> <a href="javascript:;">月K</a>'
			}
			htmlString += getPicPath('/kline/day/big/');
			htmlString += getPicPath('/kline/week/big/');
			htmlString += getPicPath('/kline/month/big/');
			$(_this).closest('.select_list').find('.select_value').attr('value', val).end().nextAll(".zst_pic").html(htmlString).end().prevAll(".zst_selector").find("li").html(selectorString);
		}
		function getPicPath_wrapper(base) {
			var isShow = true;
			return function (path) {
				var style = isShow ? (isShow = false, "inline") : "none";
				return '<img class="zst_img" style="margin-top: 23px; display: ' + style + ';" src="/static/ccbcom/fund/output/zst' + path + base + '.gif" />'
			}
		}
		function selectTab() {
			var urlMatch = location.search.substring(1).match(/(?:^|&)tab=(.*?)(?:&|$)/);
			if (urlMatch && urlMatch[1]) {
				$('.appointment_type li').eq(urlMatch[1]).mouseover();
			}
		}
			
			function ChooseOPtion(){
				var tab=location.search.substr(1).match('tab=1');
				if(tab){
				$('.appointment_type li').eq(1).mouseover();
				}
			}
			
	})