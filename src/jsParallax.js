export default class JsParallax {
    constructor(elements) {
        this.state = {
            data: elements
        }
    }

    makeMovement(element) {
        const selector = typeof element.selector === "object" ? element.selector.current : document.querySelector(element.selector);
        if (typeof selector === "object") {
            let isInView = false;
            if (typeof selector.getBoundingClientRect === "function") {
                isInView = (selector.getBoundingClientRect().top <= window.innerHeight && selector.getBoundingClientRect().bottom >= 0);
            } else {
                console.log({selector});
            }
            if (isInView) {
                let valueCurr = false;
                let style = "";
                for (let value of element.values) {
                    if (value.type == "window") {
                        valueCurr = (window.scrollY / window.innerHeight).toFixed(2);
                    } else {
                        valueCurr = ((selector.getBoundingClientRect().bottom / (selector.offsetTop + selector.clientHeight))).toFixed(2);
                    }
                    let valueToSet = false;
                    let difference = false;
                    if (value.to > value.from) {
                        difference = value.to - value.from;
                        valueToSet = value.from + difference * valueCurr;
                    } else {
                        difference = value.from - value.to;
                        valueToSet = value.from - difference * valueCurr;
                    }
                    valueToSet = valueToSet > value.to ? value.to : valueToSet;
                    valueToSet = valueToSet < value.from ? value.from : valueToSet;
                    style += "--" + value.name + ": " + valueToSet + value.unit + ";";
                }
                selector.style = style;
            }
        } else {
            console.warn("Selector is not an object", {selector});
        }
    }

    mount() {
        for (let element of this.state.data) {
            if (typeof window === "object") {
                this.makeMovement(element);
                window.addEventListener("scroll", event => this.makeMovement(element));
            } else {
                console.warn("Window is not an object!");
            }
        }
    }
}