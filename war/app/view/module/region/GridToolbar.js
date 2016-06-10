/**
 * 一个模块的grid上面显示的toolbar,里面放置了各种操作按钮 暂时还没有考虑到权限
 */
Ext.define('app.view.module.region.GridToolbar', {
			extend : 'Ext.toolbar.Toolbar',
			alias : 'widget.gridtoolbar',
			uses : ['app.ux.GridSearchField'],
			initComponent : function() {
				var viewModel = this.up('modulepanel').getViewModel();
				this.items = [{
							text : '显示',
							glyph : 0xf022
						}, {
							text : '新增',
							xtype : 'splitbutton',
							itemId : 'new',
							glyph : 0xf016,
							menu : [{
										text : '复制新增',
										tooltip : '新增时先将当前记录添入到新记录中',
										itemId : 'newwithcopy',
										glyph : 0xf0c5,
										listeners : {
											click : 'addRecordWithCopy'
										}
									}, '-', {
										text : '上传Excel表单条新增',
										tooltip : '根据指定的excel表添好数据后，上传新增一条记录',
										glyph : 0xf062
									}, {
										text : '上传Excel表批量新增',
										tooltip : '根据下载的Excel表中的要求添加数据后，上传批量新增数据',
										glyph : 0xf062
									}],
							listeners : {
								click : 'addRecord', // 这里不要用handler，而要用click,因为下面要发送click事件
								// 删除按钮在渲染后加入可以Drop的功能
								render : function(button) {
									// 可以使Grid中选中的记录拖到到此按钮上来进行复制新增
									button.dropZone = new Ext.dd.DropZone(button.getEl(), {
												// 此处的ddGroup需要与Grid中设置的一致
												ddGroup : 'DD_grid_' + viewModel.get('tf_moduleName'),

												getTargetFromEvent : function(e) {
													return e.getTarget('');
												},
												// 用户拖动选中的记录经过了此按钮
												onNodeOver : function(target, dd, e, data) {
													return Ext.dd.DropZone.prototype.dropAllowed;
												},
												// 用户放开了鼠标键，删除记录
												onNodeDrop : function(target, dd, e, data) {
													var b = button.menu.down('#newwithcopy');
													b.fireEvent('click', b);
												}
											})
								}
							}
						}, {
							text : '修改',
							glyph : 0xf044,
							itemId : 'edit'
						}, {
							text : '删除',
							disabled : true,
							glyph : 0xf014,
							itemId : 'delete',
							listeners : {
								click : 'deleteRecords', // 这里不要用handler，而要用click,因为下面要发送click事件
								// 删除按钮在渲染后加入可以Drop的功能
								render : function(button) {
									// 可以使Grid中选中的记录拖到到此按钮上来进行删除
									button.dropZone = new Ext.dd.DropZone(button.getEl(), {
												// 此处的ddGroup需要与Grid中设置的一致
												ddGroup : 'DD_grid_' + viewModel.get('tf_moduleName'),

												// 这个函数没弄明白是啥意思,没有还不行
												getTargetFromEvent : function(e) {
													return e.getTarget('');
												},
												// 用户拖动选中的记录经过了此按钮
												onNodeOver : function(target, dd, e, data) {
													return Ext.dd.DropZone.prototype.dropAllowed;
												},
												// 用户放开了鼠标键，删除记录
												onNodeDrop : function(target, dd, e, data) {
													button.fireEvent('click', button); // 执行删除按钮的click事件
												}
											})
								}
							}
						}, '-', {
							glyph : 0xf0c6,
							xtype : 'splitbutton',
							menu : [{
										text : '新增附件',
										glyph : 0xf093
									}, '-', {
										text : '预览所有附件',
										glyph : 0xf03e
									}, '-', {
										text : '下载所有附件',
										glyph : 0xf019
									}]
						}, {
							glyph : 0xf080,
							tooltip : '图表分析'
						}, {
							xtype : 'splitbutton',
							glyph : 0xf1c3,
							menu : [{
										text : '列表导出至excel',
										glyph : 0xf1c3
									}, '-', {
										text : '选中记录导出至excel',
										glyph : 0xf1c3
									}]
						}, {
							xtype : 'splitbutton',
							glyph : 0xf02f,
							menu : [{
										text : '打印当前页',
										glyph : 0xf02f
									}, {
										text : '打印所有记录',
										glyph : 0xf02f
									}]
						}, '-', '筛选', {
							width : 60,
							xtype : 'gridsearchfield',
							// store : this.grid.getStore() // 现在用的local数据，不可以进行筛选
							store : Ext.create('Ext.data.Store', {
										proxy : {
											type : 'rest'
										}
									})
						}];
				this.callParent();
			}
		})