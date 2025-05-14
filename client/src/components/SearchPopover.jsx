import { Popover, Transition } from "@headlessui/react";
import { ArrowDown } from "lucide-react";
import { Fragment } from "react";

export default function SearchPopover({ query }) {
  console.log(query);

  return (
    <Transition
      show={query.length > 0}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="absolute top-16 left-0 w-[300px] bg-white shadow-lg rounded-md z-50 max-h-60 overflow-y-auto border border-gray-200">
        <div className="p-4">
          {query.length > 0 ? (
            query.map((item) => (
              <div key={item._id} className="mb-3 border-b pb-2">
                <h2 className="font-semibold text-sm">
                  {item.title.replace(/<[^>]+>/g, "")}
                </h2>
                <p className="text-xs text-gray-500">{item.summary}</p>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </Transition>
  );
}
