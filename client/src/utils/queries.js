import { gql } from '@apollo/client';

export const GET_ME = gql`
    query GetMe {
        GetMe {
            me
        }
    }
`;
