import { FiRefreshCcw } from "react-icons/fi";

export type ButtonsProps = {
  searchWord: () => void;
  shuffle: () => void;
  clearWord: () => void;
};

export default function Buttons(props: ButtonsProps) {
  const { searchWord, shuffle, clearWord } = props;
  const isTurkish = window.location.pathname.endsWith("/tr");

  return (
    <div className="mt-16 flex flex-row items-center justify-center ">
      <button
        onClick={() => clearWord()}
        id="delete"
        className="border m-2 py-3 px-4 rounded-full active:bg-gray-100 disabled:active:bg-white select-none"
      >
        {isTurkish ? "Sil" : "Delete"}
      </button>
      <button
        aria-label="Shuffle letters"
        id="shuffle"
        className="border m-2 p-4 rounded-full active:bg-gray-100 text-xl disabled:active:bg-white select-none"
        onClick={() => shuffle()}
      >
        <FiRefreshCcw />
      </button>
      <button
        id="enter"
        onClick={() => searchWord()}
        className="border m-2 py-3 px-4 rounded-full active:bg-gray-100 disabled:active:bg-white select-none"
      >
        Enter
      </button>
    </div>
  );
}
