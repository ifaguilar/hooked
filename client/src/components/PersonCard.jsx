import React from "react";

// Helpers
import { getImageURL } from "../helpers/getImageURL";

const PersonCard = ({ person }) => (
  <div className="w-full rounded-2xl overflow-hidden shadow-md bg-white dark:bg-neutral-900">
    <div className=" aspect-square">
      {person.profile_path ? (
        <img
          className="w-full aspect-square object-cover"
          src={getImageURL("w500", person.profile_path)}
          alt={person.name}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800"></div>
      )}
    </div>
    <div className="flex flex-col gap-2 p-4">
      <span className="text-overflow font-semibold" title={person.name}>
        {person.name}
      </span>
      <span
        className="text-overflow text-sm text-neutral-800 dark:text-neutral-300"
        title={person.character || "Unknow"}
      >
        {person.character || "Unknow"}
      </span>
    </div>
  </div>
);

export default PersonCard;
