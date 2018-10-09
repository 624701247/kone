
export var addClass = function(elId, cls) {
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
export var removeClass = function(elId, cls) {
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



