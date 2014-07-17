###*
* Grid view for {Phoenix.model.Scenario} models.
###
Ext.define( "Phoenix.view.scenario.grid.ScenarioGrid",
	extend: "Ext.grid.Panel"
	mixins: [ "Deft.mixin.Injectable" ]
	alias: "widget.phoenix-view-scenarioGrid"
	controller: "ScenarioGridController"
	requires: [
		"Ext.grid.plugin.CellEditing"
		"Ext.selection.CellModel"
		"Ext.grid.column.Number"
		"Ext.grid.column.Date"
		"Ext.grid.column.Action"
		"Phoenix.view.scenario.grid.ScenarioGridController"
		"Phoenix.store.ScenarioStore"
		"Phoenix.store.ProbabilityStore"
	]
	inject: [
		"scenarioStore"
		"probabilityStore"
	]


	config:
		scenarioStore: null
		probabilityStore: null


	listeners:
		itemdblclick: "onEditScenario"
		scope: "controller"


	title: "Scenario List &nbsp;"


	initComponent: ->

		Ext.apply( @,

			# TODO: Remove after fix, hopefully in 5.0.1. See: http://www.sencha.com/forum/showthread.php?286672
			reserveScrollbar: true

			store: @getScenarioStore()

			columns: [
				header: "Scenario Name"
				dataIndex: "name"
				width: 180
			,
				header: "Description"
				dataIndex: "description"
				flex: 1
				renderer: ( value, metaData, record ) ->
					metaData.tdAttr = "data-qtip='#{ value }'"
					return value
			,
				header: "Probability"
				dataIndex: "probabilityId"
				width: 145
				renderer: ( value, metaData, record, row, col, store, gridView ) =>
					return @getProbabilityStore().getById( value )?.get( "value" )
			,
				xtype: "numbercolumn"
				header: "Plan Cost / Day"
				dataIndex: "planCost"
				width: 130
				formatter: "usMoney"
			,
				xtype: "numbercolumn"
				header: "Impact Cost / Day"
				dataIndex: "impactCost"
				width: 140
				formatter: "usMoney"
			,
				xtype: "numbercolumn"
				header: "Length (Days)"
				dataIndex: "impactLength"
				width: 120
			,
				xtype: "numbercolumn"
				header: "Total Impact Cost"
				dataIndex: "totalImpact"
				width: 135
				formatter: "usMoney"
			,
				header: "Effectiveness"
				dataIndex: "planEffectiveness"
				width: 105
				renderer: ( value, metaData, record ) ->
					metaData.tdCls = value
					return value
			,
				xtype: "datecolumn"
				text: "Updated"
				dataIndex: "dateUpdated"
				format:"m-d-Y g:i A"
				width: 100
			,
				xtype: "actioncolumn"
				itemId: "scenarioActionColumn"
				text: "Delete"
				width: 70
				align: "center"
				sortable: false
				reference: "scenarioActionColumn"
				listeners:
					click: "onActionColumnClick"
				items: [
					itemId: "scenarioDeleteButton"
					icon: "resources/icons/delete.png"
					tooltip: "Delete Scenario"
					iconCls: "mousepointer .x-grid-center-icon"
				]
			]

			columnLines: true

			viewConfig:
				stripeRows: true
				emptyText: "<div class='x-grid-empty-custom'>There are no Scenarios defined yet.</div>"
				deferEmptyText: false

			tbar: [
				text: "New Scenario"
				itemId: "addButton"
				iconCls: "add-icon"
				reference: "addButton"
				listeners:
					click: "onAddButtonClick"
			,
				xtype: "component"
				html: " (Double click row to edit)"
			]

		)

		@callParent( arguments )

)