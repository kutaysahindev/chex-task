import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";

export type HeaderProps = {
  date?: string;
  editor?: string;
  setShowMenu: () => void;
};

export default function Header(props: HeaderProps) {
  const { editor, setShowMenu } = props;
  const [isTurkish, setIsTurkish] = useState(false);

  useEffect(() => {
    setIsTurkish(window.location.pathname.endsWith("/tr"));
  }, []);

  return (
    <div className=" md:p-4 flex flex-row md:justify-between w-full md:items-start justify-end ">
      <div className="hidden md:flex flex-col ml-4">
        <div className="flex flex-row items-end">
          <h1 className="font-display font-bold text-4xl pr-4 text-yellow-500">
            Spelling Bee 🐝
          </h1>
        </div>
        {editor && (
          <div>
            {isTurkish ? (
              <h2>Chex görevi için yapıldı - Kutay Şahin</h2>
            ) : (
              <h2>Made for Chex task - Kutay Şahin</h2>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col items-end">
        <button
          aria-label="Open/close menu"
          id="open-menu"
          className="hover:bg-gray-100 active:bg-gray-200 text-2xl m-2 w-10 h-10 rounded-full flex items-center justify-center"
          onClick={() => setShowMenu()}
        >
          <GiHamburgerMenu />
        </button>
      </div>
    </div>
  );
}
