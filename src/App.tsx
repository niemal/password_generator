import React from "react";
import styled from "styled-components";
import PasswordGenerator from "./components/PasswordGenerator";

const Wrapper = styled.main`
  isolation: isolate;
  min-height: 98vh;
  width: 100%;
  display: grid;
  place-content: center;
`;

function App() {
  return (
    <Wrapper role={"main"}>
      <PasswordGenerator />
    </Wrapper>
  );
}

export default App;
