/*
非联动的选择数据
*/ 

export class SelDataMgr {
	constructor() {
		this.listData;   //
		this.blockNum;   //级数
		this.selValAry;  //当前选中值列表
	}

	getIsAss() {
		return false
	}

	setData(listData, blockNum) {
		this.listData = listData
		this.blockNum = blockNum || this.listData.length
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
		for(var idx = 0; idx < this.blockNum; idx++) {
			if(defAry[idx] && this.listData[idx][defAry[idx]] != null) {
				continue
			}
			else {
				for(var key in this.listData[idx]) {
					defAry[idx] = key		
					break
				}
			}
		}
		this.selValAry = defAry
	}

	setSel(bId, tag, val) {
		this.selValAry[bId] = val
	}

	// 获取多级选择器选择列表
	getAllSelVal() {
		return this.selValAry	
	}

	// 
	getSelValById(bId) {
		return this.selValAry[bId]
	}

	//
	getListDataById(bId) {			
		return this.listData[bId]
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
