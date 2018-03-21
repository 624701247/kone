import * as utils from "./utils"
import {selData} from "./selData"


var createBlockStr = function(idName) {
	let node = document.createElement('div')
	node.id = idName
	node.className = 'block ' + idName
	node.innerHTML = '<ul class="sarea-list"></ul>'
	return node
}

export class SelScroll {

	// @param el_parent : 父节点dom对象
	// @param childNum: 子项数量
	// @param bId : 第 n 级   从 1 开始
	constructor(el_parent, childNum, bId) {
		let node = createBlockStr('block-' + bId)
		el_parent.appendChild(node)

		this.bId = bId
		this.listData = null

		if(childNum > 0) {
			this.subSelScroll = new SelScroll(el_parent, childNum - 1, bId + 1)
		}
		else {
			this.subSelScroll = null
		}

		// 
		this.el_cont = node
		this.el_cont.onscroll = this.onScroll.bind(this)

		this.el_list = this.el_cont.querySelector('.sarea-list')

		this.el_items = null
		this.itemHei = null

		this.scTimer = null
		this.inSlowAni = false //缓动停下中
		this.curTop = 0
		this.maxTop = 0 //可以设置的最高 scrollTop值  设置超过该值得到结果是 scrollTop为该值
		this.slowAniTimer = null

		this.curTag = 0 //当前第一项的id 从0开始
	}

	//
	updateMaxTop() {
		utils.removeClass(this.el_cont, 'block-stop')
		this.el_cont.scrollTop = 0
		this.maxTop = this.el_list.clientHeight - this.el_cont.clientHeight
		// console.log(this.maxTop, 'max')
	}

	setCurSel(curIdx) {
		this.el_cont.scrollTop = (curIdx) * this.itemHei
	}

	onScroll(ev) {
		if(this.scTimer == null) {
			if(this.inSlowAni == true) {
				return 
			}

			this.curTop = ev.target.scrollTop

			clog('strrt', ev)
			this.scTimer = setInterval(function() {
				this.onScTimer(ev.target)
			}.bind(this), 400)
		}
		else {
			this.curTop = ev.target.scrollTop
			clog('runing', ev.target.scrollTop)
		}
	}

	onScTimer (target) {
		if(this.curTop == target.scrollTop) {
			clog('end', this.curTop)

			this.curTag =  Math.round(target.scrollTop / this.itemHei) //4舍5入
			this.onSel()

			let endTop = this.itemHei * this.curTag
			if(endTop > this.maxTop) {
				endTop = this.maxTop
			}
			if(endTop != target.scrollTop) {
				this.aniSlowTop(target, endTop)
			}

			clearInterval(this.scTimer)
			this.scTimer = null
		}
	}

	// @param target : 动画dom对象
	// @param endTop : 动画结束位置
	aniSlowTop(target, endTop) {	
		this.inSlowAni = true
		utils.addClass(target, 'block-stop')

		let dist = endTop - target.scrollTop
		var step = dist / Math.abs(dist) * 2
		clog('step1', step)

		this.slowAniTimer = setInterval(function() {
			target.scrollTop += step			
			if( (step >= 0 && target.scrollTop >= endTop) ||
				(step < 0 && target.scrollTop <= endTop)   ) {
				target.scrollTop = endTop
				
				clearInterval(this.slowAniTimer)
				this.slowAniTimer = null 

			 	setTimeout(function() {
			 		this.inSlowAni = false
		 			clog('eeee')		
			 	}.bind(this), 100)
			 	
			 	utils.removeClass(target, 'block-stop')
			}
		}.bind(this), 20)
	}

	// 创建列表
	addList() {
		let str = ''
		str += this.createItem('')
		str += this.createItem('')
		for(let key in this.listData)  {
			str += this.createItem(key)
		}
		str += this.createItem('')
		str += this.createItem('')
		this.el_list.innerHTML = str
	}

	// 创建选择项
	createItem(val) {
		return '<li class="sarea-item sarea-item-' + this.bId + '">' + val + '</li>'
	}

	// 
	updateList() {
		this.listData = selData.getListDataById(this.bId)
		this.addList()

		this.el_items = this.el_list.getElementsByClassName('sarea-item')
		if(this.itemHei == null) {
			this.itemHei = this.el_items[0].clientHeight
		}
		this.updateMaxTop()


		let val = selData.getSelValById(this.bId)
		let tag = selData.getTagByKey(this.listData, val)
		this.setCurSel(tag)

		if(this.subSelScroll) {
			this.subSelScroll.updateList()
		}
	}

	// 
	onSel() {
		let selName = this.getSelName()

		selData.setSel(this.bId, this.curTag, selName)

		if(this.subSelScroll) {
			this.subSelScroll.updateList()
		}
	}

	getSelName() {
		return this.el_items[this.curTag + 2].innerHTML
	}

	setCurSel(tag) {
		this.el_cont.scrollTop = (tag) * this.itemHei
	}
}




