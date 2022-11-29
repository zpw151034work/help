<template>
	<div class="content">
		<el-tree class="tree" ref="tree" node-key="uuid" :data="treeData" :props="defaultProps" default-expand-all>
			<div class="custom-tree-node" slot-scope="{ node, data }">
				<div @click="toDiv(data.uuid)">{{ data.text }}</div>
				<!-- <a class="anchor" :href="`#${data.uuid}`">
					{{ data.text }}
				</a> -->
			</div>
		</el-tree>
		<div v-html="content" class="markdown-body html-content"></div>
	</div>
</template>

<script>
    import $ from 'jquery'
	import "github-markdown-css"
	import hljs from 'highlight.js'
	import 'highlight.js/styles/atom-one-light.css' //引入一种语法的高亮
	import {
		marked
	} from 'marked'
	export default {
		data() {
			return {
				treeData: [],
				defaultProps: {
					label: 'text',
					children: 'children',
				},
				textData: "# JavaScript高级程序设计\n## 内容简介\n   本书是JavaScript经典图书的新版。第4版全面、深入地介绍了JavaScript开发者必须掌握的前端开发技术，涉及JavaScript的基础特性和高级特性。书中详尽讨论了JavaScript的各个方面，从JavaScript的起源开始，逐步讲解到新出现的技术，其中重点介绍ECMAScript和DOM标准。在此基础上，接下来的各章揭示了JavaScript的基本概念，包括类、期约、迭代器、代理，等等。另外，书中深入探讨了客户端检测、事件、动画、表单、错误处理及JSON。本书同时也介绍了近几年来涌现的重要新规范，包括Fetch API、模块、工作者线程、服务线程以及大量新API。\n## 作者简介\n马特·弗里斯比（Matt Frisbie），Stealth Startup公司CTO，曾担任谷歌公司软件工程师，精通前端技术，拥有十余年Web开发经验，除本书外另著有AngularJS等前端主题图书。毕业于伊利诺伊大学厄巴纳-尚佩恩分校。\n## 目录\n### 第 1章　什么是JavaScript 1\n#### 1.1　简短的历史回顾 1\n#### 1.2　JavaScript实现 2\n#### 1.3　JavaScript版本 9\n#### 1.4　小结 10\n### 第 2章　HTML中的JavaScript 11\n#### 2.1　script元素 11\n#### 2.2　行内代码与外部文件 18\n#### 2.3　文档模式 18\n#### 2.4　noscript元素 19\n测试代码\n``` javascript\nvar a = 1;\n\nfunction fun(){\n  console.log(11111)\n}\nfun()\nconosole.log(a)\n```\n\n#### 2.5　小结 20\n### 第3章　语言基础 21\n#### 3.1　语法 21\n#### 3.2　关键字与保留字 23\n#### 3.3　变量 24\n#### 3.4　数据类型 30\n#### 3.5　操作符 56\n#### 3.6　语句 73\n#### 3.7　函数 80\n#### 3.8　小结 82\n### 第4章　变量、作用域与内存 83\n#### 4.1　原始值与引用值 83\n#### 4.2　执行上下文与作用域 87\n#### 4.3　垃圾回收 94\n#### 4.4　小结 101"
			}
		},
		created() {
			this.$nextTick(() => {
				this.getCatalog()
				hljs.highlightAll()
			})
		},
		computed: {
			content() {
				return marked(this.textData)
			}
		},
		methods: {
			// 根据内容获取目录
			getCatalog() {
				const h = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
				var elements = $(':header')
				let hElements = []
				for (const key of elements) {
					if (h.indexOf(key.localName) > -1) {
						let text
						if (key.children && key.children.length) {
							text = this.getText(key.children)
						} else {
							text = key.innerHTML
						}
						hElements.push({
							hLevel: parseInt(key.localName[1]),
							text,
							id: key.localName,
							uuid: key.id,
						})
					}
				}
				// console.log('hElements:', hElements)
				let result = this.toTree(hElements)
				this.treeData = result

				// 目录默认选中第一个
				this.$nextTick(() => {
					if (!result) return
					this.$refs.tree.setCurrentKey(result[0].uuid)
				})
				// console.log('result:', result)
			},
			toTree(flatArr) {
				var tree = []
				var copyArr = flatArr.map(function(item) {
					return item
				})

				// 根据指定级别查找该级别的子孙级，并删除掉已经查找到的子孙级
				var getChildrenByLevel = function(currentLevelItem, arr, level) {
					if (!currentLevelItem) {
						return
					}
					// 将level值转成负数，再进行比较
					var minusCurrentLevel = -currentLevelItem.hLevel
					var children = []
					for (var i = 0, len = arr.length; i < len; i++) {
						var levelItem = arr[i]
						if (-levelItem.hLevel < minusCurrentLevel) {
							children.push(levelItem)
						} else {
							// 只找最近那些子孙级
							break
						}
					}
					// 从数组中删除已经找到的那些子孙级，以免影响到其他子孙级的查找
					if (children.length > 0) {
						arr.splice(0, children.length)
					}
					return children
				}

				var getTree = function(result, arr, level) {
					// 首先将数组第一位移除掉，并添加到结果集中
					var currentItem = arr.shift()

					currentItem.level = level
					result.push(currentItem)
					while (arr.length > 0) {
						if (!currentItem) {
							return
						}
						// 根据当前级别获取它的子孙级
						var children = getChildrenByLevel(currentItem, arr, level)
						// 如果当前级别没有子孙级则开始下一个
						if (children.length == 0) {
							currentItem = arr.shift()
							currentItem.level = level
							if (currentItem) {
								result.push(currentItem)
							}
							continue
						}
						currentItem.children = []
						// 查找到的子孙级继续查找子孙级
						getTree(currentItem.children, children, level + 1)
					}
				}
				getTree(tree, copyArr, 1)
				return tree
			},
			getText() {
				let result = null
				if (!arr.length) return
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].children && arr[i].children.length) {
						result = this.getText(arr[i].children)
					} else {
						result = arr[i].innerHTML
					}
				}

				return result
			},
			toDiv(uuid) {
				document.getElementById(uuid).scrollIntoView({
					behavior: 'smooth',
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		/* padding: 30px; */
		overflow: hidden;
		height: 100vh;
	}

	.tree {
		margin-right: 15px;
		overflow-y: auto;
		width: 280px;
		flex-shrink: 0;
	}

	.html-content {
		overflow-y: auto;
	}
</style>
