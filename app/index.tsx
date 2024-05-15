"use client";

import { useEffect, useState } from "react";
import { GameData, getPoints, handleSubmit } from "../lib/functions";
import Header from "./header";
import Menu from "./menu/menu";
import HowTo from "./how-to/page";
import Rankings from "./rankings";
import Realistic from "./effects/realistic";
import Encouragement from "./effects/encouragement";
import UserRanking from "./rankings/userRanking";
import WordList from "./wordList";
import InputIndex from "./gameInput";

export type GameIndexProps = {
  data: GameData;
};

export default function GameIndex(props) {
  const { data } = props;
  const [showMenuItem, setShowMenuItem] = useState<string | null>(null);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [inputWord, setInputWord] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [addedPoints, setAddedPoints] = useState<number | null>(null);
  const [foundPangram, setFoundPangram] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    if (!data) {
      return;
    }
    if (data.answers.length === foundWords.length) {
      setInputWord("Epic!");
      setGameOver(true);
    }
    // Handle timer expiration
    if (timer === 0) {
      setGameOver(true);
    }
  }, [data, foundWords, timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        setTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver]);

  const handleEnter = (word: string) => {
    if (word.length === 0 || data === undefined) {
      return;
    }
    const submitObj = handleSubmit(word, data, foundWords);
    if (submitObj.addedPoints === 0) {
      setMessage(submitObj.message);
      setTimeout(() => {
        setInputWord("");
      }, 500);
      setTimeout(() => {
        setMessage(null);
      }, 750);
    } else {
      localStorage.setItem("foundWords", String([word, ...foundWords]));
      setFoundWords([word, ...foundWords]);
      setMessage(submitObj.message);
      setAddedPoints(getPoints([word]));
      submitObj.message === "Pangram!" && setFoundPangram(true);
      setTimer((prevTimer) => prevTimer + 15); // Add 15 seconds
      setTimeout(() => {
        setInputWord("");
      }, 500);
      setTimeout(() => {
        setAddedPoints(null);
        setMessage(null);
      }, 1000);
      setTimeout(() => {
        setFoundPangram(false);
      }, 4000);
    }
  };

  const handleReplay = () => {
    setFoundWords([]);
    setInputWord("");
    setMessage(null);
    setAddedPoints(null);
    setFoundPangram(false);
    setTimer(60);
    setGameOver(false);
  };

  return (
    <div className={"flex flex-col items-center justify-start min-h-screen"}>
      <Header
        date={data.displayDate}
        editor={data.editor}
        setShowMenu={() => setShowMenuItem("navbar")}
      />
      {showMenuItem === "navbar" && (
        <Menu setShowMenuItem={(arg) => setShowMenuItem(arg)} />
      )}
      {showMenuItem === "howTo" && <HowTo />}
      {showMenuItem === "rankings" && (
        <Rankings
          currentScore={getPoints(foundWords)}
          geniusScore={getPoints(data.answers)}
          setShowMenuItem={(arg) => setShowMenuItem(arg)}
        />
      )}
      {data.answers.length === foundWords.length && (
        <Realistic reaction={"Bravo!"} />
      )}
      {foundPangram === true && <Realistic reaction={message} />}
      {addedPoints !== null && message !== null && (
        <Encouragement text={message} points={addedPoints} />
      )}
      <div className="flex flex-col md:flex-row-reverse w-full pb-12">
        <div className="flex flex-col md:w-1/2 w-full md:px-2 items-center">
          <UserRanking
            answers={data.answers}
            userPoints={getPoints(foundWords)}
          />
          <WordList
            answers={data.answers}
            pangrams={data.pangrams}
            words={foundWords}
          />
        </div>
        <div className="timer my-auto bg-yellow-300 p-5 rounded-xl text-center text-white font-bold">
          {timer} seconds
        </div>
        <InputIndex
          message={!addedPoints ? message : undefined}
          inputWord={inputWord}
          setInputWord={(str) => setInputWord(str)}
          centerLetter={data.centerLetter.toUpperCase()}
          enterWord={(word) => handleEnter(word)}
          outerLetters={data.outerLetters.map((i) => i.toUpperCase())}
        />
        {gameOver && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-10 rounded-lg flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4">Game Over</h2>
              <p className="m mb-4">Score: {getPoints(foundWords)}</p>
              <button
                onClick={handleReplay}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Replay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
