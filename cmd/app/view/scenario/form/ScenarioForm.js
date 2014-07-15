
/**
* Form view for editing a {Phoenix.model.Scenario}.
 */
Ext.define("Phoenix.view.scenario.form.ScenarioForm", {
  extend: "Ext.form.Panel",
  mixins: ["Deft.mixin.Injectable"],
  alias: "widget.phoenix-view-scenarioForm",
  requires: ["Phoenix.view.scenario.form.ScenarioFormController", "Phoenix.view.scenario.form.ScenarioItemGrid", "Phoenix.store.ProbabilityStore", "Phoenix.store.AffectedItemStore"],
  controller: "ScenarioFormController",
  inject: ["affectedItemStore", "probabilityStore"],
  config: {
    scenario: null,
    affectedItemStore: null,
    probabilityStore: null,
    requiredStyle: "<span class='ux-required-field' data-qtip='Required'>*</span>"
  },
  listeners: {
    boxready: "onBoxReady",
    scope: "controller"
  },
  layout: "anchor",
  anchor: "100% 100%",
  initComponent: function() {
    Ext.apply(this, {
      fieldDefaults: {
        msgTarget: "side",
        width: 600,
        labelWidth: 175,
        labelAlign: "right"
      },
      items: [
        {
          xtype: "fieldset",
          title: "Scenario Information",
          collapsible: false,
          layout: "anchor",
          margin: 20,
          items: [
            {
              xtype: "textfield",
              name: "name",
              fieldLabel: "Scenario Name",
              allowBlank: false,
              afterLabelTextTpl: this.getRequiredStyle(),
              margin: "10 0 7 0"
            }, {
              xtype: "textarea",
              name: "description",
              fieldLabel: "Scenario Description",
              height: 100,
              grow: true
            }, {
              xtype: "combobox",
              name: "probabilityId",
              fieldLabel: "Probability",
              store: this.getProbabilityStore(),
              queryMode: "local",
              displayField: "value",
              valueField: "id",
              emptyText: "Select a Probability",
              allowBlank: false,
              forceSelection: true,
              afterLabelTextTpl: this.getRequiredStyle(),
              margin: "0 0 12 0"
            }
          ]
        }, {
          xtype: "phoenix-view-scenarioItemGrid",
          itemId: "scenarioItemGrid",
          reference: "scenarioItemGrid",
          store: this.getScenario().scenarioItems(),
          height: 250,
          padding: "5 5 12 5"
        }
      ],
      tbar: [
        {
          text: "Save Scenario",
          itemId: "saveButton",
          iconCls: "save-icon",
          formBind: true,
          reference: "saveButton",
          listeners: {
            click: "onSaveButtonClick"
          }
        }, {
          text: "Copy Scenario",
          itemId: "copyButton",
          iconCls: "copy-icon",
          formBind: true,
          reference: "copyButton",
          listeners: {
            click: "onCopyButtonClick"
          }
        }, {
          text: "Close",
          itemId: "cancelButton",
          iconCls: "cancel-icon",
          listeners: {
            click: (function(_this) {
              return function() {
                return _this.close();
              };
            })(this)
          }
        }
      ]
    });
    return this.callParent(arguments);
  }
});
