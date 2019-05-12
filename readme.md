# jsParallax
---
INDEV-20190512

```
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
            type: "window", (default: "selector")
            from: 0,
            to: 50,
            unit: "vw"
        },
        …]
    },
    …
]).mount();
```