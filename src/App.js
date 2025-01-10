import JobsCreate from './components/JobsCreate';
import PoCreate from './components/PoCreate'
import BillCreate from './components/BillCreate'
import Reportpo from './components/Reportpo';
import Reportbill from './components/ReportBill';
import JobQuery from './components/JobQuery/JobQuery';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store  from '../src/store';



function App() {
  return (
    <Router>
      
    <div className="app">
    <Provider store={Store}>
      <Routes>
      <Route path="/" element={<Home />}></Route>
        <Route path="/jobs" element={<JobsCreate />}></Route>
        <Route path="/po" element={<PoCreate/>}></Route>
        <Route path="/bills" element={<BillCreate/>}></Route>
        <Route path="/jobquery" element={<JobQuery/>}></Route>
        <Route path="/reportpo" element={<Reportpo/>}></Route>
        <Route path="/reportBill" element={<Reportbill/>}></Route>
      </Routes>
      </Provider>
    </div>
  </Router>
  );
}

export default App;
