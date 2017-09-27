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
  function MathJax() { }

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

  var loadMathJax = function(path) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = path + "js/MathJax.js?config=TeX-AMS_CHTML";
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  /* Public static functions */

  /**
   * Create a tip icon
   * @method H5P.MathJax.load
   * @return 
   */
  MathJax.load = function () {
    var currentPath = getCurrentPath();
    if (!currentPath)
      return;

    configureMathJax();    
    loadMathJax(currentPath);
  };

  return MathJax;
})(H5P.jQuery);
