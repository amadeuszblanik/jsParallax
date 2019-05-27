# js-parallax
---
0.2.0-pre2 (React-Ready)

Demo: https://blanik.me/projects/js-parallax

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
            selector: "div",
            values: [{
                name: "window",
                type: "window", /* default! */
                from: 0,
                to: 180,
                unit: "deg"
            }, {
                name: "toTop",
                type: "toTop",
                from: 0,
                to: 180,
                unit: "deg"
            }, {
                name: "toBottom",
                type: "toBottom",
                from: 0,
                to: 180,
                unit: "deg"
            }, {
                name: "mouseX",
                type: "mouseX",
                from: 0,
                to: 180,
                unit: "deg"
            }, {
                name: "mouseY",
                type: "mouseY",
                from: 0,
                to: 180,
                unit: "deg"
            }
            ]
        }
    ], {react: true/false}, {decimals: 0}).mount();
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
