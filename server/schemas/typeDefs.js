const typeDefs = `
    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook([authors]: String, description: String, title: String, bookId: String, image: String, link: String): User
        removeBook(bookId): User
    }

    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: bookId
        authors: [authors]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: String
        user: User
    }
`;

module.exports = typeDefs;
