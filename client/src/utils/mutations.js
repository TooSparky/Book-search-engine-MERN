import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
                email
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                username
                email
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($bookId: String!, $title: String!, $authors: String, $description: String!, $image: String, $link: String) {
        saveBook(bookId: $bookId, title: $title, authors: $authors, description: $description, image: $image, link: $link) {
            bookId
            title
            authors
            description
            image
            link
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation deleteBook($bookId: String) {
        deleteBook(bookId: $bookId) {
            bookId
        }
    }
`;
