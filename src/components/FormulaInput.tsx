import { useState, useRef, FC } from "react";
import useStore from "../store/store";
import { useAutocompleteSuggestions } from "../store/useAutocompleteSuggestions";
import { TagType } from "../store/store";

const FormulaInput: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const { data: suggestions = [], isLoading } =
    useAutocompleteSuggestions(inputValue);
  const addTag = useStore((state) => state.addTag);
  const removeTag = useStore((state) => state.removeTag);
  const tags = useStore((state) => state.tags);
  const inputRef = useRef<HTMLDivElement>(null);

  const handleSelectSuggestion = (suggestion: TagType): void => {
    addTag(suggestion);
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.innerText = "";
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Backspace" && !inputRef.current?.innerText) {
      removeTag(tags.length - 1);
    }
  };

  const updateInputValue = (e: React.FormEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLDivElement;
    setInputValue(target.innerText);
  };

  return (
    <div className="relative">
      <div
        className="border border-gray-300 p-1 flex items-center flex-wrap min-h-[38px]"
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-gray-200 m-1 p-3 rounded-full"
          >
            <span>{tag.name}</span>
            <button
              onClick={() => removeTag(index)}
              className="cursor-pointer bg-transparent border-none text-1.2rem"
            >
              &times;
            </button>
          </div>
        ))}
        <div
          ref={inputRef}
          contentEditable
          onInput={updateInputValue}
          onKeyDown={handleKeyDown}
          className="outline-none min-w-[60px] flex-grow"
        />
      </div>
      {isLoading ? <div>Loading...</div> : null}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white w-full p-2 flex flex-wrap border border-gray-300 mt-0.5">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="cursor-pointer p-2 hover:bg-gray-100 border m-2"
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormulaInput;
