import { gql } from "@apollo/client";

export const SUBMITCREDENTIAL = gql`
    fragment Payload on REST{
        title: String,
        value: String,
    }
    mutation SubmitCredential($input:Payload!){
        submitCredential(input:$input) @rest(type:"Post",method:"POST",path:"/addCredential"){
            status
            credential
            message
        }
    }
`;