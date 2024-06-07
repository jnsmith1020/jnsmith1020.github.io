
const calculateTimeElapsed = (start, end) => {
    const startYear = start.getFullYear()
    const startMonth = start.getMonth() + 1
    const endYear = end.getFullYear()
    const endMonth = end.getMonth() + 1
    const invalidRangeError = "End date cannot be older than start date."
    let yearsElapsed = endYear - startYear
    let monthsElapsed = 0
    let timeElapsed = ""

    if (yearsElapsed < 0) {
        console.error(invalidRangeError)
    } 
    
    if (yearsElapsed > 0) {
        if (endMonth < startMonth) {
            yearsElapsed -= 1
            monthsElapsed = 12 - startMonth + endMonth
        } else {
            monthsElapsed = endMonth - startMonth
        }

        timeElapsed = `${yearsElapsed} year`
        timeElapsed += yearsElapsed == 1 ? "" : "s"
        
        if (monthsElapsed > 0) {
            timeElapsed += ` ${monthsElapsed} month`
            timeElapsed += monthsElapsed == 1 ? "" : "s"
        }
    } else if (yearsElapsed == 0) {
        monthsElapsed = endMonth - startMonth
        
        if (monthsElapsed > 0) {
            timeElapsed = `${monthsElapsed} month`
            timeElapsed += monthsElapsed == 1 ? "" : "s"
        } else {
            console.error(invalidRangeError)
        }
    }

    return timeElapsed
}

document.addEventListener("DOMContentLoaded", (event) => {
    const dates = document.querySelectorAll(".js-time-since")
    dates.forEach((date) => {
        now = new Date(Date.now())
        startDate = date.dataset.start ? new Date(Date.parse(date.dataset.start)) : now
        endDate = date.dataset.end ? new Date(Date.parse(date.dataset.end)) : now
        timeElapsed = calculateTimeElapsed(startDate, endDate)

        if (timeElapsed) {
            date.innerText = timeElapsed
            date.removeAttribute("hidden")
        }
    })
})