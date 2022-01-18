export default (allUsers, { text = '' }) => {
    console.log(allUsers);
    if (allUsers) {
        return allUsers.filter((user) => {
            if (user) {
                if (user.username) {
                    const textMatch = user.username.toLowerCase().includes(text.toLowerCase()) || user.id.toLowerCase().includes(text.toLowerCase());
                    return textMatch;
                }
                else {
                    const textMatch = user.id.toLowerCase().includes(text.toLowerCase());
                    return textMatch;
                }
            }
        })
    }
    else {
        return []
    }
}