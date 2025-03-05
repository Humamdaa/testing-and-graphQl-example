
import { getMessage } from "../controllers/messageController";

const helloResolver = {
  Query: {
    hello: (): string => {
      return getMessage();
    },
  },
};

export { helloResolver };
