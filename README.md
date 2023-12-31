Javascript port of smallpt (Global Illumination in ~145 lines of JS)

This repo contains two separate implementations of a path tracing renderer.
`smallpt.js` is a port of [http://www.kevinbeason.com/smallpt/](smallpt), a 99-line C++ renderer.
`explicit.js`, the same as above but faster, with explicit light sampling.

Zero dependencies, just open the HTML file and render in your browser. If it hangs, try opening the console.

Included are eight (!) scenes which can be selected in the UI.

This runs surprisingly fast, albeit at lower resolutions than native (512x384).

# Screenshots:

Cornell Tiny Light | Night Sky | Wada
:------------------|-----------|-----
![cornell tiny light](https://github.com/shur-complement/js-smallpt/assets/139090555/4826fdd6-f434-4782-b063-9ec86863584a) | ![night sky](https://github.com/shur-complement/js-smallpt/assets/139090555/2e3148ec-443b-4c3c-96cc-e0f1a0755b5e) | ![wada](https://github.com/shur-complement/js-smallpt/assets/139090555/7fe1e735-b887-477c-b5f4-f1a34eeefded)

# Credits

Credit to the original C++ version at http://www.kevinbeason.com/smallpt/ .
