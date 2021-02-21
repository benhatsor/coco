<h1 align="center"><a href="https://github.com/barhatsor/coco"><img src="https://raw.githubusercontent.com/barhatsor/coco/main/icon.svg" height="90" width="90"><br>coco</a></h1>
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
<script src="https://unpkg.com/cocobean@0.2.2/coco.min.js"></script>
```

And add coco to an element:
```JS
var element = document.querySelector('.3dCSS');
element.coco();
```

Rotate by dragging, move with arrow keys.

### Disable default controls

```JS
element.coco(false);
```

### Move the camera

```JS
var element = document.querySelector('.3dCSS');
var scene = element.coco();
scene.camera(x, y, z);
```

### Multiple elements (grouped coco)

```JS
var elements = document.querySelectorAll('.3dCSS, .3dPlane');
elements.coco();
```

## Examples

[Check out this collection](https://codepen.io/collection/XbyYMZ) on Codepen.
