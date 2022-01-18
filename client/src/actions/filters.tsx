export const searchByText = (searchQuery = '') => ({
    type:'SEARCH_BY_TEXT',
    text: searchQuery
})