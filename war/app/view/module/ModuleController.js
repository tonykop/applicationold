/**
 * 模块的控制器
 */

Ext.define('app.view.module.ModuleController', {
	extend : 'Ext.app.ViewController',

	requires : ['Ext.MessageBox', 'Ext.window.Toast'],

	alias : 'controller.module',

	init : function() {
		console.log('modulecontroller.init')
	},

	// 选中的记录发生变化过后的事件
	selectionChange : function(model, selected, eOpts) {
		// 设置删除按钮的状态
		this.getView().down('toolbar button#delete')[selected.length > 0
				? 'enable'
				: 'disable']();

		var viewModel = this.getView().getViewModel();
		// 下面将组织选中的记录的name显示在title上，有二种方案可供选择，一种是用下面的MVVM特性，第二种是调用refreshTitle()
		var selectedNames = ''
		if (selected.length > 0) {
			if (!!selected[0].getNameValue())
				selectedNames = selectedNames + '　『<em>' + selected[0].getNameValue()
						+ '</em>'
						+ (selected.length > 1 ? ' 等' + selected.length + '条' : '') + '』';
		}
		viewModel.set('selectedNames', selectedNames); // 修改ModuleModel中的数据，修改好后会自动更新bind的title
		// this.getView().down('grid').refreshTitle(); // 这是不用MVVM特性的做法
	},

	// 删除一条或多条记录
	deleteRecords : function(button) {
		var grid = this.getView().down('modulegrid'), selection = grid
				.getSelectionModel().getSelection(), message = '', infoMessage = '', modultitle;
		if (selection.length == 1) { // 如果只选择了一条
			message = ' 『' + selection[0].getNameValue() + '』 吗?';
			infoMessage = '『' + selection[0].getNameValue() + '』';
		} else { // 选择了多条记录
			message = '<ol>';
			Ext.Array.each(grid.getSelectionModel().getSelection(), function(record) {
						message += '<li>' + record.getNameValue() + '</li>';
					});
			message += '</ol>';
			infoMessage = message;
			message = '以下 ' + selection.length + ' 条记录吗?' + message;
		}
		moduletitle = '<strong>' + this.getView().getViewModel().get('tf_title')
				+ '</strong>';
		Ext.MessageBox.confirm('确定删除', '确定要删除 ' + moduletitle + ' 中的' + message,
				function(btn) {
					if (btn == 'yes') {
						grid.getStore().remove(grid.getSelectionModel().getSelection());
						grid.getStore().sync();
						Ext.toast({
									title : '删除成功',
									html : moduletitle + infoMessage + '已成功删除！',
									bodyStyle : 'background-color:#7bbfea;',
									header : {
										border : 1,
										style : {
											borderColor : '#9b95c9'
										}
									},
									border : true,
									style : {
										borderColor : '#9b95c9'
									},
									saveDelay : 10,
									align : 'tr',
									closable : true,
									minWidth : 200,
									useXAxis : true,
									slideInDuration : 500
								});
					}
				})
	},

	// 新增一条记录
	addRecord : function(button) {
		var grid = this.getView().down('modulegrid');
		var model = Ext.create(grid.getStore().model);
		model.set('tf_id', null); // 设置为null,可自动增加
		grid.getStore().insert(0, model);
		grid.getSelectionModel().select(model); // 选中当前新增的记录
	},

	// 根据选中的记录复制新增一条记录
	addRecordWithCopy : function() {
		var grid = this.getView().down('modulegrid'), sm = grid.getSelectionModel();
		if (sm.getSelection().length != 1) {
			Ext.toast({
						title : '警告',
						html : '请先选择一条记录，然后再执行此操作！',
						bodyStyle : 'background-color:yellow;',
						header : {
							border : 1,
							style : {
								borderColor : 'pink'
							}
						},
						border : true,
						style : {
							borderColor : 'pink'
						},
						saveDelay : 10,
						align : 'tr',
						closable : true,
						minWidth : 200,
						useXAxis : true,
						slideInDuration : 500
					});
			return;
		}
		var model = Ext.create(grid.getStore().model);
		Ext.Array.each(model.fields, function(field) { // 将选中记录的model都赋给值新的记录
					model.set(field.name, sm.getSelection()[0].get(field.name));
				});
		model.set('tf_id', null); // 设置为null,可自动增加
		grid.getStore().insert(0, model);
		sm.select(model); // 选中当前新增的记录
	}

})