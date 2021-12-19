export interface Credential{
    id: string,
    iat?: Date,
    issuer: string,
    signature: string,
    digest:string,
    url:string
}