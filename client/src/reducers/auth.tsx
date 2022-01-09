export default (state = {}, action:any) => {
    switch (action.type) {
        case 'LOGIN':
            return {user:action.user}
        // case 'CREDENTIALS':
        //     return { username: action.username }
        case 'SET_ACCOUNT':
            return {account: action.account}
        case 'LOGOUT':
            return {}
        default: return state;
    }
}