###*
* Abstract ViewController for the Phoenix application.
###
Ext.define( "Phoenix.view.AbstractPhoenixController",
	extend: "Deft.mvc.ViewController"
	requires: [
		"Phoenix.service.ScenarioService"
		"Phoenix.context.ScenarioContext"
		"Phoenix.service.NotificationService"
	]
	inject: [
		"scenarioContext"
		"scenarioService"
		"notificationService"
	]


	config:
		scenarioContext: null
		scenarioService: null
		notificationService: null


	init: ->
		@callParent( arguments )

)