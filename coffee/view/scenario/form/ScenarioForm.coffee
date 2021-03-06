###*
* Form view for editing a {Phoenix.model.Scenario}.
###
Ext.define( "Phoenix.view.scenario.form.ScenarioForm",
	extend: "Ext.form.Panel"
	mixins: [ "Deft.mixin.Injectable" ]
	alias: "widget.phoenix-view-scenarioForm"
	requires: [
		"Phoenix.view.scenario.form.ScenarioFormController"
		"Phoenix.view.scenario.form.ScenarioItemGrid"
		"Phoenix.store.ProbabilityStore"
		"Phoenix.store.AffectedItemStore"
	]
	controller: "ScenarioFormController"
	inject: [
		"affectedItemStore"
		"probabilityStore"
	]


	config:
		scenario: null
		affectedItemStore: null
		probabilityStore: null
		requiredStyle: "<span class='ux-required-field' data-qtip='Required'>*</span>"


	listeners:
		boxready: "onBoxReady"
		scope: "controller"


	layout:
		type: "vbox"
		#align: "stretch"


	initComponent: ->

		Ext.apply( @,

			fieldDefaults:
				msgTarget: "side"
				width: 600
				labelWidth: 175
				labelAlign: "right"

			items: [
				xtype:"fieldset"
				title: "Scenario Information"
				collapsible: false
				layout: "anchor"
				margin: 20
				width: 800

				items: [
					xtype: "textfield"
					name: "name"
					fieldLabel: "Scenario Name"
					allowBlank: false
					afterLabelTextTpl: @getRequiredStyle()
					margin: "10 0 7 0"
				,
					xtype: "textarea"
					name: "description"
					fieldLabel: "Scenario Description"
					height: 100
					grow: true
				,
					xtype: "combobox"
					name: "probabilityId"
					fieldLabel: "Probability"
					store: @getProbabilityStore(),
					queryMode: "local"
					displayField: "value"
					valueField: "id"
					emptyText: "Select a Probability"
					allowBlank: false
					forceSelection: true
					afterLabelTextTpl: @getRequiredStyle()
					margin: "0 0 12 0"
				]
#			,
#				xtype: "phoenix-view-scenarioItemGrid"
#				itemId: "scenarioItemGrid"
#				reference: "scenarioItemGrid"
#				store: @getScenario().scenarioItems()
#				#flex: 1
#				height: 250
#				#maxHeight: 500
#				#anchor: "100% 100%"
#				width: 1060
#				padding: "5 5 12 5"
			,
				xtype:"fieldset"
				title: "Scenario Items"
				collapsible: false
				margin: 20
				width: 1050
				height: 250
				layout: "fit"
				padding: 10

				items: [
					xtype: "phoenix-view-scenarioItemGrid"
					itemId: "scenarioItemGrid"
					reference: "scenarioItemGrid"
					store: @getScenario().scenarioItems()
					margin: 0
					#anchor: "100% 100%"
					#margin: "5 5 12 5"
				]
			]

			tbar: [
				text: "Save Scenario"
				itemId: "saveButton"
				iconCls: "save-icon"
				formBind: true
				reference: "saveButton"
				listeners:
					click: "onSaveButtonClick"
			,
				text: "Copy Scenario"
				itemId: "copyButton"
				iconCls: "copy-icon"
				formBind: true
				reference: "copyButton"
				listeners:
					click: "onCopyButtonClick"
			,
				text: "Close"
				itemId: "cancelButton"
				iconCls: "cancel-icon"
				listeners:
					click: => @close()
			]

		)

		@callParent( arguments )

)