/*
非联动的选择数据
*/ 

class SelDataV2 {
	constructor() {
		this.listData;
		this.blockNum; 
		this.selValAry;
		this.selTagAry;
	}

	setData(listData) {
		this.listData = listData
		this.blockNum = this.listData.length
	}

	getBlockNum() {
		return this.blockNum
	}

	// kone todo 
	initSelAry(ary) {
		ary = ary || []
		ary.splice(0, 0, '');
		this.selValAry = ary

		this.selTagAry = []
		for(let idx = 0; idx < this.selValAry.length; idx++) {
			this.selTagAry.push(-1)
		}
	}

	setSel(bId, tag, val) {
		this.selValAry[bId] = val
		this.selTagAry[bId] = tag
	}

	// 获取多级选择器选择列表
	getAllSelVal() {
		return this.selValAry
	}

	// 
	getSelValById(bId) {
		return this.selValAry[bId]
	}


	// 根据数据的key值列表，获取当前级的数据
	// @param: ['', 'aa', 'bb']
	// @return : json 
	getValByKeyAry(keyAry) {
		let data = this.listData;
		for(let idx = 1; idx < keyAry.length; idx++) {
			let key = keyAry[idx]
			if(data[key] && data[key].items) {
				data = data[key].items
			}
			else {
				break
			}
		}
		return data
	}

	//
	getListDataById(bId) {			
		return this.listData[bId - 1]
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

	// 获取一个json 对象的第一项 key值
	getFirstKey(data) {
		for(let key in data) {
			return key
		}
		return ''
	}
}
export var selDataV2 = new SelDataV2()

