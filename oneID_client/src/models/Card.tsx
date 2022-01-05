export interface Card{
    userId: String,
    id: String|null,
    cardInfo:CardInfo,
    backgroundColor:String,
    foregroundColor:String,
    // avatar 
}

export interface CardInfo{
    name: String,
    cardTitle: String,
    phone: String,
    email: String,
    website: String,
    social1: String,
    social2: String,
    social3: String,
}