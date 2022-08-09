import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie } from "nookies";
import {
  auth,
  onAuthStateChanged,
  signInWithGoogle,
  signOut,
} from "../services/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { createUser, db, getUser } from "../services/firestore";

interface InfoPointsProps {
  entry: string;
  entryLunch: string;
  exitLunch: string;
  exit: string;
  totalHoursWork: string;
}

interface UserProps {
  id: string;
  avatar: string | null;
  email: string | null;
  name: string | null;
  emailVerified: boolean;
  infoPoints?: InfoPointsProps;
}

interface AuthContextProviderProps {
  loadingUser: boolean;
  user: UserProps | null;
  onSignWithGoogle: () => void;
  onCreateAccountWithEmailAndPassword: () => void;
  addInfoPointsToUser: (infoPoints: InfoPointsProps) => void;
  onSignOut: () => void;
}

export const AuthContextProvider = createContext(
  {} as AuthContextProviderProps
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<UserProps | null>(({} as UserProps) || null);
  const [loadingUser, setLoadingUser] = useState(true);

  async function onCreateAccountWithEmailAndPassword() {}

  async function onSignWithGoogle() {
    const result = await signInWithGoogle();
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.idToken;
    setCookie(null, "token", JSON.stringify(token), {
      path: "/dashboard",
    });

    const { displayName, email, emailVerified, photoURL, uid } = result.user;
    const user = await getUser(uid);

    if (user) {
      setUser({
        ...user,
        email,
        avatar: photoURL,
        emailVerified,
        id: uid,
        name: displayName,
      });
      return;
    }

    await createUser(displayName, emailVerified, email, photoURL, uid);
    router.push("/profile");
  }

  async function onSignOut() {
    await signOut(auth);
    // destroyCookie(null, "token", {
    //   path: "/dashboard",
    // });
    router.push("/");
  }

  async function addInfoPointsToUser(infoPoints: InfoPointsProps) {
    setUser((old: any) => {
      return {
        ...old,
        infoPoints,
      };
    });
  }

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { photoURL, email, displayName, emailVerified, uid } = user;
        const userFirestore = await getUser(uid);

        setUser({
          ...userFirestore,
          avatar: photoURL,
          name: displayName,
          emailVerified,
          email,
          id: uid,
        });

        if (!emailVerified) {
          return router.push("/verifyEmail");
        }

        if (!userFirestore?.infoPoints) {
          return router.push("/profile");
        }

        router.push("/dashboard");

        return;
      }
      router.push("/");
      setLoadingUser(false);
    });

    return () => {
      subscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return (
    <AuthContextProvider.Provider
      value={{
        onSignWithGoogle,
        addInfoPointsToUser,
        loadingUser,
        onSignOut,
        user,
        onCreateAccountWithEmailAndPassword,
      }}
    >
      {children}
    </AuthContextProvider.Provider>
  );
}
