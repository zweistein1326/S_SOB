export default (state = {}, action:any) => {
    switch (action.type) {
        case 'LOGIN':
            console.log(action.user)
            return {user:action.user}
        // case 'CREDENTIALS':
        //     return { username: action.username }
        case 'LOGOUT':
            return {}
        default: return state;
    }
}