# coco
### CSS Orientation Controls
Orientation controls for 3D CSS builds.

## Usage

Import the script in your HTML:
```HTML
<script src="https://unpkg.com/cocobin@0.0.8/coco.js"></script>
```

And add coco to an element:
```JS
var element = document.querySelector('.3dCSS');
element.coco();
```

### Multiple elements (grouped coco)

```JS
var elements = document.querySelectorAll('.3dCSS, .3dPlane');
elements.coco();
```
