# coco
### CSS Orientation Controls
Orientation controls for 3D CSS builds.

## Usage

Import the script in your HTML:
```HTML
<script src="https://unpkg.com/cocobean@0.1.4/coco.js"></script>
```

And add coco to an element:
```JS
var element = document.querySelector('.3dCSS');
element.coco();
```

Rotate the element by dragging, move with arrow keys.

### Move the camera:

```JS
var element = document.querySelector('.3dCSS');
var coco = element.coco();
coco.camera(x, y, z);
```

### Multiple elements (grouped coco)

```JS
var elements = document.querySelectorAll('.3dCSS, .3dPlane');
elements.coco();
```

## Examples

[Check out this collection](https://codepen.io/collection/XbyYMZ) on Codepen.