/*
联动选择数据
格式参考 areaData
*/ 
import * as utils from "./utils"

export class SelAssDataMgr {
	constructor() {
		this.listData;
		this.blockNum;
		this.selValAry;
	}

	getIsAss() {
		return true
	}

	setData(listData, blockNum) {
		this.listData = listData

		// 默认级数为数据表中最大层级
		var maxNum = 1;
		var curData = listData
		while(true) {
			var key = utils.getFirstKey(curData)
			if(curData[key].items) {
				maxNum++			
				curData = curData[key].items
			}	
			else {
				break
			}
		}

		this.blockNum = blockNum || maxNum
	}
	getData() {
		return this.listData
	}

	getBlockNum() {
		return this.blockNum
	}

	// @param defAry : 默认选中的值 ['aa', 'bb'],如果传空则默认选择第一个
	initSelAry(defAry) {
		defAry = defAry || []
		var curData = this.listData
		for(var idx = 0; idx < this.blockNum; idx++) {
			if( !(defAry[idx] && curData[defAry[idx]] != null) ) {
				defAry[idx] = utils.getFirstKey(curData)
			}
			curData = curData[defAry[idx]].items
		}

		this.selValAry = defAry
	}

	setSel(bId, tag, val) {
		if(this.selValAry[bId] != val) { // 选择有变，子项通通切换到第一项
			this.selValAry[bId] = val	
			this.initSelAry(this.selValAry)
		}
	}

	// 获取多级选择器选择列表
	getAllSelVal() {
		return this.selValAry
	}


	getSelValById(bId) {
		return this.selValAry[bId]
	}

	// 
	getListDataById(bId) {		
		var data = this.listData
		for(var idx = 0; idx < bId; idx++) {
			data = data[this.selValAry[idx]].items
		}
		return data
	}

	// 根据key值获取该项的位置值
	getTagByKey(data, key) {
		let count = 0
		for(let k in data) {
			if(key == k) {
				break
			}
			count++
		}
		return count
	}
}

