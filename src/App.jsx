import { useState, useCallback, useEffect } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [allowNumber, setAllowNumber] = useState(false);
  const [allowCharacter, setAllowCharacter] = useState(false);
  const [pass, setPass] = useState("");  

  const password_generator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (allowNumber) str += "0123456789";
    if (allowCharacter) str += "!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length+1 );
      password += str.charAt(char);
    }

    setPass(password);
  }, [length, allowNumber, allowCharacter]);

  useEffect(() => {
    password_generator();
  }, [length, allowNumber, allowCharacter, password_generator]);

  return (
    <>
      <h1 className="pass">Password Generator</h1>
      <div className="main">
        <div className="inner">
          <input type="text" value={pass} placeholder="Password" readOnly className="passinp" />
          <button className="copy">Copy</button>
        </div>
        <div className="inner2">
          <div className="input">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="range"
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label className="le"> Length: {length} </label>

            <input
              type="checkbox"
              checked={allowNumber}
              className="check"
              onChange={() => setAllowNumber(prev => !prev)}
            />
            <label className="le"> Numbers </label>

            <input
              type="checkbox"
              checked={allowCharacter}
              className="check"
              onChange={() => setAllowCharacter(prev => !prev)}
            />
            <label className="le"> Characters </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
