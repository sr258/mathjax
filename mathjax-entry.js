var H5P = H5P || {};

/**
 * MathJax library for H5P.
 *
 * This is a utility library, which does not implement attach. I.e, it has to bee actively used by
 * other libraries
 * @module
 */
H5P.MathJax = (function ($) {

  /**
   * The internal object to return
   * @class H5P.MathJax
   * @static
   */
  function MathJaxLib() { }

  /* Private functions */
  var configureMathJax = function () {
    window.MathJax = {
      showProcessingMessages: false,
      messageStyle: "none"
    };
  }

  var getCurrentPath = function () {
    var jsFileLocation = $('script[src*=mathjax-entry]').attr('src');
    if (!jsFileLocation) {
      return undefined;
    }
    jsFileLocation = jsFileLocation.replace(/mathjax-entry\.js.*$/, '')

    return jsFileLocation;
  }

  var loadMathJax = function (path) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = path + "js/MathJax.js?config=TeX-AMS_CHTML";
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  var doJax = function (node) {
    if (MathJax.Hub)
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, node]);
  };

  var setupObserver = function (container) {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    if (MutationObserver) {
      var running = false;
      var limitedResize = function (nodes) {
        if (!running) {
          running = setTimeout(function () {
            
              doJax(container);            
            running = null;
          }, 500); // 2 fps cap
        }
      };

      var observer = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
          if (mutations[i].addedNodes.length) {
            limitedResize();
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
   * Load the MathJax library
   * @method H5P.MathJax.load
   * @return 
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
