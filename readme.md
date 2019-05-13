# js-parallax
---
INDEV-20190513 (React-Ready)

## Install
`yarn add js-parallax` or `npm add js-parallax`

## Build
`yarn build`

## Import
`import JsParallax from "js-parallax"`

## Sample
```javascript
new JsParallax([
    {
        selector: ".box",
        values: [{
            name: "xyz",
            from: 0,
            to: 180,
            unit: "deg"
        }, {
            name: "x",
            type: "window", /*(default: "selector")*/
            from: 0,
            to: 50,
            unit: "vw"
        }
        ]
    }
]).mount();
```

```css
.box {
    position: relative;
    left: var(--x);
    display: block;
    width: 128px;
    height: 128px;
    margin-top: calc(50vh - 64px);
    background: #a00;
    transform: rotate(var(--xyz));
    transform-origin: center center;
    transition: all 150ms linear;
}
```