import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import regeneratorRuntime from "regenerator-runtime";
import '../css/App.css';

// import tw from "twin.macro";

// const SearchContainer = tw.div`
//   mb-6
//   mt-6
//   flex
//   items-center
// `;

// const SearchText = tw.h2`
//   text-xl
// text-gray-600
//   mr-6
// `;

// const Input = tw.input`
//   h-8
//   border-2
//   border-solid
//   border-green-500
//   outline-none
//   p-4
//   rounded-lg
// `;

const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) =>  {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
    <div className="SearchContainer my-10">
       <input
        className="alinput px-3 py-3 rounded-full"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="search here..."
      />
    </div>
  );
}

export default GlobalFilter