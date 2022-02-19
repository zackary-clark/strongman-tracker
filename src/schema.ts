import { gql } from "@apollo/client";

export default gql`
    scalar Date

    interface MutationPayload {
        success: Boolean!
    }

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
        deleteMax(input: DeleteMaxInput!): DeleteMaxPayload
    }

    input AddMaxInput {
        date: Date!
        squat1RM: Float
        bench1RM: Float
        deadlift1RM: Float
        press1RM: Float
    }

    type AddMaxPayload implements MutationPayload {
        success: Boolean!
        max: Max
    }

    input DeleteMaxInput {
        id: Int!
    }

    type DeleteMaxPayload implements MutationPayload {
        success: Boolean!
    }
`;
