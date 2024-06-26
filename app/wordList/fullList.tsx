import { capitalize } from ".";
import ArrowIcon from "./arrowIcon";

export type FullListProps = {
  words?: string[];
  answers?: string[];
  pangrams?: string[];
};

export default function FullList(props: FullListProps) {
  const { words, answers, pangrams } = props;

  return (
    <div className="w-full">
      <div className="w-full flex flex-col flex-wrap ">
        {words &&
          [...words]
            .sort((a, b) => a.length - b.length)
            .map((i) => (
              <p
                key={i}
                className={
                  pangrams?.includes(i.toLowerCase())
                    ? "px-1 border-b border-b-gray-300 py-2 font-semibold"
                    : "px-1 border-b border-b-gray-300 py-2"
                }
              >
                {capitalize(i)}
              </p>
            ))}
      </div>
    </div>
  );
}
