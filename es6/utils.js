
export function addClass(elId, cls) {
	cls = ' ' + cls
	var el = null
	if(typeof(elId) == "string") {
		el = document.getElementById(elId)
	}
	else {
		el = elId
	}
	if(el.className.indexOf(cls) == -1) {
		el.className += cls
	}
}
export function removeClass(elId, cls) {
	cls = ' ' + cls
	var el = null
	if(typeof(elId) == "string") {
		el = document.getElementById(elId)
	}
	else {
		el = elId
	}
	el.className = el.className.replace(cls, "")
}

// 获取一个json 对象的第一项 key值
export function getFirstKey(data) {
	for(let key in data) {
		return key
	}
	return ''
}



