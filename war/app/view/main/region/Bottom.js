/**
 * 系统主页的底部区域，主要放置用户单位信息，服务单位和服务人员信息
 */
Ext.define('app.view.main.region.Bottom', {

			extend : 'Ext.toolbar.Toolbar',

			alias : 'widget.mainbottom',

			uses : ['app.ux.ButtonTransparent'],

			defaults : {
				xtype : 'buttontransparent'
			},

			style : 'background-color : #f6f5ec;',

			items : [{
						bind : {
							text : '使用单位:{user.company}'
						},
						glyph : 0xf0f7
					}, {
						bind : {
							text : '用户:{user.name}'
						},
						glyph : 0xf007
					}, '->', {
						bind : {
							text : '{service.company}'
						},
						glyph : 0xf059

					}, {
						bind : {
							text : '{service.name}'
						}
					}, {
						bind : {
							text : '{service.phonenumber}'
						},
						glyph : 0xf095
					}, {
						bind : {
							hidden : '{!service.email}', // 绑定值前面加！表示取反，如果有email则不隐藏，如果email未设置，则隐藏
							text : '{service.email}'
						},
						glyph : 0xf003
					}, {
						bind : {
							text : '©{service.copyright}'
						}
					}]
		});