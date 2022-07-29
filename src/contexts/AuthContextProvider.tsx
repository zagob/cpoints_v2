import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import {
  auth,
  onAuthStateChanged,
  signInWithGoogle,
  signOut,
} from "../services/firebase";
import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { createUser } from "../services/firestore";

interface UserProps {
  id: string;
  avatar: string | null;
  name: string | null;
  emailValid: boolean;
}

interface AuthContextProviderProps {
  loadingUser: boolean;
  user: UserProps | null;
  onSignWithGoogle: () => void;
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

  async function onSignWithGoogle() {
    const result = await signInWithGoogle();
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.idToken;
    setCookie(null, "token", JSON.stringify(token), {
      path: "/dashboard",
    });

    const { displayName, emailVerified, photoURL, uid } = result.user;
    await createUser();
  }

  function onSignOut() {
    signOut(auth);
    destroyCookie(null, "token", {
      path: "/dashboard",
    });
    router.push("/");
  }

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { photoURL, displayName, emailVerified, uid } = user;
        setUser({
          id: uid,
          avatar: photoURL,
          name: displayName,
          emailValid: emailVerified,
        });
        router.push("/dashboard");

        return;
      }
      setLoadingUser(false);
      router.push("/");
    });

    return () => {
      setLoadingUser(false);
      subscribe();
    };
  }, []);

  return (
    <AuthContextProvider.Provider
      value={{ onSignWithGoogle, loadingUser, onSignOut, user }}
    >
      {children}
    </AuthContextProvider.Provider>
  );
}
