/**
 * 根据module的数据来生成模块的model
 */
Ext.define('app.view.module.factory.ModelFactory', {
			// 静态变量或函数
			statics : {
				// 生成module的model,传入的数据是ModelModel中的data
				getModelByModule : function(moduleModel) {
					console.log('moduleModel');
					console.log(moduleModel);
					var module = moduleModel.data;
					return Ext.define('app.model.' + module.tf_moduleName, {
								extend : 'Ext.data.Model',
								module : module,
								idProperty : module.tf_primaryKey, // 设置模块model的主键
								nameFields : module.tf_nameFields, // 设置模块model的名称字段
								fields : this.getFields(module), // 设置字段

								// 取得主键值
								getIdValue : function() {
									return this.get(this.idProperty);
								},

								// 取得当前记录的名字字段
								getNameValue : function() {
									if (this.nameFields)
										return this.get(this.nameFields);
									else
										return null;
								}
							});
				},

				// 根据字段字义数组来生成model中的各个字段
				getFields : function(module) {
					var fields = [];

					for (var i in module.tf_fields) {
						var fd = module.tf_fields[i];
						var field = {
							name : fd.tf_fieldName,
							title : fd.tf_title,
							type : this.getTypeByStr(fd.tf_fieldType)
						};
						if (field.type == 'string') {
							field.useNull = true;
							field.serialize = this.convertToNull;
						}
						if (field.type == 'date') {
//							field.dateFormat = 'Y-m-d';
//							field.dateWriteFormat = 'Y-m-d'; // 设置日期字段的读写格式
//							field.dateReadFormat = 'Y-m-d';
						}
						if (field.type == 'datetime')
							field.dateReadFormat = 'Y-m-d H:i:s';
						fields.push(field);
					}
					return fields;
				},
				// 将java中的数据类型转换成extjs5的字段类型
				getTypeByStr : function(str) {
					switch (str) {
						case 'String' :
							return 'string';
						case 'Boolean' :
							return 'boolean';
						case 'Integer' :
							return 'int';
						case 'Date' :
							return 'date';
						case 'Datetime' :
							return 'date';
						case 'Double' :
						case 'Float' :
						case 'Percent' :
							return 'float';
						default :
							return 'string';
					}
				},

				// 如果是空字符串，返回null
				convertToNull : function(v) {
					return v ? v : null;
				}
			}
		});
