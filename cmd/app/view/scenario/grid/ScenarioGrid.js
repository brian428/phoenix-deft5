
/**
* Grid view for {Phoenix.model.Scenario} models.
 */
Ext.define("Phoenix.view.scenario.grid.ScenarioGrid", {
  extend: "Ext.grid.Panel",
  mixins: ["Deft.mixin.Injectable"],
  alias: "widget.phoenix-view-scenarioGrid",
  controller: "ScenarioGridController",
  requires: ["Ext.grid.plugin.CellEditing", "Ext.selection.CellModel", "Ext.grid.column.Number", "Ext.grid.column.Date", "Ext.grid.column.Action", "Phoenix.view.scenario.grid.ScenarioGridController", "Phoenix.store.ScenarioStore", "Phoenix.store.ProbabilityStore"],
  inject: ["scenarioStore", "probabilityStore"],
  config: {
    scenarioStore: null,
    probabilityStore: null
  },
  listeners: {
    itemdblclick: "onEditScenario",
    scope: "controller"
  },
  title: "Scenarios",
  initComponent: function() {
    Ext.apply(this, {
      store: this.getScenarioStore(),
      columns: [
        {
          header: "Scenario Name",
          dataIndex: "name",
          flex: 1,
          minWidth: 140
        }, {
          header: "Description",
          dataIndex: "description",
          flex: 1,
          renderer: function(value, metaData, record) {
            metaData.tdAttr = "data-qtip='" + value + "'";
            return value;
          }
        }, {
          header: "Probability",
          dataIndex: "probabilityId",
          width: 145,
          renderer: (function(_this) {
            return function(value, metaData, record, row, col, store, gridView) {
              var _ref;
              return (_ref = _this.getProbabilityStore().getById(value)) != null ? _ref.get("value") : void 0;
            };
          })(this)
        }, {
          xtype: "numbercolumn",
          header: "Plan Cost / Day",
          dataIndex: "planCost",
          width: 85,
          formatter: "usMoney"
        }, {
          xtype: "numbercolumn",
          header: "Impact Cost / Day",
          dataIndex: "impactCost",
          width: 100,
          formatter: "usMoney"
        }, {
          xtype: "numbercolumn",
          header: "Length (Days)",
          dataIndex: "impactLength",
          width: 80
        }, {
          xtype: "numbercolumn",
          header: "Total Impact Cost",
          dataIndex: "totalImpact",
          width: 105,
          formatter: "usMoney"
        }, {
          header: "Plan Effectiveness",
          dataIndex: "planEffectiveness",
          width: 105,
          renderer: function(value, metaData, record) {
            metaData.tdCls = value;
            return value;
          }
        }, {
          xtype: "datecolumn",
          text: "Updated",
          dataIndex: "dateUpdated",
          format: "m-d-Y g:i A",
          width: 110
        }, {
          xtype: "actioncolumn",
          itemId: "scenarioActionColumn",
          text: "Delete",
          width: 50,
          align: "center",
          sortable: false,
          reference: "scenarioActionColumn",
          listeners: {
            click: "onActionColumnClick"
          },
          items: [
            {
              itemId: "scenarioDeleteButton",
              icon: "resources/icons/delete.png",
              tooltip: "Delete Scenario",
              iconCls: "mousepointer .x-grid-center-icon"
            }
          ]
        }
      ],
      columnLines: true,
      viewConfig: {
        stripeRows: true,
        emptyText: "<div class='x-grid-empty-custom'>There are no Scenarios defined yet.</div>",
        deferEmptyText: false
      },
      tbar: [
        {
          text: "New Scenario",
          itemId: "addButton",
          iconCls: "add-icon",
          reference: "addButton",
          listeners: {
            click: "onAddButtonClick"
          }
        }, {
          xtype: "component",
          html: " (Double click row to edit)"
        }
      ]
    });
    return this.callParent(arguments);
  }
});
