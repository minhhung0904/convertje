import './App.css';
import ExportCSV from './components/ExportCSV';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';



function App() {

  return (
    <BrowserRouter>
    <AppContainer>
      <Routes>
        <Route exact path="/" element={<ExportCSV/>} />
      </Routes>
    </AppContainer>
  </BrowserRouter>
  );
}

const AppContainer = styled.div`
display: flex;
flex-direction: column;
min-height: 100vh;
align-items: center;

font-size: calc(8px + 2vmin);
color: white;
background-color: #454552;
text-align: center;
`;

export default App;