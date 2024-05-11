"use client";

import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";

export const menuItems = [
  {
    name: "How to Play",
    onClickArg: "howTo",
    href: "/",
  },
  {
    name: "Rankings",
    onClickArg: "rankings",
    href: "/",
  },
  {
    name: "Switch to Turkish Mode",
    onClickArg: "/tr",
    href: "/tr",
  },
];

export type MenuProps = {
  setShowMenuItem: (arg: string | null) => void;
};

export default function Menu(props: MenuProps) {
  const router = useRouter();
  const { setShowMenuItem } = props;

  const handleSwitchLanguage = (href) => {
    router.push(href);
    setShowMenuItem(null); // Close the menu after changing the language
  };

  return (
    <div
      data-testid="menu-page"
      className="h-screen z-40 shadow w-full backdrop-blur-sm absolute"
    >
      <div className="mx-2 rounded mt-12 p-2 md:mx-24 lg:mx-60 shadow-md border flex flex-col  bg-white text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:border dark:border-zinc-800">
        <div
          data-testid="nav-menu"
          className=" flex flex-row justify-end dark:text-zinc-400 "
        >
          <button
            className="text-lg dark:hover:text-zinc-300 hover:text-yellow-500 p-1 rounded-full"
            onClick={() => setShowMenuItem(null)}
            data-testid="close-btn"
          >
            <AiOutlineClose />
          </button>
        </div>
        {menuItems.map((item) => (
          <button
            key={item.name}
            className="font-light border-b dark:border-zinc-800 py-2 my-1 px-2 hover:text-yellow-500"
            onClick={() => handleSwitchLanguage(item.href)}
          >
            <p>{item.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
