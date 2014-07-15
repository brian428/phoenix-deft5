###
The main application class. An instance of this class is created by
app.js when it calls Ext.application(). This is the ideal place to
handle application launch and initialization details.
###
Ext.define( "Phoenix.Application",
	extend: "Ext.app.Application"
	requires: [
		"Deft.ioc.Injector"
		"Phoenix.config.AppConfig",
		"Phoenix.store.ScenarioStore"
		"Phoenix.service.ScenarioService"
		"Phoenix.context.ScenarioContext"
		"Phoenix.store.ProbabilityStore"
		"Phoenix.store.RevenueImpactStore"
		"Phoenix.store.AffectedItemStore"
		"Phoenix.service.NotificationService"
		"Phoenix.view.Viewport"
	]

	name: "Phoenix"
	controllers: [ "Root" ]
	stores: []
	views: []


	launch: ->
		Deft.Injector.configure( @buildInjectorConfiguration() )
		Ext.tip.QuickTipManager.init()
		Ext.create( "Phoenix.view.Viewport" )


	###*
	* @protected
	* Returns the configuration object to pass to Deft.Injector.configure(). Override in subclasses to alter the Injector configuration before returning the config object.
	* @return {Object} The Injector configuration object.
	###
	buildInjectorConfiguration: ->
		config =
			appConfig:
				className: "Phoenix.config.AppConfig"
				parameters: [ environment: Phoenix.config.AppConfig.PRODUCTION_ENV ]
			scenarioStore: "Phoenix.store.ScenarioStore"
			scenarioService: "Phoenix.service.ScenarioService"
			scenarioContext: "Phoenix.context.ScenarioContext"
			probabilityStore: "Phoenix.store.ProbabilityStore"
			revenueImpactStore: "Phoenix.store.RevenueImpactStore"
			affectedItemStore: "Phoenix.store.AffectedItemStore"
			notificationService: "Phoenix.service.NotificationService"

		return config

)