const utcToEst = (date) => {
    date.setHours(date.getHours() + 4)
    return date
}

const calculateTimeElapsed = (start, end, format = "ym") => {
    const startYear = start.getFullYear()
    const startMonth = start.getMonth()
    const endYear = end.getFullYear()
    const endMonth = end.getMonth()
    const invalidRangeError = "End date cannot be older than start date."
    let yearsElapsed = endYear - startYear
    let monthsElapsed = endMonth - startMonth
    let timeElapsed = ""

    if (yearsElapsed < 0 || monthsElapsed < 0 && yearsElapsed < 1) {
        console.error(invalidRangeError)
    }

    if (monthsElapsed < 0) {
        yearsElapsed -= 1
        monthsElapsed += 12
    }

    if (yearsElapsed > 0 && format.includes("y")) {
        timeElapsed = `${yearsElapsed} year`
        timeElapsed += yearsElapsed == 1 ? "" : "s"
    }
    
    if (monthsElapsed > 0 && format.includes("m")) {
        timeElapsed += ` ${monthsElapsed} month`
        timeElapsed += monthsElapsed == 1 ? "" : "s"
    }

    return timeElapsed
}

document.addEventListener("DOMContentLoaded", (event) => {
    const dates = document.querySelectorAll(".js-time-since")
    dates.forEach((date) => {
        now = new Date(Date.now())
        startDate = date.dataset.start ? new Date(Date.parse(date.dataset.start)) : now
        endDate = date.dataset.end ? new Date(Date.parse(date.dataset.end)) : now
        timeElapsed = calculateTimeElapsed(
            utcToEst(startDate),
            utcToEst(endDate),
            date.dataset.format,
        )

        if (timeElapsed) {
            date.innerText = timeElapsed
            date.removeAttribute("hidden")
        }
    })
})