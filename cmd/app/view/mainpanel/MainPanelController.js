
/**
* Controls the main (root) UI container for the application.
 */
Ext.define("Phoenix.view.mainpanel.MainPanelController", {
  extend: "Phoenix.view.AbstractPhoenixController",
  requires: ["Phoenix.view.scenario.form.ScenarioForm"],
  alias: "controller.MainPanelController",
  observe: {
    scenarioContext: {
      scenarioOpened: "onScenarioOpened",
      scenarioDeleted: "onScenarioDeleted"
    }
  },
  init: function() {
    return this.callParent(arguments);
  },

  /**
  	* Loads the initial reference dta.
   */
  loadInitialData: function() {
    this.getView().setLoading(true);
    return this.getScenarioService().loadInitialData().then({
      success: (function(_this) {
        return function() {
          return _this.getScenarioContext().initialDataLoaded();
        };
      })(this),
      failure: (function(_this) {
        return function(errorMessage) {
          return _this.getNotificationService().error("Error", errorMessage);
        };
      })(this)
    }).always((function(_this) {
      return function() {
        return _this.getView().setLoading(false);
      };
    })(this));
  },

  /**
  	* Responds when a {Phoenix.model.Scenario} view is opened.
  	* @param {Phoenix.model.Scenario} Scenario being opened.
   */
  onScenarioOpened: function(scenario) {
    var existingScenarioPanel;
    existingScenarioPanel = this.findExistingTab(scenario);
    if ((existingScenarioPanel != null)) {
      return existingScenarioPanel.show();
    } else {
      return this.getView().add({
        xtype: "phoenix-view-scenarioForm",
        itemId: "scenarioPanel_" + (scenario.getId()),
        title: scenario.get("name"),
        closable: true,
        scenario: scenario
      }).show();
    }
  },

  /**
  	* Responds when a {Phoenix.model.Scenario} is deleted.
  	* @param {Phoenix.model.Scenario} Scenario being deleted.
   */
  onScenarioDeleted: function(scenario) {
    var existingScenarioPanel;
    existingScenarioPanel = this.findExistingTab(scenario);
    if (existingScenarioPanel != null) {
      return existingScenarioPanel.close();
    }
  },

  /**
  	* Locates a view for the specified {Phoenix.model.Scenario}. If not view is open, returns null.
  	* @param {Phoenix.model.Scenario} Scenario to locate a view for.
  	* @return {Phoenix.view.ScenarioForm}
   */
  findExistingTab: function(scenario) {
    return this.getView().child("#scenarioPanel_" + (scenario.getId()));
  }
});
