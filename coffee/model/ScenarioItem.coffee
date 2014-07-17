###*
* Domain model for affected items associated with a Scenario.
###
Ext.define( "Phoenix.model.ScenarioItem",
	extend: "Phoenix.model.AbstractScenarioModel"
	requires: [
		#"Phoenix.model.Scenario"
	]


	fields: [
		name: "id"
		type: "string"
	,
		name: "affectedItemId"
		type: "int"
	,
		name: "itemDescription"
		type: "string"
	,
		name: "timeToRecover"
		type: "float"
	,
		name: "cost"
		type: "float"
	,
		name: "impactSeverityId"
		type: "int"
	,
		name: "scenarioId"
		reference:
			#cls: Phoenix.model.Scenario
			type: "Phoenix.model.Scenario"
			inverse:
				role: "scenarioItems"
				storeConfig:
					type: "scenarioItemStore"
	]


	###*
	* Applies default settings to this {Phoenix.model.ScenarioItem}.
	###
	setUpDefaults: ->
		@set( "affectedItemId", 1 )
		@set( "cost", 0 )
		@set( "description", "" )
		@set( "timeToRecover", 0 )
		@set( "impactSeverityId", 1 )


	###*
	* Returns true if this {Phoenix.model.ScenarioItem} has valid values.
	* @return {Boolean}
	###
	isValid: ->
		result = false
		if( @get( "affectedItemId" ) > 0 and @get( "impactSeverityId" ) > 0 and @get( "cost" )? and @get( "timeToRecover" )? )
			result = true
		return result

)