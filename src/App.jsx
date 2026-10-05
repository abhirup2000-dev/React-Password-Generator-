import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      pass += str[randomIndex];
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-start justify-center pt-20">
      <div className="w-full max-w-xl px-5">

        <h1 className="text-5xl font-medium text-amber-50 text-center mb-8">
          Password Generator
        </h1>

        {/* Password */}
        <div className="flex mb-6">
          <input
            ref={passwordRef}
            type="text"
            value={password}
            readOnly
            className="w-full px-4 py-3 rounded-l-lg bg-gray-700 text-white outline-none"
          />

          <button
            onClick={copyPassword}
            className="px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg"
          >
            Copy
          </button>
        </div>

        {/* Length */}
        <div className="mb-5">
          <div className="flex justify-between text-white mb-2">
            <span>Password Length</span>
            <span>{length}</span>
          </div>

          <input
            type="range"
            min="6"
            max="30"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Options */}
        <div className="flex gap-6 text-white">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            Numbers
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setcharAllowed((prev) => !prev)}
            />
            Special Characters
          </label>
        </div>

      </div>
    </div>
  );
}

export default App;