/**
 * 用于生成Grid的Columns的类
 */

Ext.define('app.view.module.factory.ColumnsFactory', {

			statics : {
				getColumns : function(moduleModel, schemeOrderId) {

					var scheme = moduleModel.get('tf_gridSchemes')[0]; // 取得第一个grid的方案
					var columns = [];
					for (var i in scheme.tf_schemeGroups) {
						var sg = scheme.tf_schemeGroups[i];
						// 是否需要显示分组
						var isgroup = sg.tf_isShowHeaderSpans;
						var group = {
							gridGroupId : sg.tf_gridGroupId,
							text : sg.tf_gridGroupName,
							locked : sg.tf_isLocked,
							// flex : 1,
							columns : []
						}
						for (var j in sg.tf_groupFields) {
							var gf = sg.tf_groupFields[j];
							var fd = moduleModel.getFieldDefine(gf.tf_fieldId);
							var field;
							if (fd.tf_isHidden)
								continue;
							field = this.getColumn(gf, fd, moduleModel);
							field.locked = sg.tf_isLocked;
							if (isgroup) {
								this.canReduceTitle(group, field);
								group.columns.push(field);
							} else
								columns.push(field);
						}
						if (isgroup) {
							this.canReduceTitle(group, field);
							columns.push(group);
						}
					}
					console.log(columns)
					return columns;
				},

				// 看看分组名称是不是 下面column 的开头，如果是开头的话，并且columntitle 后面有内容，就把
				// 相同的部分截掉
				canReduceTitle : function(group, field) {
					if (field.text.indexOf(group.text) == 0) {
						field.text = field.text.slice(group.text.length).replace('(', '')
								.replace(')', '').replace('（', '').replace('）', '');
						if (field.text.indexOf("<br/>") == 0)
							field.text = field.text.slice(5);
					}
				},

				/**
				 * 根据groupField,fieldDefine的定义，生成一个column的定义
				 */
				getColumn : function(gf, fd, module) {

					// console.log(fd);
					var ft = fd.tf_title.replace(new RegExp('--', 'gm'), '<br/>');
					if (fd.tf_unitText)
						ft += '<br/>(' + fd.tf_unitText + ')';

					var field = {
						filter : {},
						maxWidth : 800,
						gridFieldId : gf.tf_gridFieldId, // 加上这个属性，用于在列改变了宽度过后，传到后台
						sortable : true,
						text : ft,
						dataIndex : fd.tf_fieldName,
						editor : {},
						gridField : gf,
						fieldDefine : fd
					}

					switch (fd.tf_fieldType) {
						case 'Date' :
							Ext.apply(field, {
										xtype : 'datecolumn',
										align : 'center',
										width : 100,
										renderer : Ext.util.Format.dateRenderer,
										// formatter : 'dateRenderer', //
										// 定义在Ext.util.Format中的渲染函数可以用这种方法调用
										editor : { // 如果需要行内修改，需要加入此属性
											xtype : 'datefield',
											format : 'Y-m-d',
											editable : false
										}
									});
							break;

						case 'Datetime' :
							Ext.apply(field, {
								xtype : 'datecolumn',
								align : 'center',
								width : 130,
								renderer : Ext.util.Format.dateRenderer
									// formatter : 'dateRenderer'
								});
							break;

						case 'Boolean' :
							field.xtype = 'checkcolumn';
							field.stopSelection = false;
							field.processEvent = function(type) { // 加入这一句，可以防止点中修改
								if (type == 'click')
									return false;
							};
							break;

						case 'Integer' :
							Ext.apply(field, {
										align : 'right',
										xtype : 'numbercolumn',
										format : '#',
										renderer : Ext.util.Format.intRenderer,
										// formatter : 'intRenderer',
										editor : {
											xtype : 'numberfield'
										}
									});
							break;

						case 'Double' :
							Ext.apply(field, {
										align : 'right',
										xtype : 'numbercolumn',
										width : 110,
										renderer : fd.tf_isCurrency
												? Ext.util.Format.monetaryRenderer
												: Ext.util.Format.floatRenderer, // 由于要在renderer中用到rd.style,不能用下面的方法
										// formatter : fd.tf_isCurrency // 判断是否是金额类型的
										// ? 'monetaryRenderer'
										// : 'floatRenderer', // 这种方法也可以
										editor : {
											xtype : 'numberfield'
										}
									});
							break;

						case 'Float' :
							Ext.apply(field, {
								align : 'right',
								xtype : 'numbercolumn',
								width : 110,
								renderer : Ext.util.Format.floatRenderer
									// formatter : 'floatRenderer' // 这种方法不可以
								});
							break;

						case 'Percent' :
							Ext.apply(field, {
								align : 'center',
								minWidth : 80,
								renderer : Ext.util.Format.percentRenderer,
								// xtype : 'widgetcolumn', // 这里注释掉的是extjs5自带的百分比类型的显示方法
								// widget : {
								// xtype : 'progressbarwidget',
								// textTpl : ['{percent:number("0.00")}%']
								// },
								editor : {
									xtype : 'numberfield',
									step : 0.01
								},
								width : 110
									// 默认宽度
								})
							break;

						case 'String' :
							// 如果这个字段是此模块的nameFields则加粗显示
							if (module.get('tf_nameFields') == fd.tf_fieldName)
								Ext.apply(field, {
											text : '<strong>' + fd.tf_title + '</strong>',
											renderer : Ext.util.Format.nameFieldRenderer
										});
							else
								Ext.apply(field, {});
							break;

						default :
							break;
					}

					if (field.xtype == 'numbercolumn') {
						Ext.apply(field, {
									listeners : { // 将标题栏的内容居中，靠右的话有时候显示不全
										render : function(column) {
											column.getEl().removeCls('x-column-header-align-right');
											column.getEl().addCls('x-column-header-align-center');
											column.removeListener('rencer');
										}
									}
								})
					}

					if (fd.tf_allowSummary) {
						Ext.apply(field, {
									hasSummary : true,
									summaryType : 'sum'
								})
					}

					if (gf.tf_columnWidth > 0)
						field.width = gf.tf_columnWidth;
					else if (gf.tf_columnWidth == -1) {
						field.flex = 1;
						field.minWidth = 120;
					}
					return field;
				}
			}
		});
