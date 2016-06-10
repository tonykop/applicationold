
/**
 * 选中了grid中的一条记录，显示明细的区域，放在右边
 */

Ext.define('app.view.module.region.Detail', {
			extend : 'Ext.grid.property.Grid',
			alias : 'widget.recorddetail',

			//glyph : 0xf0ca, //加了这一条，那个在最顶右侧可以隐藏此panel的按钮就不见，extjs真是bug一袋子，bug一屋子
			title : '记录明细',

			initComponent : function() {
				this.source = {
					'工程项目名称' : 'title',
					'投资总额' : 2929292
				}
				this.callParent();
			}

		})