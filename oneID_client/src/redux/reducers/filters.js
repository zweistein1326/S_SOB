const filterReducerDefaultState = { text: '' }

export default (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SEARCH_BY_TEXT':
            return {
                ...state,
                text: action.text
            }
        default: return state
    }
}