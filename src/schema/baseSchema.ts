import { gql } from "@apollo/client";
import { maxSchema } from "./maxSchema";
import { workoutSchema } from "./workoutSchema";

export default gql`
    scalar Date

    interface MutationPayload {
        success: Boolean!
    }

    type Query {
        maxes: [Max!]!
    }

    type Mutation {
        addMax(input: AddMaxInput!): AddMaxPayload
        deleteMax(input: DeleteMaxInput!): DeleteMaxPayload
    }
    
    ${maxSchema}
    ${workoutSchema}
`;
