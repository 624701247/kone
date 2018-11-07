import * as utils from "./utils"

import {SelData} from "./SelData"
import {SelDataV2} from "./SelDataV2"

import {SelScroll} from "./SelScroll"

var el_cont = null;    //容器dom对象
var selScroll = null;  //第一级滚动选择器对象

var contClsName = "cont-sarea" 
var showContClsName = 'cont-sarea-show' //显示容器css 类名

var selDataMgr = null;

// 
var initEm = function(el) {
    var cw_em = 7.5
    var cw = document.documentElement.clientWidth || document.body.clientWidth
    el.style.fontSize = (cw / cw_em) + 'px';
}

//step 1 初始化数据，如果两个参数都不传则为地区三级联动
// @param data: 数据，格式请参考 areaData
// @param bNum: 选择器级数
// export var init = function(data, bNum) {
// 	selDataMgr.setData(data, bNum)
// 	selScroll = null
// 	let el = document.getElementById(contClsName)
// 	if(el) {
// 		el.remove()
// 	}

// 	var str = ''
// 	str += `
// 	<div class="sarea">
// 		<div class="sarea-hd">
// 			<span id="btn-area-cancel" class="btn-area">取消</span>
// 			<span id="btn-area-ok" class="btn-area">确认</span>
// 		</div>
// 		<div class="sarea-bd">
// 			<div id="selmask" class="selmask"></div>
// 		</div>
// 	</div>
// 	`
// 	// 
// 	let node = document.createElement("div");
// 	node.className = contClsName
// 	node.id = contClsName
// 	document.body.appendChild(node)
// 	initEm(node)
// 	node.innerHTML = str

// 	el_cont = document.getElementById(contClsName);

// 	// 取消按钮
// 	document.querySelector('#btn-area-cancel').onclick = function() {
// 		close()
// 	}

// 	// 确定按钮
// 	document.querySelector('#btn-area-ok').onclick = function() {
// 		var ev = new Event('onSel')
// 		ev.data = selDataMgr.getAllSelVal()
// 		el_cont.dispatchEvent(ev)
// 		close()
// 	}
// }

/* 彼此间没有联动的多级选择器（比如：生日选择器）*/
export var initV2 = function(data, blockNum) {
	if(selDataMgr && selDataMgr.getData() == data) {
		console.log('重复初始化')
		return 
	}

	if(data instanceof Array) {
		selDataMgr = new SelDataV2()
	}
	else {
		selDataMgr = new SelData()	
	}
	selDataMgr.setData(data, blockNum)
	selScroll = null
	var el = document.getElementById(contClsName)
	if(el) {
		el.remove()
	}

	var str = ''
	str += `
	<div class="sarea">
		<div class="sarea-hd">
			<span id="btn-area-cancel" class="btn-area">取消</span>
			<span id="btn-area-ok" class="btn-area">确认</span>
		</div>

		<div class="sarea-bd">
			<div id="selmask" class="selmask"></div>
		</div>
	</div>
	`
	// 
	let node = document.createElement("div");
	node.className = node.id = contClsName
	node.innerHTML = str
	document.body.appendChild(node)
	initEm(node)

	el_cont = node

	// 取消按钮
	document.querySelector('#btn-area-cancel').onclick = function() {
		close()
	}

	// 确定按钮
	document.querySelector('#btn-area-ok').onclick = function() {
		var ev = new Event('onSel')
		ev.data = selDataMgr.getAllSelVal()
		el_cont.dispatchEvent(ev)
		close()
	}
}

//step 2 添加选中回调函数
export var addSelEventListener = function(cbFunc, that) {
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
// export var open = function(ary) {
// 	if(el_cont == null) {
// 		console.error('sarea 还没初始化')
// 		return
// 	}

// 	utils.addClass(el_cont, showContClsName) 
// 	if(selScroll == null) {
// 		selDataMgr.initSelAry(ary)
// 		let el_blockBd = el_cont.querySelector('.sarea-bd')
// 		selScroll = new SelScroll(el_blockBd, selDataMgr.getBlockNum() - 1, 1, true)
// 	}
// 	else if(ary) {
// 		selDataMgr.initSelAry(ary)
// 	}

// 	selScroll.updateList()
// }

//step 3 打开选择器
// @param defAry : 默认选中的值 ['aa', 'bb']
export var openV2 = function(defAry) {
	if(el_cont == null) {
		console.error('sarea 还没初始化')
		return
	}

	selDataMgr.initSelAry(defAry)
	utils.addClass(el_cont, showContClsName) 
	if(selScroll == null) {
		let el_blockBd = el_cont.querySelector('.sarea-bd')
		selScroll = new SelScroll(el_blockBd, selDataMgr)
	}
	selScroll.updateList()
}

//step 4 关闭选择器
export var close = function() {
	if(el_cont == null) {
		return
	}
	utils.removeClass(el_cont, showContClsName) 
}