export interface Credential{
    credentialId: String,
    key: String,
    value: any,
    iat: Date,
    issuerId: String,
    signature: String,
}