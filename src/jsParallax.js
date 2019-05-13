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
                let valueCurr = ((selector.getBoundingClientRect().bottom / (selector.offsetTop + selector.clientHeight))).toFixed(2);
                let valueCurrWindow = (window.scrollY / window.innerHeight).toFixed(2);
                let style = "";
                for (let value of element.values) {
                    let valueToSet = false;
                    if (value.type == "window") {
                        valueToSet = valueCurrWindow * value.to;
                    } else {
                        valueToSet = valueCurr * value.to;
                    }
                    if (valueToSet < value.from) {
                        valueToSet = value.from;
                    } else if (valueToSet > value.to) {
                        valueToSet = value.to;
                    }
                    style += "--" + value.name + ": " + valueToSet + value.unit + ";";
                }
                selector.style = style;
            }
        } else {
            console.warn("Selector is not an object", {selector});
        }
    }

    mount() {
        for(let element of this.state.data) {
            if (typeof window === "object") {
                this.makeMovement(element);
                window.addEventListener("scroll", event => this.makeMovement(element));
            } else {
                console.warn("Window is not an object!");
            }
        }
    }
}