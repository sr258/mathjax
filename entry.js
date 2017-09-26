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
  function MathJax() {}

  /* Public static functions */

  /**
   * Create a tip icon
   * @method H5P.MathJax.load
   * @return 
   */
  MathJax.load = function () {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src  = "js/MathJax.js?config=TeX-AMS_CHTML";
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  return MathJax;
})(H5P.jQuery);
