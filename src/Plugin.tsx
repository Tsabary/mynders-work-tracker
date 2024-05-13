import "./styles.css";
import React from "react";
import { NativePluginProps, PluginProps } from "mynders";
import { MyndersProvider } from "./context/mynders-context";
import { Calendar } from "./components/Calendar";
import { FirebaseProvider } from "./context/firebase-context";
import { CalendarProvider } from "./context/calendar-context";

function Plugin() {
  return (
    <div className="absolute inset-0 p-2 md:!p-6 bg-white z-20">
      <div className="h-full w-full">
        <Calendar />
      </div>
    </div>
  );
}
const PluginContainer = React.memo((props: PluginProps & NativePluginProps) => (
  <MyndersProvider {...props}>
    <FirebaseProvider firebaseConfig={props.firebaseConfig}>
      <CalendarProvider>
        <Plugin />
      </CalendarProvider>
    </FirebaseProvider>
  </MyndersProvider>
));
export default PluginContainer;
