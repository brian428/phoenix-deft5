
/**
* Application configuration class, including endpoint lookup and runtime setting for mock vs. live data access.
* Inject into stores or other objects to resolve endpoints for loading data.
*
* Typically, this would allow lookup of server URLs. In this case, we store the memory proxy Ids.
 */
Ext.define("Phoenix.config.AppConfig", {
  statics: {
    MOCK_DATA_ENV: "MOCK_DATA_ENV",
    PRODUCTION_ENV: "PRODUCTION_ENV"
  },
  config: {
    environment: null,
    MOCK_DATA_ENV: {
      endpoints: {
        listScenarios: {
          proxyId: "deftjs-phoenix-scenarios-test"
        },
        listScenarioItems: {
          proxyId: "deftjs-phoenix-scenarioItems-test"
        }
      },
      defaults: {
        urlPrefix: "data/",
        urlSuffix: ".json",
        dataRoot: ""
      }
    },
    PRODUCTION_ENV: {
      endpoints: {
        listScenarios: {
          proxyId: "deftjs-phoenix5-scenarios"
        },
        listScenarioItems: {
          proxyId: "deftjs-phoenix5-scenarioItems"
        }
      },
      defaults: {
        urlPrefix: "/",
        urlSuffix: ".json",
        dataRoot: ""
      }
    }
  },

  /**
  	* Configures the application, particularly the endpoints used for server requests.
  	* @param {Object} cfg A configuration object, usually pulled from a static property in an application-specific configuration class.
  	* @param {String} environment Determines whether live server calls or mock JSON data files should be used. Set to
   * 	MOCK_DATA_ENV or PRODUCTION_ENV. If no environment is specified, defaults to PRODUCTION_ENV.
   */
  constructor: function(cfg) {
    this.initConfig();
    this.callParent(arguments);
    if ((cfg != null ? cfg.environment : void 0) && (Phoenix.config.AppConfig[cfg.environment] != null)) {
      this.setEnvironment(Phoenix.config.AppConfig[cfg.environment]);
    } else {
      this.setEnvironment(Phoenix.config.AppConfig.PRODUCTION_ENV);
    }
    return this;
  },

  /**
  	* Given an endpoint name, returns the URL and root JSON data element for that endpoint. If no endpoint can be found, attempt to use the default url prefix and suffix.
  	* @param {String} Endpoint name
  	* @return {Object} Object with keys defined for the endpoint ( typically 'url' and 'root')
   */
  getEndpoint: function(endpointName) {
    var defaults, endpoints, environmentConfig, result, _ref, _ref1;
    environmentConfig = this.config[this.getEnvironment()];
    endpoints = environmentConfig.endpoints;
    defaults = environmentConfig.defaults;
    if (endpoints != null ? endpoints[endpointName] : void 0) {
      result = endpoints[endpointName];
      result.root = (_ref = (_ref1 = endpoints[endpointName]) != null ? _ref1.root : void 0) != null ? _ref : defaults.dataRoot;
    } else {
      result = {
        url: defaults.urlPrefix + endpointName + defaults.urlSuffix,
        root: defaults.dataRoot
      };
    }
    return result;
  }
});
