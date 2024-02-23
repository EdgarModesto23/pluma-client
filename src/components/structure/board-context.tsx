import { createContext, useMemo, useState } from "react";

export interface noteInfo {
  id: string;
  title: string;
  body: string;
  color: string;
  creator: string;
}

interface TitleContext {
  title: string;
  notes: Array<noteInfo>;
  setTitle: (newTitle: string) => void;
  setNotes: (newNotes: Array<noteInfo>) => void;
}

export const BoardTitleContext = createContext<TitleContext | null>(null);

const TitleProvider = ({ children }) => {
  const [currentTitle, setTitle] = useState("");
  const [currentNotes, setCurrentNotes] = useState<Array<noteInfo>>([
    {
      id: "",
      title: "",
      body: "",
      color: "",
      creator: "",
    },
  ]);

  const contextValue = useMemo(() => {
    const context: TitleContext = {
      title: currentTitle,
      notes: currentNotes,
      setTitle: setTitle,
      setNotes: setCurrentNotes,
    };
    return context;
  }, [currentTitle, currentNotes, setTitle, setCurrentNotes]);
  return (
    <BoardTitleContext.Provider value={contextValue}>
      {children}
    </BoardTitleContext.Provider>
  );
};

export default TitleProvider;
