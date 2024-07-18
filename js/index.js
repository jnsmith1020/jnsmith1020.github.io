import PageOutline from "./page-outline.js"

document.addEventListener("DOMContentLoaded", (event) => {
    const outlines = document.querySelectorAll(".js-page-outline")

    outlines.forEach((element) => {
        const outline = new PageOutline(element)
    })
})
