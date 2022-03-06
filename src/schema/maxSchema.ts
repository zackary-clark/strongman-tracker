import { gql } from "@apollo/client";

export const maxSchema = gql`
    type Max {
        id: Int!
        date: Date!
        squat1RM: Float
        bench1RM: Float
        deadlift1RM: Float
        press1RM: Float
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
