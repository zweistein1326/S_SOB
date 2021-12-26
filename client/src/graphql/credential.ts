import { gql } from "@apollo/client";

export const ADDCREDENTIAL = gql`
    fragment Payload on REST{
        title: String,
        value: String,
        issuerId: String,
        receiverId: String
    }
    mutation AddCredential($input:Payload!){
        addCredential(input:$input) @rest(type:"Post",method:"POST",path:"/addCredential"){
            status
            credential
            message
        }
    }
`;

export const CHANGESTATUS = gql`
    fragment Payload on REST {
        id: String
    }
    mutation ChangeCredentialStatus($input: Payload!){
        changeCredentialStatus(input: $input)
            @rest(type: "Post", method: "POST", path: "/updateCredential") {
                status
            }
    }
`;