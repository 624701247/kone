
class SelData {
	constructor() {
		this.listData;
		this.blockNum;
		this.selValAry;
		this.selTagAry;
	}

	setData(listData, blockNum) {
		this.listData = listData
		this.blockNum = blockNum
	}

	getBlockNum() {
		return this.blockNum
	}

	initSelAry(ary) {
		ary = ary || []
			ary.splice(0, 0, '');
		
		//没有设置的，默认选中第一项
		let needDefNum = this.blockNum - (ary.length - 1)
		if(needDefNum > 0) {   
			let tmpData = this.getValByKeyAry(ary)
			for(let idx = 0; idx < needDefNum; idx++) {
				let key = this.getFirstKey(tmpData)
				ary.push(key)
				tmpData = tmpData[key].items
			}
		}

		this.selValAry = ary

		this.selTagAry = []
		for(let idx = 0; idx < this.selValAry.length; idx++) {
			this.selTagAry.push(-1)
		}
	 	// console.log('init', this.selValAry)
	}

	setSel(bId, tag, val) {
		if(this.selValAry[bId] != val) { // 选择有变，子项通通切换到第一项
			this.selValAry[bId] = val	
			this.selTagAry[bId] = tag

			let newNum = this.blockNum - bId
			for(let ii = 0; ii < newNum; ii++) {
				this.selValAry.pop()
				this.selTagAry.pop()
			}

			for(let ii = 0; ii < newNum; ii++) {
				let data = this.getValByKeyAry(this.selValAry)
				let key = this.getFirstKey(data)
				this.selValAry.push(key)
				if(key == '') {
					this.selTagAry.push(-1)	
				}
				else {
					this.selTagAry.push(0)	
				}
			}
		}
		else {
			this.selValAry[bId] = val	
			this.selTagAry[bId] = tag
		}

		console.log('set val',bId, this.selValAry)
		console.log('set tag', this.selTagAry)
	}

	// 获取多级选择器选择列表
	getAllSelVal() {
		return this.selValAry
	}


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
		let keyAry = []
		for(let idx = 0; idx < bId; idx++)  {
			keyAry.push(this.selValAry[idx])
		}
		// console.log('aa' , keyAry)
		return this.getValByKeyAry(keyAry)
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
export var selData = new SelData()
