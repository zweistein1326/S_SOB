export default (state:Map<string,any> = new Map(), action:any) => {
    switch (action.type) {
        case 'SET_CREDENTIALS':
            let tempMap = state;
            tempMap.set(action.credential.id,action.credential)
            return tempMap;
        // case 'CREDENTIALS':
        //     return { username: action.username }
        default: return state;
    }
}