/**
 * 模块的数据模型
 */

Ext.define('app.view.module.ModuleModel', {
			extend : 'Ext.app.ViewModel',
			alias : 'viewmodel.module',

			// 在开发过程中我先用设定好的值放于data中，等以后自定义的时候，data里的值都是从后台取得的
			// 所有数据库里的字段，我都以tf_开头，只是为了表示这是从后台读取过来的

			data : {

				tf_moduleId : '1010', // 模块ID号：一个数字的ID号，可以根据此ID号的顺序将相同分组的模块放在一块。
				tf_ModuleGroup : '工程管理',// 模块分组：模块分到哪个组里，比如说业务模块1、业务模块2、系统设置、系统管理等。
				tf_moduleName : 'Global', // 模块标识：系统中唯一的模块的标识
				tf_title : '工程项目',// 模块名称：能够描述此模块信息的名称。
				tf_glyph : 0xf0f7, // 图标字符值
				tf_shortname : null,// 模块简称：如果名称过长，有些地方可以用简称来代替。
				tf_englishName : null,// 模块英文名称：万一要制作英文版，可以用英文名称。
				tf_englishShortName : null, // 模块英文简称：可以用作生成编码字段。
				tf_description : null,// 模块描述：
				tf_remark : null,
				// 备注：

				// 下面还有若干字段未加入，以后用到的时候再加入
				tf_primaryKey : 'tf_id', // 主键
				tf_nameFields : 'tf_name', // 可用于描述记录的字段

				// 此模块的自定义字段，此处先用手工定义，以后换成从数据库中自动取得
				tf_fields : [{
					tf_fieldId : 10100010, // 此字段的id值，所有的字段都是保存在一字段表中，这是主键值
					tf_fieldName : 'tf_id',// 字段名
					tf_title : '序号',// 字段描述
					tf_fieldType : 'Integer', // 字段类型
					tf_isHidden : false, // 是否是隐藏字段
					tf_fieldGroup : '工程基本信息' // 字段分组
						// 是否是隐藏字段
					}, {
					tf_fieldId : 10100020,
					tf_fieldName : 'tf_name',
					tf_title : '工程项目名称',
					tf_fieldType : 'String',
					tf_fieldLen : 50,
					tf_isRequired : true, // 是否是必添项
					tf_fieldGroup : '工程基本信息'

				}, {
					tf_fieldId : 10100030,
					tf_fieldName : 'tf_code',
					tf_title : '工程项目编码',
					tf_fieldType : 'String',
					tf_fieldLen : 20,
					tf_isRequired : true,
					tf_fieldGroup : '工程基本信息' // 字段分组

				}, {
					tf_fieldId : 10100040, // 加入一个整型字段
					tf_fieldName : 'tf_squaremeter',
					tf_title : '建筑面积',
					tf_fieldType : 'Integer',
					tf_unitText : '平米', // 字段单位
					tf_fieldGroup : '工程附加信息',
					tf_allowSummary : true
						// 可以对此字段进行小计
					}, {
					tf_fieldId : 10100050, // 加入一个金额字段
					tf_fieldName : 'tf_budget',
					tf_title : '投资总额',
					tf_fieldType : 'Double',
					tf_isCurrency : true, // 此字段是一个金额字段
					tf_fieldGroup : '工程附加信息',
					tf_allowSummary : true
				}, {
					tf_fieldId : 10100060, // 加入一个百分比字段
					tf_fieldName : 'tf_rjl',
					tf_title : '容积率',
					tf_fieldType : 'Percent',
					tf_fieldGroup : '工程附加信息'
				}, {
					tf_fieldId : 10100070, // 加入一个日期
					tf_fieldName : 'tf_startDate',
					tf_title : '计划--开工--时间',
					tf_fieldType : 'Date',
					tf_fieldGroup : '工程附加信息'
				}, {
					tf_fieldId : 10100080, // 加入一个日期
					tf_fieldName : 'tf_endDate',
					tf_title : '计划竣工时间',
					tf_fieldType : 'Date',
					tf_fieldGroup : '工程附加信息'
				}, {
					tf_fieldId : 10100090, // 加入一个布尔字段
					tf_fieldName : 'tf_isValid',
					tf_title : '是否通--过验收',
					tf_fieldType : 'Boolean',
					tf_fieldGroup : '工程附加信息'
				}, {
					tf_fieldId : 10100100, // 加入一个数值字段
					tf_fieldName : 'tf_m3',
					tf_title : '工程方量',
					tf_fieldType : 'Double',
					tf_fieldGroup : '工程附加信息'
				}],

				// 模块的grid方案，可以定义多个方案
				tf_gridSchemes : [{
							tf_schemeOrder : 10,
							tf_schemeName : 'Grid方案1', // 第一个grid方案
							// 表头分组
							tf_schemeGroups : [{
										tf_gridGroupId : 1, // id号
										tf_gridGroupOrder : 10, // 表头分组序号
										tf_gridGroupName : '工程项目基本信息',
										tf_isShowHeaderSpans : true, // 是否显示分组
										tf_isLocked : true, // 是否锁定此分组
										// 每一个表头分组下面的字段
										tf_groupFields : [{
											tf_gridFieldOrder : 5,
											tf_fieldId : 10100010
												// 工程id号
											}, {
											tf_gridFieldOrder : 10,
											tf_fieldId : 10100020, // 工程项目名称字段
											tf_columnWidth : 200
										}, {
											tf_gridFieldOrder : 20,
											tf_fieldId : 10100030, // 工程项目编码字段
											tf_columnWidth : 120
										}]
									}, {
										tf_gridGroupOrder : 20, // 表头分组序号
										tf_gridGroupName : '工程项目附加信息',
										tf_isShowHeaderSpans : true, // 是否显示headerspan
										tf_isLocked : false, // 是否锁定此分组
										// 每一个表头分组下面的字段
										tf_groupFields : [{
											tf_gridFieldOrder : 10,
											tf_fieldId : 10100040
												// 建筑面积
											}, {
											tf_gridFieldOrder : 20,
											tf_fieldId : 10100050
												// 投资总额
											}, {
											tf_gridFieldOrder : 30,
											tf_fieldId : 10100060
												// 容积率
											}, {
											tf_gridFieldOrder : 40,
											tf_fieldId : 10100070
												// 计划开工时间
											}, {
											tf_gridFieldOrder : 50,
											tf_fieldId : 10100080
												// 计划竣工时间
											}, {
											tf_gridFieldOrder : 60,
											tf_fieldId : 10100090, // 是否通过验收
											tf_columnWidth : 80
										}, {
											tf_gridFieldOrder : 70,
											tf_fieldId : 10100100
												// 工程方量
											}]
									}]

						}],
						
				selectedNames : ''   //选中的记录的names显示在title上

			},

			// 根据字段id,找到字段相应的定义
			getFieldDefine : function(fieldId) {
				var result = null;
				Ext.Array.each(this.data.tf_fields, function(field) {
							if (field.tf_fieldId == fieldId) {
								result = field;
								return false;
							}
						});
				return result;
			}

		})