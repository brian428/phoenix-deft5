
/**
* Main (root) UI container.
 */
Ext.define("Phoenix.view.mainpanel.MainPanel", {
  extend: "Ext.tab.Panel",
  alias: "widget.phoenix-view-mainPanel",
  controller: "MainPanelController",
  requires: ["Phoenix.view.mainpanel.MainPanelController", "Phoenix.view.scenario.grid.ScenarioGrid"],
  header: false,
  plain: true,
  listeners: {
    boxready: "loadInitialData",
    scope: "controller"
  },
  initComponent: function() {
    Ext.applyIf(this, {
      items: [
        {
          xtype: "phoenix-view-scenarioGrid"
        }
      ]
    });
    return this.callParent(arguments);
  }
});
