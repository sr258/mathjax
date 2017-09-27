H5P.MathJax
===========
This is an H5P library that wraps around MathJax and enables the use of mathematical equations and symbols in H5P elements. To reduce the footprint of the library, it only works with TeX markup and uses MathJax's CommonHTML engine.

Usage
-----
To use the library it must be referenced in `library.json` and initialized by calling `H5P.MathJax.load()`. A good place for this is in initialization functions like `attach()`.