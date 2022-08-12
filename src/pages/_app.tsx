import type { AppProps } from "next/app";
import "../styles/global.css";
import "../styles/day-picker.css";
import { CalendarProvider } from "../contexts/ContextCalendarProvider";
import { AuthProvider } from "../contexts/AuthContextProvider";
import { ModalProvider } from "../contexts/ContextModalProvider";
import { NavbarsProvider } from "../contexts/NavbarsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NavbarsProvider>
        <ModalProvider>
          <CalendarProvider>
            <Component {...pageProps} />
          </CalendarProvider>
        </ModalProvider>
      </NavbarsProvider>
    </AuthProvider>
  );
}

export default MyApp;
