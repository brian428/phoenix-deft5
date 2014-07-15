
/**
Collection of {Phoenix.model.Scenario} models.
 */
Ext.define("Phoenix.store.ScenarioStore", {
  extend: "Ext.data.Store",
  mixins: ["Deft.mixin.Injectable"],
  requires: ["Phoenix.model.Scenario", "Ext.data.proxy.LocalStorage"],
  inject: ["appConfig"],
  config: {
    appConfig: null
  },
  model: "Phoenix.model.Scenario",
  autoLoad: false,
  proxy: {
    type: "localstorage"
  },

  /**
  	* Constructor.
   */
  constructor: function(cfg) {
    if (cfg == null) {
      cfg = {};
    }
    this.initConfig(cfg);
    this.getProxy().setId(this.getAppConfig().getEndpoint("listScenarios").proxyId);
    return this.callParent(arguments);
  },

  /**
  	* Returns true the store contains unsynced {Phoenix.model.Scenario} models.
  	* @return {Boolean}
   */
  isSyncNeeded: function() {
    var result;
    result = false;
    if (this.getNewRecords().length || this.getModifiedRecords().length || this.getRemovedRecords().length || this.getUpdatedRecords().length) {
      result = true;
    }
    return result;
  }
});
