import { gql } from "@apollo/client";

const allMaxesQueryDocument = gql`
    query AllMaxes {
        maxes {
            id
            date
            squat1RM
            deadlift1RM
            press1RM
            bench1RM
        }
    }
`;

const addMaxMutationDocument = gql`
    mutation AddMax($input: AddMaxInput!) {
        addMax(input: $input) {
            max {
                id
                date
                squat1RM
                deadlift1RM
                press1RM
                bench1RM
            }
        }
    }
`;

const deleteMaxMutationDocument = gql`
    mutation DeleteMax($input: DeleteMaxInput!) {
        deleteMax(input: $input) {
            success
        }
    }
`;
