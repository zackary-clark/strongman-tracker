import { gql } from "@apollo/client";

export default gql`
    scalar Date
    
    type Max {
        id: Int!
        date: Date!
        squat1RM: Float
        bench1RM: Float
        deadlift1RM: Float
        press1RM: Float
    }

    type Query {
        maxes: [Max!]!
    }
    
    type Mutation {
        addMax(input: AddMaxInput!): AddMaxPayload
    }
    
    input AddMaxInput {
        date: Date!
        squat1RM: Float
        bench1RM: Float
        deadlift1RM: Float
        press1RM: Float
    }
    
    type AddMaxPayload {
        max: Max
    }
`;
