# 多级联动选择器插件
	areaData.js  //省 市 区 三级联动选择数据
	sarea.js
    sarea.css
    
###### 所用框架、技术：
1. html5 + less；
2. 用es6写源代码；
3. webpack 打包代码,目标代码为es5；
4. css 用 em 做单位；

    
###### 开发步骤：
1. 打开项目，运行 npm start (可以双击start.bat 运行)，npm start 执行的是 webpack --watch。
2. 然后你就可以敲代码了，保存代码webpack会自动编译打包到 public/sarea.js



######  使用例子： 请看index.html


#### warinig && todo:
	1. 一旦设置el_block.scrollTop = xxx , 那么el_block的onScroll事件就会触发

