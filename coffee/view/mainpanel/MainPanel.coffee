###*
* Main (root) UI container.
###
Ext.define( "Phoenix.view.mainpanel.MainPanel",
	extend: "Ext.tab.Panel"
	alias: "widget.phoenix-view-mainPanel"
	controller: "MainPanelController"
	requires: [ "Phoenix.view.mainpanel.MainPanelController", "Phoenix.view.scenario.grid.ScenarioGrid" ]


	header: false
	plain: true
	title: "PHOENIX Disaster Recovery Scenario Planner (DeftJS Example Application)"


	listeners:
		boxready: "loadInitialData"
		scope: "controller"


	initComponent: ->

		Ext.applyIf( @,
			items: [
				xtype: "phoenix-view-scenarioGrid"
			]
		)

		@callParent( arguments )

)