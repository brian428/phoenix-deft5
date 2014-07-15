###*
Collection of {Phoenix.model.Scenario} models.
###
Ext.define( "Phoenix.store.ScenarioStore",
	extend: "Ext.data.Store"
	mixins: [ "Deft.mixin.Injectable" ]
	requires: [ "Phoenix.model.Scenario", "Ext.data.proxy.LocalStorage" ]
	inject: [ "appConfig" ]


	config:
		appConfig: null


	model: "Phoenix.model.Scenario"
	autoLoad: false
	proxy:
		type: "localstorage"


	###*
	* Constructor.
	###
	constructor: ( cfg={} ) ->
		@initConfig( cfg )
		@getProxy().setId( @getAppConfig().getEndpoint( "listScenarios" ).proxyId )
		@callParent( arguments )


	###*
	* Returns true the store contains unsynced {Phoenix.model.Scenario} models.
	* @return {Boolean}
	###
	isSyncNeeded: ->
		result = false
		if( @getNewRecords().length or @getModifiedRecords().length or @getRemovedRecords().length or @getUpdatedRecords().length )
			result = true
		return result

)