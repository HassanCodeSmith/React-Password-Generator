import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  /**
   * useState Hook
   */
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  /**
   * useRef Hook
   */
  const passwordReference = useRef(null);

  /**
   * Password Generator - useCallBack Hook
   */
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, number, character, setPassword]);

  /**
   * Copy Password To Clipboard
   */
  const copyPasswordToClipboard = useCallback(() => {
    passwordReference.current?.select();
    passwordReference.current?.setSelectionRange(0, 12);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  /**
   * useEffect Hook
   */

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        {/** HEADER TEXT */}
        <h1 className="text-white text-center my-3">Password Generator</h1>

        {/** INPUT CONTAINER*/}
        <div className="flex rounded-lg overflow-hidden mb-4 shadow">
          {/** Input */}
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordReference}
          ></input>

          {/** Copy Button */}
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>

        {/** OPTION CONTAINER */}
        <div className="flex text-sm gap-x-2">
          {/** Range Container */}
          <div className="flex items-center gap-x-1">
            {/** Range */}
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Lenght: {length}</label>
          </div>

          {/** Number CheckBox Container */}
          <div className="flex items-center gap-x-1">
            {/** Number CheckBox */}
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => setNumber((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          {/** Character CheckBox Container */}
          <div className="flex items-center gap-x-1">
            {/** Character CheckBox */}
            <input
              type="checkbox"
              defaultChecked={character}
              id="characterInput"
              onChange={() => setCharacter((prev) => !prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
