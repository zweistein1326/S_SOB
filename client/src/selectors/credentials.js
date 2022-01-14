export default (allCredentials) => {
    return Array.from(allCredentials.values()).sort((a, b) => {
        console.log(a, b)
        console.log('order');
        return a.iat < b.iat
    })
}