export const sortByDate = (order) => ({
    type: 'SORT_BY_DATE',
    order
})
export const sortByAmount = (order) => ({
    type: 'SORT_BY_AMOUNT',
    order
})
export const searchByText = (searchQuery = '') => ({
    type: 'SEARCH_BY_TEXT',
    text: searchQuery
})
export const searchByDate = (startDate = NaN, endDate = NaN) => ({
    type: 'SEARCH_BY_DATE',
    startDate,
    endDate
})