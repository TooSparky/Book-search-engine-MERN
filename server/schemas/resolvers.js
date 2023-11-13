const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            return User.findOne({ _id: context.user._id });
        },
    },

    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });

            if (!user) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },

        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            
            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { bookId }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            return User.findOneAndUpdate(
                { _id: bookId },
                { $addToSet: { savedBooks: body }},
                { new: true, runValidators: true }
            );
        },

        deleteBook: async (parent, { bookId }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            return User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: bookId }}},
                { new: true }
            );
        },
    },
};

module.exports = resolvers;
