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
		this.tag;
	}

	getIsAss() {
		return true
	}

	setData(listData, blockNum, tag) {
		this.listData = listData
		this.tag = tag || ''

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
	getTag() {
		return this.tag
	}

	getBlockNum() {
		return this.blockNum
	}

	// @param defAry : 默认选中的值 ['aa', 'bb'],如果传空则默认选择第一个
	initSelAry(defAry) {
		defAry = defAry || []
		var curData = this.listData
		for(var idx = 0; idx < this.blockNum; idx++) {
			if( curData == null || (JSON.stringify(curData) == '{}') ) { //
				defAry[idx] = ''
				console.log('abcfd')
			}
			else {
				if( defAry[idx] && curData[defAry[idx]] != null ) { // 默认值存在 并且 能再数据列表中找到该项
					console.log('ddd', defAry)
				}
				else { //没有传默认值则取数据列表第一项
					defAry[idx] = utils.getFirstKey(curData)
					console.log('ccc', defAry)	
				}
				curData = curData[defAry[idx]].items
			}
		}

		this.selValAry = defAry
	}

	setSel(bId, val) {
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
		console.log('bid', bId)	
		var data = this.listData
		for(var idx = 0; idx < bId; idx++) {
			if(this.selValAry[idx]) {
				data = data[this.selValAry[idx]].items
			}
			else {
				return {}
			}
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

