
/**
* Domain model for affected items associated with a Scenario.
 */
Ext.define("Phoenix.model.ScenarioItem", {
  extend: "Phoenix.model.AbstractScenarioModel",
  requires: [],
  fields: [
    {
      name: "id",
      type: "string"
    }, {
      name: "affectedItemId",
      type: "int"
    }, {
      name: "itemDescription",
      type: "string"
    }, {
      name: "timeToRecover",
      type: "float"
    }, {
      name: "cost",
      type: "float"
    }, {
      name: "impactSeverityId",
      type: "int"
    }, {
      name: "scenarioId",
      reference: {
        type: "Phoenix.model.Scenario",
        inverse: {
          role: "scenarioItems",
          storeConfig: {
            type: "scenarioItemStore"
          }
        }
      }
    }
  ],

  /**
  	* Applies default settings to this {Phoenix.model.ScenarioItem}.
   */
  setUpDefaults: function() {
    this.set("affectedItemId", 1);
    this.set("cost", 0);
    this.set("description", "");
    this.set("timeToRecover", 0);
    return this.set("impactSeverityId", 1);
  },

  /**
  	* Returns true if this {Phoenix.model.ScenarioItem} has valid values.
  	* @return {Boolean}
   */
  isValid: function() {
    var result;
    result = false;
    if (this.get("affectedItemId") > 0 && this.get("impactSeverityId") > 0 && (this.get("cost") != null) && (this.get("timeToRecover") != null)) {
      result = true;
    }
    return result;
  }
});
