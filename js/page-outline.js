export default class PageOutline {
    isExpanded = false

    constructor(element) {
        this.element = element
        this.children = element.querySelectorAll(".js-page-outline__list-item")
        this.toggleButton = element.querySelector(".js-page-outline__toggle")
        this.init()
    }

    init() {
        this.initChildren()
        this.initToggleButton()
    }

    initChildren() {
        this.hide()
    }

    initToggleButton() {
        this.toggleButton.onclick = () => {
            this.toggle()
        }
    }

    show() {
        this.children.forEach((child, index) => {
            if (index > 2)
                child.classList.remove("sr-only")
        })
        this.toggleButton.innerText = "Show less"
        this.isExpanded = true
    }

    hide() {
        this.children.forEach((child, index) => {
            if (index > 2)
                child.classList.add("sr-only")
        })
        this.toggleButton.innerText = "Show more"
        this.isExpanded = false
    }

    toggle() {
        this.isExpanded ? this.hide() : this.show()
    }
}
