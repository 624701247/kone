import * as utils from "./utils"

import {selData} from "./selData"

import {SelScroll} from "./SelScroll"

if(window.clog == null) {
	window.clog = function(firs, ... end) {
	    // console.log(firs, ... end)
	}
}

var el_cont = null;    //容器dom对象
var selScroll = null;  //第一级滚动选择器对象
var showContClsName = 'cont-sarea-show' //显示容器css 类名

// 
var initEm = function(el) {
    var cw_em = 7.5
    var ch = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    var cw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    var ch_em = ch / cw * cw_em
    el.style.fontSize = (cw / cw_em) + 'px';
}

//step 1 初始化数据，如果两个参数都不传则为地区三级联动
// @param data: 数据，格式请参考 areaData
// @param bNum: 选择器级数
export var init = function(data, bNum) {
	selData.setData(data, bNum)

	var str = ''
	str += `
	<div class="sarea">
		<div class="sarea-hd">
			<span id="btn-area-cancel" class="btn">取消</span>
			<span id="btn-area-ok" class="btn">确认</span>
		</div>

		<div class="sarea-bd">
			<div id="selmask" class="selmask"></div>
		</div>
	</div>
	`
	// 
	let contClsName = "cont-sarea" 
	let node = document.createElement("div");
	node.className = contClsName
	node.id = contClsName
	document.body.appendChild(node)
	initEm(node)
	node.innerHTML = str

	el_cont = document.getElementById(contClsName);

	// 取消按钮
	document.querySelector('#btn-area-cancel').onclick = function() {
		// console.log('cccc')
		close()
	}

	// 确定按钮
	document.querySelector('#btn-area-ok').onclick = function() {
		var ev = new Event('onSel')
		ev.data = selData.getAllSelVal() // kone todo 优化
		// ev.data = selScroll.getAllSelName()
		el_cont.dispatchEvent(ev)
		close()
	}
}

//step 2 添加选中回调函数
export var  addSelEventListener = function(cbFunc, that) {
	if(el_cont == null) {
		console.error('sarea 还没初始化')
		return
	}

	el_cont.addEventListener('onSel', function(ev) {
		if(that == null) {
			cbFunc(ev.data)
		}
		else {
			cbFunc.call(that, ev.data) 
		}

	})
}

//step 3 打开选择器
// @param ary : 默认选中的id
export var open = function(ary) {
	if(el_cont == null) {
		console.error('sarea 还没初始化')
		return
	}

	utils.addClass(el_cont, showContClsName) 
	if(selScroll == null) {
		selData.initSelAry(ary)
		let el_blockBd = el_cont.querySelector('.sarea-bd')
		selScroll = new SelScroll(el_blockBd, selData.getBlockNum() - 1, 1)
	}
	else if(ary) {
		selData.initSelAry(ary)
	}

	selScroll.updateList()
}

//step 4 关闭选择器
export var close = function() {
	if(el_cont == null) {
		console.error('sarea 还没初始化')
		return
	}

	utils.removeClass(el_cont, showContClsName) 
}
