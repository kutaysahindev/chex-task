import { useState } from "react";
import Buttons from "./buttons";
import TextInput from "./input";
import Letters from "./hive";

export type InputIndexProps = {
  centerLetter: string;
  outerLetters: string[];
  enterWord: (word: string) => void;
  inputWord: string;
  setInputWord: (str: string) => void;
  message?: string | null;
  isLoading?: boolean;
};

export default function InputIndex(props: InputIndexProps) {
  const {
    message,
    /* revealedAnswers, */ centerLetter,
    outerLetters,
    enterWord,
    setInputWord,
    inputWord,
    isLoading,
  } = props;
  const [zeroToFive, setZeroToFive] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [shuffling, setShuffling] = useState<boolean>(false);

  const shuffle = (): void => {
    setShuffling(true);
    setTimeout(() => {
      setZeroToFive([...zeroToFive].sort(() => Math.random() - 0.5));
    }, 300);
    setTimeout(() => setShuffling(false), 300);
  };

  const backSpace = (): void => {
    setInputWord(inputWord.slice(0, -1));
  };

  return (
    <div className="mt-16 flex flex-col items-center md:w-1/2">
      {message !== undefined && message && (
        <div className="absolute -mt-10 z-30 bg-black text-white px-3 py-1 rounded font-light text-sm">
          <h3>{message}</h3>
        </div>
      )}
      <TextInput
        outerLetters={outerLetters}
        centerLetter={centerLetter}
        /* revealedAnswers={revealedAnswers}  */
        shuffle={() => shuffle()}
        backSpace={() => backSpace()}
        searchWord={(word) => enterWord(word)}
        userWord={inputWord}
        setUserWord={(str) => setInputWord(str)}
      />
      <Letters
        shuffling={shuffling}
        letterIndex={zeroToFive}
        centerLetter={centerLetter}
        setLetter={(letter) => setInputWord(inputWord + letter)}
        outerLetters={outerLetters}
      />
      {!isLoading && (
        <Buttons
          /* revealedAnswers={revealedAnswers}  */
          shuffle={() => shuffle()}
          clearWord={() => backSpace()}
          searchWord={() => enterWord(inputWord)}
        />
      )}
    </div>
  );
}
