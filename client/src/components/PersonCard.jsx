import React from "react";

// Helpers
import { getImageURL } from "../helpers/getImageURL";

const PersonCard = ({ person }) => (
  <div className="w-full rounded-2xl overflow-hidden shadow-md border border-transparent dark:border-white/10">
    <div className=" aspect-square">
      {person.profile_path ? (
        <img
          className="w-full aspect-square object-cover"
          src={getImageURL("w500", person.profile_path)}
          alt={person.name}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-[#f3f3f3] dark:bg-[#232323]"></div>
      )}
    </div>
    <div className="flex flex-col gap-2 p-4">
      <span className="text-large" title={person.name}>
        {person.name}
      </span>
      <span className="text-small" title={person.character || "Unknow"}>
        {person.character || "Unknow"}
      </span>
    </div>
  </div>
);

export default PersonCard;
