export default (state = {}, action:any) => {
    switch (action.type) {
        case 'SET_USER':
            return {...state, user: action.user }
        case 'SET_ALL_USERS':
            return {...state, allUsers: action.allUsers }
        case 'SET_FOLLOWING':
            return {...state, following: action.following }
        case 'SET_FAVORITE':
            return { ...state, favorite: action.favorite  }
        case 'SET_ACCOUNT':
            return {...state, account: action.account }
        case 'LOGOUT':
            return {}
        default: return state;
    }
}