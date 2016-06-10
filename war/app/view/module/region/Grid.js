/**
 * 模块数据的主显示区域，继承自Grid
 */

Ext.define('app.view.module.region.Grid', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.modulegrid',
			uses : ['app.view.module.region.GridToolbar',
					'app.view.module.factory.ColumnsFactory'],

			requires : ['Ext.selection.CellModel', 'Ext.grid.*', 'Ext.data.*',
					'Ext.util.*'],

			bind : {
				title : '{tf_title} {selectedNames}' // 数据绑定到ModuleModel中的tf_title 和
				// 选中记录的名称
			},

			tools : [{
						type : 'gear'
					}],

			columnLines : true, // 加上表格线
			multiSelect : true,

			listeners : {
				selectionChange : 'selectionChange'
			},

			initComponent : function() {

				var viewModel = this.up('modulepanel').getViewModel();
				this.store.modulegrid = this;

				this.cellEditing = new Ext.grid.plugin.CellEditing({
							clicksToEdit : 2
						});
				this.plugins = [this.cellEditing];

				this.viewConfig = {
					stripeRows : true, // 奇偶行不同底色
					enableTextSelection : false,
					// 加入允许拖动功能
					plugins : [{
						ptype : 'gridviewdragdrop',
						ddGroup : 'DD_grid_' + viewModel.get('tf_moduleName'), // 拖动分组必须设置，这个分组名称为:DD_grid_Globbal
						enableDrop : false  // 设为false，不允许在本grid中拖动
						}]

				};

				// 创建grid列
				this.columns = app.view.module.factory.ColumnsFactory.getColumns(
						viewModel, 10);

				this.dockedItems = [{
							xtype : 'gridtoolbar', // 按钮toolbar
							dock : 'top',
							grid : this
						}, {
							xtype : 'pagingtoolbar',
							store : this.store,
							displayInfo : true,
							prependButtons : true,
							dock : 'bottom'

						}];

				this.callParent();
			},

			/**
			 * 在选中的记录发生变化时，修改当前title，这是不用MVVM特性的做法
			 */
			refreshTitle : function() {
				var viewModel = this.up('modulepanel').getViewModel();
				var selected = this.getSelectionModel().getSelection();
				var title = viewModel.get('tf_title');
				if (selected.length > 0) {
					if (!!selected[0].getNameValue())
						title = title + '　〖<em>' + selected[0].getNameValue() + '</em>'
								+ (selected.length > 1 ? ' 等' + selected.length + '条' : '')
								+ '〗';
				}
				this.setTitle(title);
			},

			/**
			 * 重新适应所有列的宽度
			 */
			columnAutoSize : function() {
				Ext.Array.forEach(this.columnManager.getColumns(), function(column) {
							if (!column.resizeDisabled) {
								column.autoSize();
							}
						})
			}

		})
