import { BrowserRouter, Route, Routes } from 'react-router-dom';
import List from './components/List';
import ListDetail from './components/ListDetail';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<List />} />
        <Route path='/:id/:period' element={<ListDetail />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
