const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { _id }) => {
            return User.findOne({ _id: _id });
        },

        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
        },
    },

    Mutation: {
        createUser: async (parent, { body }) => {
            const user = await User.create(body);

            if (!user) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },

        login: async () => {
            const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
            
            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(body.password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(token);
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
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId }}},
                    { new: true }
                );
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;
