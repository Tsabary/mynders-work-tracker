import React, { createContext, useState } from "react";

type CalendarContextProps = {
  selectedLog?: {
    _id: string;
    // comments: string;
    start: Date;
    end: Date;
  } | null;
  setSelectedLog?: React.Dispatch<
    React.SetStateAction<{
      _id: string;
      // comments: string;
      start: Date;
      end: Date;
    } | null>
  >;
};

export const CalendarContext = createContext<CalendarContextProps>({});

interface CalendarProviderProps extends React.PropsWithChildren<{}> {}

export const CalendarProvider: React.FC<CalendarProviderProps> = ({
  children,
}) => {
  const [selectedLog, setSelectedLog] = useState<{
    _id: string;
    // comments: string;
    start: Date;
    end: Date;
  } | null>(null);
  return (
    <CalendarContext.Provider value={{ selectedLog, setSelectedLog }}>
      {children}
    </CalendarContext.Provider>
  );
};
