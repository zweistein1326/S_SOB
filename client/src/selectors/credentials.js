export default (allCredentials) => {
    console.log(allCredentials);
    console.log(allCredentials.values());
    return Array.from(allCredentials.values()).sort((a, b) => {
        console.log(a, b)
        console.log('order');
        return a.iat < b.iat
    })
}