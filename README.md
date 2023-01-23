<h1 align="center"><a href="https://github.com/benhatsor/coco"><img src="https://raw.githubusercontent.com/benhatsor/coco/main/icon.svg" height="90" width="90"><br>coco</a></h1>
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

## About coco

- [Read the Medium article](https://benhatsor.medium.com/creating-3d-worlds-with-css-21186d754984)

## Usage

Import the script in your HTML:
```HTML
<script src="https://unpkg.com/cocobean/coco.min.js"></script>
```

And add coco to an element:
```JS
document.querySelector('.3dCSS').coco();
```

Rotate by dragging, move with arrow keys.

### Disable default controls

```JS
document.querySelector('.3dCSS').coco(false);
```

### Move the camera

```JS
var scene = document.querySelector('.3dCSS').coco();
scene.camera(x, y, z);
```

### Multiple elements (grouped coco)

```JS
document.querySelectorAll('.3dCSS, .3dPlane').coco();
```

## Examples

[Check out this collection](https://codepen.io/collection/XbyYMZ) on Codepen.
