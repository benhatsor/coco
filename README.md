<h1 align="center"><a href="https://github.com/barhatsor/coco"><img src="coco.svg" height="90" width="90"><br>coco</a></h1>
<p align="center">
  <h3 align="center">  
    CSS Orientation Controls
  </h3>
  <p align="center">Orientation controls for 3D CSS builds.</p>
</p>
<p align="center">
  <a target='_blank' href='https://www.npmjs.com/package/cocobean'><img src='https://img.shields.io/npm/v/cocobean?color=green&style=flat-square'/></a>
  <a target='_blank' href='./LICENSE'><img src='https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square'/></a>
</p>

## Usage

Import the script in your HTML:
```HTML
<script src="https://unpkg.com/cocobean@0.1.5/coco.min.js"></script>
```

And add coco to an element:
```JS
var element = document.querySelector('.3dCSS');
var coco = element.coco();
```

Rotate the element by dragging, move with arrow keys.

### Move the camera

```JS
coco.camera(x, y, z);
```

### Multiple elements (grouped coco)

```JS
var elements = document.querySelectorAll('.3dCSS, .3dPlane');
var coco = elements.coco();
```

## Examples

[Check out this collection](https://codepen.io/collection/XbyYMZ) on Codepen.

## License

[MIT](https://opensource.org/licenses/mit-license.php)
Copyright © 2020 Bar Hatsor (<a href="https://www.berryscript.com">@barhatsor</a>)
