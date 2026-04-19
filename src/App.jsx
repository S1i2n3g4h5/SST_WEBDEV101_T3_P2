import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import JobForm from './pages/JobForm';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/applications/new" element={<JobForm />} />
        <Route path="/applications/edit/:id" element={<JobForm />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
      <ToastContainer theme="dark" position="top-right" autoClose={3000} />
    </Layout>
  );
}

export default App;
