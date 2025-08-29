import { SUBSCRIPTIONS } from "./subscriptions";
import { pubsub } from "./pubsub";

export const resolvers = {
  Query: {
    _empty: () => "Server is up!",
  },
  Subscription: {
    bookLiked: {
      subscribe: () => pubsub.asyncIterableIterator(SUBSCRIPTIONS.BOOK_LIKED),
    },
  },
};
