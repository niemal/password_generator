import { ChangeEvent, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 32px;
  border: 2px solid black;
  width: max-content;
  border-radius: 4px;
  background-color: beige;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input<{ $animTrigger?: boolean }>`
  width: 460px;
  max-width: calc(100% - 32px);
  padding: 12px;
  font-size: ${16 / 16}rem;

  transition: all 0.3s ease-in-out;

  border: 2px solid black;
  border-radius: 4px;

  ${(p) =>
    p.$animTrigger
      ? `
  border-color: dodgerblue;
  color: dodgerblue;
  `
      : ""}

  &::placeholder {
    font-size: ${16 / 16}rem;
    font-style: italic;
  }

  /* mobile view range */
  @media (max-width: ${600 / 16}rem) {
    width: 200px;
  }
`;

const DisplayWrapper = styled.div`
  position: relative;
  width: max-content;
`;

const Button = styled.button`
  padding: 24px;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: ${32 / 16}rem;

  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: white;
    color: dodgerblue;
    border-color: dodgerblue;
  }
`;

const CopyButton = styled(Button)<{ $animTrigger?: boolean }>`
  position: absolute;
  right: -12px;
  top: -12px;
  padding: 8px;
  width: max-content;
  font-size: ${12 / 16}rem;

  ${(p) =>
    p.$animTrigger
      ? `
  transform: rotate(360deg);
  scale: 0.7;
  `
      : ""}
`;

const CheckBox = styled.input`
  width: 24px;
  height: 24px;
  padding: 12px;
  background-color: beige;
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const CharacterLengthWrapper = styled.div`
  text-align: center;
  width: 100%;
  font-size: ${18 / 16}rem;
  font-style: italic;
`;

const CheckBoxesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const [totalChecked, setTotalChecked] = useState(1);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useUppercase, setUseUppercase] = useState(false);
  const [useNumbers, setUseNumbers] = useState(false);
  const [useSymbols, setUseSymbols] = useState(false);

  const [animTrigger, setAnimTrigger] = useState(false);

  const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
  const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const NUMBERS = "0123456789";
  const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const generatePassword = () => {
    let characterList = "";
    if (useLowercase) characterList += LOWERCASE;
    if (useUppercase) characterList += UPPERCASE;
    if (useNumbers) characterList += NUMBERS;
    if (useSymbols) characterList += SYMBOLS;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterList.length);
      generatedPassword += characterList[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);

    if (password.length > 0) {
      setAnimTrigger(true);
      setTimeout(() => {
        setAnimTrigger(false);
      }, 250);
    }
  };

  return (
    <Wrapper>
      <DisplayWrapper>
        <Input
          type="text"
          value={password}
          placeholder={"Your password will be generated here"}
          readOnly
          $animTrigger={animTrigger}
        />
        <CopyButton $animTrigger={animTrigger} onClick={handleCopy}>
          Copy
        </CopyButton>
      </DisplayWrapper>
      <input
        type="range"
        value={length}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setLength(Number(e.target.value))
        }
        min="1"
        max="50"
        style={{ cursor: "pointer" }}
      />
      <CharacterLengthWrapper>
        Character length <b>{length}</b>
      </CharacterLengthWrapper>

      <CheckBoxesWrapper>
        <Row>
          <CheckBox
            type="checkbox"
            checked={useLowercase}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (useLowercase && totalChecked === 1) {
                e.preventDefault();
                return;
              } else {
                setTotalChecked((c) => c + (useLowercase ? -1 : +1));
              }
              setUseLowercase(!useLowercase);
            }}
            disabled={!(useUppercase || useNumbers || useSymbols)}
          />
          <label>Include Lowercase</label>
        </Row>
        <Row>
          <CheckBox
            type="checkbox"
            checked={useUppercase}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (useUppercase && totalChecked === 1) {
                e.preventDefault();
                return;
              } else {
                setTotalChecked((c) => c + (useUppercase ? -1 : +1));
              }
              setUseUppercase(!useUppercase);
            }}
          />
          <label>Include Uppercase</label>
        </Row>
        <Row>
          <CheckBox
            type="checkbox"
            checked={useNumbers}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (useNumbers && totalChecked === 1) {
                e.preventDefault();
                return;
              } else {
                setTotalChecked((c) => c + (useNumbers ? -1 : +1));
              }
              setUseNumbers(!useNumbers);
            }}
          />
          <label>Include Numbers</label>
        </Row>
        <Row>
          <CheckBox
            type="checkbox"
            checked={useSymbols}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (useSymbols && totalChecked === 1) {
                e.preventDefault();
                return;
              } else {
                setTotalChecked((c) => c + (useSymbols ? -1 : +1));
              }
              setUseSymbols(!useSymbols);
            }}
          />
          <label>Include Symbols</label>
        </Row>
      </CheckBoxesWrapper>
      <Button onClick={generatePassword}>Generate</Button>
    </Wrapper>
  );
};

export default PasswordGenerator;
