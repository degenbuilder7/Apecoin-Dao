import { gql } from "@apollo/client";

export const GET_QUERY = gql`
    query Proposals {
        proposals(
        first: 20,
        skip: 0,
        where: {
            space_in: ["apecoin.eth"],
            state: "closed"
        },
        orderBy: "created",
        orderDirection: desc
        ) {
        id
        title
        body
        choices
        start
        end
        snapshot
        state
        author
        space {
            id
            name
        }
        }
    }
`

export const GET_VOTES = gql`
    query Proposal {
        proposal(id : "QmPvbwguLfcVryzBRrbY4Pb9bCtxURagdv1XjhtFLf3wHj") {
        votes
        }
    } 
  
`