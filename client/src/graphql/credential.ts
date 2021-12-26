import { gql } from "@apollo/client";

export const ADDCREDENTIAL = gql`
    fragment Payload on REST{
        title: String,
        value: String,
    }
    mutation AddCredential($input:Payload!){
        addCredential(input:$input) @rest(type:"Post",method:"POST",path:"/addCredential"){
            status
            credential
            message
        }
    }
`;