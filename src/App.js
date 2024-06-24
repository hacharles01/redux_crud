import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompanyTable from './components/CompanyTable';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<CompanyTable />}></Route>
        </Routes></BrowserRouter>
        </Provider>
    </div>
  );
}

export default App;
