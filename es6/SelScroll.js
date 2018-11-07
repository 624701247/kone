import * as utils from "./utils"

import {selData} from "./SelData"
import {selDataV2} from "./SelDataV2"


var createBlockStr = function(idName) {
	let node = document.createElement('div')
	node.id = idName
	node.className = 'block ' + idName
	node.innerHTML = '<ul class="sarea-list"></ul>'
	return node
}

export class SelScroll {

	// @param el_parent : 父节点dom对象
	// @param bId : 第 n 级   从 0 开始
	constructor(el_parent, slData, bId) {
		this.bId = bId || 0
		this.listData = null
		this.slData = slData
		this.isAss = slData.getIsAss() //是否是联动的

		let node = createBlockStr('block-' + this.bId)
		el_parent.appendChild(node)

		
		var childNum = this.slData.getBlockNum() - this.bId - 1
		if(childNum > 0) {
			this.subSelScroll = new SelScroll(el_parent, this.slData, this.bId + 1)
		}
		else {
			this.subSelScroll = null
		}

		// 
		this.el_cont = node

		this.el_list = this.el_cont.querySelector('.sarea-list')

		this.el_items = null //项目列表
		this.itemHei = null  //项目高度

		this.slowAniTimer = null  //缓动停下动画定时器
		this.inSlowAni = false    //缓动停下动画中，请等待

		this.inTouch = false  //是否在触摸操作中
		this.maxTop = 0 //可以设置的最高 scrollTop值  设置超过该值得到结果是 scrollTop为该值

		this.startTimeStamp = 0 //触摸开始时间戳
		this.startClientY = 0   //触摸开始y坐标
		this.curMoveClientY = 0 //移动中y坐标

		this.el_cont.addEventListener("touchstart", this.onTouchStart.bind(this), true);
	    this.el_cont.addEventListener("touchmove", this.onTouchMove.bind(this), false);
	    this.el_cont.addEventListener("touchend", this.onTouchEnd.bind(this), true);
	}

	onTouchStart(ev) {
		//  kone point : 
		// console.log('start screenX', ev.targetTouches[0].screenY)  //相对于设备屏幕
		// console.log('start pageX', ev.targetTouches[0].pageY) // ??
		// console.log('start pageX', ev.targetTouches[0].clientY) // ??
		// clog('多操作' + ev.changedTouches.length)

		ev.preventDefault();
		if(this.inSlowAni) {
			return
		}
		this.inTouch = true

		// kone todo 屏蔽多指操作
		// if(ev.changedTouches.length > 1) {
		// }

		var touch = ev.changedTouches[0]
		this.startTimeStamp = ev.timeStamp
		this.startClientY = touch.clientY
		this.curMoveClientY = touch.clientY
	}
	onTouchMove(ev) {
		ev.preventDefault();
		if(!this.inTouch) {
			return
		}

		// var touch = ev.changedTouches[0]
		this.drag(ev, false)
	}
	onTouchEnd(ev) {
		ev.preventDefault();
		if(!this.inTouch) {
			this.inTouch = false
			return
		}
		this.inTouch = false

		var touch = ev.changedTouches[0]
		var timeDif = Math.abs(ev.timeStamp - this.startTimeStamp) //时间差值
		var destDif = Math.abs(touch.clientY - this.startClientY) //位置差值
		if(timeDif < 250 &&  destDif < this.itemHei) {
			// clog('点击') //kone todo
			this.drag(ev, true)
		}
		else if(timeDif < 300 && destDif >= this.itemHei * 2) { //kone todo
			var dir;
			if(touch.clientY > this.startClientY) {
				// clog('往下滑动')
				dir = -1
			}
			else {
				// clog('往上滑动')
				dir = 1
			}

			// var rate = 100 - Math.ceil(timeDif / 400 * 100) 
			var tt = 1 - (timeDif / 300)            // 0 -- 1 慢 -- 快
			var dd = destDif / (this.itemHei * 10)  // 0 -- 1 短 -- 长
			var rate = Math.ceil(dd * tt * 100)
			// clog('rate' + rate)
			this.slide(ev, dir, rate)
		}
		else {
			// clog('拖动')
			this.drag(ev, true)
		}
	}

	// 拖动操作
	drag(ev, isEnd) {
		var touch = ev.changedTouches[0]
		var newClientY = touch.clientY
		var target = ev.currentTarget
		var newTop = target.scrollTop + this.curMoveClientY - newClientY
		if(newTop < 0) {
			newTop = 0
		}
		if(newTop > this.maxTop) {
			newTop = this.maxTop
		}
		target.scrollTop = newTop
		this.curMoveClientY = newClientY

		if(isEnd) {
			console.log('eee0', newTop)
			this.aniSlowTop(target)
		}
	}

	// 滑动操作
	// @param rate : 0 -- 100 开区间 
	slide(ev, dir, rate) {
		var target = ev.currentTarget//this.el_cont
		var distTop = target.scrollTop + dir * this.maxTop * rate / 100
		if(distTop < 0) {
			distTop = 0
		}
		if(distTop > this.maxTop) {
			distTop = this.maxTop
		}

		var dif = distTop - target.scrollTop
		var step;
		if(dif > 0) {
			step = 30
		}
		else {
			step = -30
		}
		var count = Math.round(Math.abs(dif / step))

		var isEnd = false
		var timer = setInterval(function() {
			count--
			var newTop = target.scrollTop + step
			if(count <= 0) {
				newTop = distTop
				isEnd = true
			}
			target.scrollTop = newTop

			if(isEnd) {
				clearInterval(timer)
				this.aniSlowTop(target)
			}

		}.bind(this), 25)
	}

	// @param target : 动画dom对象
	// @param endTop : 动画结束位置
	aniSlowTop(target) {
		this.inSlowAni = true

		//  更新选中数据 跟 子列表
		var info = this.getCurSelInfo()
		this.slData.setSel(this.bId, info.tag, info.name)
		if(this.subSelScroll && this.isAss) {
			this.subSelScroll.updateList()
		}
		// console.log('级数，列表下表，列表值', this.bId, info.tag, info.name)

		var endTop = info.tag * this.itemHei

		if(target.scrollTop == endTop) {
			this.onAniSlowTopEnd()
			console.log(' == ')
			return 
		}

		utils.addClass(target, 'block-stop')

		var step; 
		var dif = endTop - target.scrollTop
		if(dif > 0) {
			step = 1
		}
		else {
			step = -1
		}

		var count = Math.round(Math.abs(dif / step))

		this.slowAniTimer = setInterval(function() {
			count--
			var newTop = target.scrollTop + step			

			if(count <= 0) {
				target.scrollTop = endTop

				utils.removeClass(target, 'block-stop')
				clearInterval(this.slowAniTimer)
				this.slowAniTimer = null 			 	
			 	this.onAniSlowTopEnd()
			}
			else {
				target.scrollTop = newTop
			}
		}.bind(this), 25)
	}
	onAniSlowTopEnd(tag) {
		setTimeout(function() {
			this.inSlowAni = false
		}.bind(this), 80)
	}

	//
	updateMaxTop() {
		utils.removeClass(this.el_cont, 'block-stop')
		this.el_cont.scrollTop = 0
		this.maxTop = this.el_list.clientHeight - this.el_cont.clientHeight
	}

	setCurSel(curIdx) {
		this.el_cont.scrollTop = (curIdx) * this.itemHei
	}


	// 创建列表
	addList() {
		let count = 0
		let str = ''
		str += this.createItem('', ++count)
		str += this.createItem('', ++count)
		for(let key in this.listData)  {
			str += this.createItem(key, ++count)
		}
		str += this.createItem('', ++count)
		str += this.createItem('', ++count)
		this.el_list.innerHTML = str
	}

	// 创建选择项
	createItem(val, id) {
		return '<li id="sarea-item-' + id + '" class="sarea-item sarea-item-' + this.bId + '">' + val + '</li>'
	}

	//更新列表内容
	updateList() {
		this.listData = this.slData.getListDataById(this.bId)
		this.addList()

		this.el_items = this.el_list.getElementsByClassName('sarea-item')
		if(this.itemHei == null) {
			// this.itemHei = this.el_items[0].clientHeight //这样会有误差，导致滚到结尾位置不准确
			this.itemHei = this.el_cont.clientHeight  / 5
		}
		this.updateMaxTop()


		let val = this.slData.getSelValById(this.bId)
		let tag = this.slData.getTagByKey(this.listData, val)
		this.setCurSel(tag)

		if(this.subSelScroll) {
			this.subSelScroll.updateList()
		}
	}


	getCurSelInfo() {
		var tag = Math.round(this.el_cont.scrollTop / this.itemHei )

		return {
			tag: tag,
			name: this.el_items[tag + 2].innerHTML
		}
	}
}
