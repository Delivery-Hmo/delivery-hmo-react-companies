import { User, onIdTokenChanged, getAuth } from "firebase/auth";

export const getCurrentToken = () => new Promise<string>((resolve, reject) => {
  const uns = onIdTokenChanged(getAuth(), async (user: User | null) => {
    uns();

    if (user) {
      const token = await user.getIdToken();
      resolve(token);
      return;
    }

    reject("");
  }, reject);
});