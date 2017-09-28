var H5P = H5P || {};

/**
 * MathJax library for H5P.
 *
 * This is a utility library, which does not implement attach. I.e, it has to be actively used by other libraries
 * @module
 */
H5P.MathJax = (function ($) {

  /**
   * The internal object to return
   * @class H5P.MathJax
   * @static
   */
  function MathJaxLib() { }

  /**
   * The number of milliseconds which MathJax requests should be throttled.
   */
  var throttleTime = 5;

  /**
   * The id of the currently running timer used for throtteling MathJax requests.
   */
  var runningThrottleTimeoutId = null;    

  /* Private functions */
  
  /**
   * Configures MathJax
   */
  var configureMathJax = function () {
    window.MathJax = {
      showProcessingMessages: false,
      messageStyle: "none"
    };
  }

  /**
   * Returns the root path of this library.
   * @returns string
   */
  var getCurrentPath = function () {
    var jsFileLocation = $('script[src*=mathjax-entry]').attr('src');
    if (!jsFileLocation) {
      return undefined;
    }
    jsFileLocation = jsFileLocation.replace(/mathjax-entry\.js.*$/, '')

    return jsFileLocation;
  }

  /**
   * Loads MathJax.
   * @param {string} path The path to the root directory of this library.
   */  
  var loadMathJax = function (path) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = path + "js/MathJax.js?config=TeX-AMS_CHTML";
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  /**
   * Queues a request at MathJax that the node should be updated.
   * @param {Node} node The nodes whose descendants should be updated.
   */
  var doJax = function (node) {
    if (MathJax.Hub)
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, node]);
  };
  
  /**
   * Updates the container's descendants but throttles the updates to reduce CPU load.
   * @param  {Node} container The node whose descendants should be updated.
   */
  var throttledJaxUpdate = function (container) {
    if (!runningThrottleTimeoutId) {
      runningThrottleTimeoutId = setTimeout(function () {            
          doJax(container);            
        runningThrottleTimeoutId = null;
      }, throttleTime); 
    }
  };

  /**
   * Sets up an observer that calls MathJax when changes were made to the DOM.
   * @param  {Node} container The root node to whose descendants changes should be observed.
   */
  var setupObserver = function (container) {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    if (MutationObserver) {
      var observer = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
          if (mutations[i].addedNodes.length) {
            throttledJaxUpdate(container);
            return;
          }
        }
      });
      observer.observe(container, {
        childList: true,
        subtree: true
      });
    }
  }

  /* Public static functions */

  /**
   * Loads the MathJax library
   * @param  {Node} container The node whose descendants should be parsed with MathJax.
   */
  MathJaxLib.load = function (container) {
    var currentPath = getCurrentPath();
    if (!currentPath)
      return;

    configureMathJax();
    loadMathJax(currentPath);
    setupObserver(container);
  };

  return MathJaxLib;
})(H5P.jQuery);
