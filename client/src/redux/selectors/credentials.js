export default (allCredentials) => {
    return Array.from(allCredentials.values()).filter((credential) => !credential.private).sort((a, b) => b.iat - a.iat)
}