/* eslint-disable */
import { gql } from '@apollo/client';

export const GET_QUERY = gql`
    query Proposals {
        proposals(
        first: 10,
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
`;

export const GET_VOTES = gql`
    query Proposal {
        proposal(id : "QmPvbwguLfcVryzBRrbY4Pb9bCtxURagdv1XjhtFLf3wHj") {
        votes
        }
    }   
`;


export const GET_PROPOSAL = gql`
    query Proposal {
        proposal(id : "0x706977b0a9a6908a37cc596ce695f1cd70fa25cb6b1f70b55647899564490f0b") {
            votes
            choices
            start
            end
            title
            state
            scores_total
            scores_state
            scores
        }
    }
`

export const GET_LATEST_PROPOSALS = gql`
query {
    proposals (
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
      scores
      scores_by_strategy
      scores_total
      scores_updated
      author
    }
  }
`
