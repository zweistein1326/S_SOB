export default (expenses, { text = '', sortBy = '', startDate = null, endDate = null, order }) => {
    return expenses.filter((expense) => {
        if (expense) {
            const textMatch = expense.title.toLowerCase().includes(text.toLowerCase()) || expense.note.toLowerCase().includes(text.toLowerCase());
            var betweenDates = true;
            if (!!startDate && !!endDate) {
                betweenDates = (expense.date >= startDate && expense.date <= endDate)
            }
            return textMatch && betweenDates;
        }
    }).sort((a, b) => {
        console.log(order)
        if (sortBy === 'date') {
            return a.date < b.date ? order : order * -1;
        }
        else if (sortBy === 'amount') {
            return a.amount < b.amount ? order : order * -1;
        }
    })
}