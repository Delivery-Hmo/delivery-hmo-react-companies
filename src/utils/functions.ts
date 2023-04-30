import { UploadFile } from "antd";
import { User, onIdTokenChanged, getAuth } from 'firebase/auth';

export const getCurrentToken = () => new Promise<string>((resolve) => {
  const uns = onIdTokenChanged(getAuth(), async (user: User | null) => {
    uns();

    if (user) {
      const token = await user.getIdToken();
      resolve(token);
      return;
    }

    resolve("");
  });
});


export const sleep = (time: number) => new Promise((resolve) => setTimeout(() => resolve(null), time));