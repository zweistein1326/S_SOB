export interface Credential{
    id: string,
    title: string,
    value: any,
    iat: Date,
    issuer: string,
    signature: string,
    url: string
}