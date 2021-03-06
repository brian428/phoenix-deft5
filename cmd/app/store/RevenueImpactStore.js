
/**
Collection of Revenue Impact objects.
 */
Ext.define("Phoenix.store.RevenueImpactStore", {
  extend: "Ext.data.ArrayStore",
  requires: ["Phoenix.model.RevenueImpact"],
  model: "Phoenix.model.RevenueImpact",
  autoLoad: false,
  proxy: {
    type: "memory"
  },

  /**
   Simulate loading the Revenue Impact objects
   */
  load: function(options) {
    var data;
    data = [
      {
        id: 1,
        value: "Very Low"
      }, {
        id: 2,
        value: "Low"
      }, {
        id: 3,
        value: "Moderate"
      }, {
        id: 4,
        value: "Significant"
      }, {
        id: 5,
        value: "High"
      }, {
        id: 6,
        value: "Very High"
      }
    ];
    this.loadData(data);
    return options.callback(this.data.items, {}, true);
  }
});
