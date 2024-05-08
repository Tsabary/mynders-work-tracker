import "./styles.css";
import React, { useEffect } from "react";
import { NativePluginProps, PluginProps } from "mynders";
import { MyndersProvider } from "./context/mynders-context";
import useMynders from "./hooks/useMynders";
import { Calendar } from "./components/Calendar";
import { FirebaseProvider } from "./context/firebase-context";
import firebaseConfig from "./firebase";
import { CalendarProvider } from "./context/calendar-context";

function Plugin() {
  const { user, folderId, isLosingFocus } = useMynders();

  useEffect(() => {
    if (isLosingFocus) {
      // If we want to execute anything once the user navigates away from the folder, as when they open a child folder, this is where we do so.
    }
  }, [isLosingFocus]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 overflow-y-auto no-scrollbar">
      <Calendar />
    </div>
  );
}
const PluginContainer = React.memo((props: PluginProps & NativePluginProps) => (
  <MyndersProvider {...props}>
    <FirebaseProvider firebaseConfig={firebaseConfig}>
      <CalendarProvider>
        <Plugin />
      </CalendarProvider>
    </FirebaseProvider>
  </MyndersProvider>
));
export default PluginContainer;
