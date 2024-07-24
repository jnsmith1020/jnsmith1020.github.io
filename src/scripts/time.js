export const utcToEst = (date) => {
    date.setHours(date.getHours() + 4)
    return date
}

export const calculateTimeElapsed = (start, end, format = "ym") => {
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

export const updateDates = () => {
    const dates = document.querySelectorAll(".js-timeline__date")
    dates.forEach((date) => {
        const startDate = date.dataset.start
        const endDate = date.dataset.end
        if (startDate) {
            const now = new Date(Date.now())
            const start = startDate ? new Date(Date.parse(startDate)) : now
            const end = endDate ? new Date(Date.parse(endDate)) : now
            const timeElapsed = calculateTimeElapsed(
                utcToEst(start),
                utcToEst(end)
            )
            date.innerText = timeElapsed
            /**
             * If dates are updated via JS, removed last updated dates.
             * Otherwise, the last updated date is when the project was
             * built last.
             */
            removeUpdatedDates()
        }
    })
}

const removeUpdatedDates = () => {
    const updatedDates = document.querySelectorAll(".js-timeline__updated")
    updatedDates.forEach((updatedDate) => {
        updatedDate.remove()
    })
}
