const filterReducerDefaultState = { sortBy: 'date', text: '', startDate: null, endDate: null, order: 1 }

export default (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date',
                order: action.order
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount',
                order: action.order
            }
        case 'SEARCH_BY_TEXT':
            return {
                ...state,
                text: action.text
            }
        case 'SEARCH_BY_DATE':
            return {
                ...state,
                startDate: action.startDate,
                endDate: action.endDate
            }
        default: return state
    }
}