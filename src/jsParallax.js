class JsParallax {
    constructor(elements) {
        this.state = {
            data: elements
        }
    }

    makeMovement(element) {
        const selector = document.querySelector(element.selector);
        let isInView = (selector.getBoundingClientRect().top <= window.innerHeight && selector.getBoundingClientRect().bottom >= 0);
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
    }

    mount() {
        for(let element of this.state.data) {
            this.makeMovement(element);
            if (typeof window === "object") {
                window.addEventListener("scroll", event => this.makeMovement(element));
            } else {
                console.warn("Window is not an object!");
            }
        }
    }
}

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
            type: "window",
            from: 0,
            to: 50,
            unit: "vw"
        }]
    }
]).mount();