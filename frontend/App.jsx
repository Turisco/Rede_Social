import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GroupList from './pages/GroupList';
import CreateGroup from './pages/CreateGroup';
import GroupDetails from './pages/GroupDetails';

function App() {
  const token = localStorage.getItem('token');
  const userId = JSON.parse(atob(token.split('.')[1])).id;

  return (
    <Router>
      <Routes>
        <Route path="/grupos" element={<GroupList token={token} />} />
        <Route path="/criar-grupo" element={<CreateGroup token={token} />} />
        <Route path="/grupo/:id" element={<GroupDetails token={token} userId={userId} />} />
      </Routes>
    </Router>
  );
}

export default App;
