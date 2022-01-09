export default (state:any[] = [], action:any) => {
    switch (action.type) {
        case 'SET_CREDENTIALS':
            console.log(action.credentials)
            let newState = state.concat(action.credentials)
            return newState;
        // case 'CREDENTIALS':
        //     return { username: action.username }
        default: return state;
    }
}