export default class JsParallax {
    constructor(elements, react = false, decimals = 0) { //@todo: Better React support
        this.state = {
            react: react, //@todo: Better React support
            data: elements,
            decimals: decimals
        }


        this.mouse = {
            x: 0,
            y: 0
        }
    }

    isInView(selector) {
        return selector.getBoundingClientRect().top <= window.innerHeight && selector.getBoundingClientRect().bottom >= 0;
    }

    querySelector(selector) {
        if (typeof selector === "string") {
            let element = document.querySelector(selector);
            if (typeof element !== "object") {
                console.error(`Can't query selector "${selector}" in your document`);
                return false;
            } else if (element === null) {
                console.error(`Can't query selector "${selector}" in your document`);
                return false;
            } else {
                console.log("!");
                return element;
            }
        } else if (typeof selector === "object") {
            if (!(selector instanceof HTMLElement)) {
                if (!(this.state.react)) {
                    console.error("Provided element didn't exists in DOM", {selector});
                    return false;
                } else {
                    if (true==false) { //@todo: Better React support
                        console.error("Provided element is not valid React element", {selector});
                    } else {
                        if(typeof selector.current !== "object") {
                            console.error("Provided element.current is not valid React element", {selector});
                            return false;
                        } else {
                            console.log("!!!");
                            return selector.current;
                        }
                    }
                }
            } else {
                console.log("!!");
                return selector;
            }
            console.error("Unexpected error has occured");
            return false;
        } else {
            console.error("Selector must be defined as DOM Element, React ref or selector");
            return false;
        }
        console.error("Unexpected error has occured");
        return false;
    }

    calcDifference(from, to, multiplier) {
        if (to == from) {
            return to;
        } else {
            return from + ((to - from) * multiplier);
        }
    }

    makeWindow(from, to) {
        let multipler = window.scrollY / (document.body.clientHeight - window.innerHeight)
        let response = parseFloat(this.calcDifference(from, to, multipler)).toFixed(this.state.decimals);
        if (from < to) {
            if (response > to) {
                return to;
            } else if (response < from) {
                return from;
            } else {
                return response;
            }
        } else if (from > to) {
            if (response < to) {
                return to;
            } else if (response > from) {
                return from;
            } else {
                return response;
            }
        }
        console.error("Unexpected error has occured!");
        return false;
    }

    makeScroll(from, to, multipler, element) {
        if (!(this.isInView(element))) {
            return false;
        } else {
            let response = parseFloat(this.calcDifference(from, to, multipler)).toFixed(this.state.decimals);
            if (from < to) {
                if (response > to) {
                    return to;
                } else if (response < from) {
                    return from;
                } else {
                    return response;
                }
            } else if (from > to) {
                if (response < to) {
                    return to;
                } else if (response > from) {
                    return from;
                } else {
                    return response;
                }
            }
            console.error("Unexpected error has occured!");
            return false;
        }
    }

    render(values, element) {
        let style = ``;
        for (let value of values) {
            let result = 0;
            if (value.type === "window") {
                result = this.makeWindow(value.from, value.to);
            } else if (value.type === "toTop") {
                result = this.makeScroll(value.from, value.to, element.getClientRects()[0].top / window.innerHeight, element);
            } else if (value.type === "toBottom") {
                result = this.makeScroll(value.from, value.to, element.getClientRects()[0].bottom / window.innerHeight, element);
            } else if (value.type === "mouseX") {
                result = this.makeScroll(value.from, value.to, this.mouse.x, element);
            } else if (value.type === "mouseY") {
                result = this.makeScroll(value.from, value.to, this.mouse.y, element);
            }
            style += `--${value.name}: ${result}${value.unit};`;
        }
        console.log({element});
        if(element === false) {
            console.warn("Unexpected error has occurred");
            return false;
        } else {
            element.style = style;
        }
    }

    updateMouse(event) {
        this.mouse = {
            x: event.screenX / window.innerWidth,
            y: event.screenY / window.innerHeight
        }
    }

    mount() {
        console.log(this.state.data, this.state.react);
        if (typeof window !== "object") {
            console.warn("This library works only in Client-Side Rendered JavaScripts.");
        } else {
            for (let data of this.state.data) {
                let element = this.querySelector(data.selector);
                this.render(data.values, element);
                window.addEventListener("scroll", () => {
                    this.render(data.values, element);
                })
                window.addEventListener("mousemove", (evt) => {
                    this.updateMouse(evt);
                    this.render(data.values, element);
                })
            }
        }
    }
}
