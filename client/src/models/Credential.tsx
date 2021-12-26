export interface Credential{
    id: string,
    key: string,
    value: any,
    iat: Date,
    issuer: string,
    signature: string,
    url: string
}