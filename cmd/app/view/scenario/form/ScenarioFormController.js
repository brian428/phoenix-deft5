
/**
* Controls the scenario form UI.
 */
Ext.define("Phoenix.view.scenario.form.ScenarioFormController", {
  extend: "Phoenix.view.AbstractPhoenixController",
  requires: ["Phoenix.model.ScenarioItem"],
  alias: "controller.ScenarioFormController",
  config: {

    /**
    		* The {Phoenix.model.Scenario} being displayed by the view.
     */
    scenario: null
  },
  init: function() {
    return this.callParent(arguments);
  },

  /**
  	* Performs initial view setup.
   */
  onBoxReady: function() {
    this.setScenario(this.getView().getScenario());
    this.getView().loadRecord(this.getScenario());
    if (this.getScenarioService().isNewScenario(this.getScenario())) {
      return this.lookupReference("copyButton").setVisible(false);
    }
  },

  /**
  	* Handles a click on the save button.
   */
  onSaveButtonClick: function() {
    this.getView().getForm().updateRecord(this.getScenario());
    if (!this.getScenario().hasInvalidScenarioItems()) {
      return this.saveScenario(this.getScenario());
    }
  },

  /**
  	* Saves the passed {Phoenix.model.Scenario}.
  	* @param {Phoenix.model.Scenario} Scenario to save.
   */
  saveScenario: function(scenario) {
    this.getView().setLoading(true);
    return this.getScenarioService().saveScenario(scenario).then({
      success: (function(_this) {
        return function() {
          _this.getView().setTitle(scenario.get("name"));
          if (_this.getView().itemId !== ("scenarioPanel_" + (scenario.getId()))) {
            _this.getView().itemId = "scenarioPanel_" + (scenario.getId());
          }
          _this.lookupReference("copyButton").setVisible(true);
          return _this.getNotificationService().success("Success", "The scenario was saved successfully.");
        };
      })(this),
      failure: (function(_this) {
        return function() {
          return _this.getNotificationService().error("Error", "Error saving the Scenario");
        };
      })(this)
    }).always((function(_this) {
      return function() {
        return _this.getView().setLoading(false);
      };
    })(this));
  },

  /**
  	* Copies the passed {Phoenix.model.Scenario}.
  	* @param {Phoenix.model.Scenario} Scenario to copy.
   */
  saveScenarioCopy: function(scenario) {
    this.getView().setLoading(true);
    return this.getScenarioService().saveScenario(scenario).then({
      success: (function(_this) {
        return function() {
          _this.getNotificationService().success("Success", "The scenario was copied successfully.");
          return _this.getScenarioContext().scenarioOpened(scenario);
        };
      })(this),
      failure: (function(_this) {
        return function() {
          return _this.getNotificationService().error("Error", "Error copying the Scenario");
        };
      })(this)
    }).always((function(_this) {
      return function() {
        return _this.getView().setLoading(false);
      };
    })(this));
  },

  /**
  	* Adds a new {Phoenix.model.ScenarioItem} to the set of items associated with the current {Phoenix.model.Scenario}.
   */
  onAddButtonClick: function() {
    var scenarioItem;
    scenarioItem = Ext.create("Phoenix.model.ScenarioItem");
    scenarioItem.setUpDefaults();
    this.lookupReference("scenarioItemGrid").getStore().insert(0, scenarioItem);
    return this.lookupReference("scenarioItemGrid").cellEditing.startEditByPosition({
      row: 0,
      column: 0
    });
  },

  /**
  	* Handles a click on a row's action column.
   */
  onActionColumnClick: function(view, cell, rowIndex, columnIndex, event, scenarioItem, row) {
    return Ext.MessageBox.confirm("Confirm", "Are you sure you want to delete the this Scenario Item?", function(button) {
      if (button === "yes") {
        return this.deleteScenarioItem(scenarioItem);
      }
    }, this);
  },

  /**
  	* Deletes the passed {Phoenix.model.ScenarioItem}.
  	* @param {Phoenix.model.ScenarioItem} ScenarioItem to delete.
   */
  deleteScenarioItem: function(scenarioItem) {
    this.getScenario().scenarioItems().remove(scenarioItem);
    return this.getNotificationService().info("Change Pending", "Scenario Item removed. Save the Scenario to persist the change.");
  },

  /**
  	* Handles a click on the copy button.
   */
  onCopyButtonClick: function() {
    var copyOfScenario;
    copyOfScenario = this.getScenario().copy();
    return this.saveScenarioCopy(copyOfScenario);
  }
});
