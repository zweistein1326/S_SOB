export default (allCredentials) => {
    return Array.from(allCredentials.values()).sort((a, b) => b.iat - a.iat)
}