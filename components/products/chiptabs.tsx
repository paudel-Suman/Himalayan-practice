import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import Review from "./review";

const tabs = ["Description", "Reviews"];

const ChipTabs = ({
  description,
  productId,
}: {
  description: string;
  productId: string;
}) => {
  const [selected, setSelected] = useState(tabs[0]);

  return (
    <div className="my-14">
      <div className="flex items-center  flex-wrap gap-4 mb-6">
        {tabs.map((tab) => (
          <Chip
            text={tab}
            selected={selected === tab}
            setSelected={setSelected}
            key={tab}
          />
        ))}
      </div>

      <div className="px-4 min-h-[60vh] md:p-2 p-1 rounded-md bg-zinc-50">
        {selected === "Description" && <div className="p-2 text-sm">{description}</div>}
        {selected === "Reviews" && <Review productId={productId} />}
      </div>
    </div>
  );
};

// Chip button
const Chip = ({
  text,
  selected,
  setSelected,
}: {
  text: string;
  selected: boolean;
  setSelected: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected ? "text-white" : " hover:text-slate-200 border hover:bg-green-500"
      } text-sm transition-colors px-6 py-2 rounded-md relative`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-green-600 rounded-md"
        />
      )}
    </button>
  );
};

export default ChipTabs;
