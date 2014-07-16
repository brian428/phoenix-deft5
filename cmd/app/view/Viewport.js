
/**
* Viewport shell for the Phoenix application.
 */
Ext.define("Phoenix.view.Viewport", {
  extend: "Ext.container.Viewport",
  requires: ["Phoenix.view.mainpanel.MainPanel"],
  layout: {
    type: "vbox",
    align: "stretch"
  },
  initComponent: function() {
    Ext.log({
      dump: this
    }, "In Viewport initComponent");
    Ext.apply(this, {
      items: [
        {
          xtype: "container",
          layout: "hbox",
          height: 60,
          items: [
            {
              xtype: "image",
              cls: "phoenix-logo",
              width: 120
            }, {
              xtype: "component",
              html: "<strong>Phoenix 5</strong>: Disaster Recovery Scenario Tool",
              border: false,
              cls: "phoenix-header",
              height: 50
            }, {
              xtype: "component",
              html: "(A <strong><a href='http://deftjs.org' target='_blank' muse_scanned='true'>Deft JS 5</a></strong> Example)",
              border: false,
              cls: "phoenix-header-small",
              height: 50
            }
          ]
        }, {
          xtype: "phoenix-view-mainPanel",
          flex: 1
        }
      ]
    });
    return this.callParent(arguments);
  }
});
