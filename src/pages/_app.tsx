import type { AppProps } from "next/app";
import "../styles/global.css";
import "../styles/day-picker.css";
import { CalendarProvider } from "../contexts/ContextCalendarProvider";
import { AuthProvider } from "../contexts/AuthContextProvider";
import { ModalProvider } from "../contexts/ContextModalProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ModalProvider>
        <CalendarProvider>
          <Component {...pageProps} />
        </CalendarProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

export default MyApp;
