import type { AppProps } from "next/app";
import "../styles/global.css";
import "../styles/day-picker.css";
import { CalendarProvider } from "../contexts/ContextCalendarProvider";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../contexts/AuthContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CalendarProvider>
        <Component {...pageProps} />
      </CalendarProvider>
    </AuthProvider>
  );
}

export default MyApp;
