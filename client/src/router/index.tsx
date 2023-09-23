import { Route, Routes } from 'react-router';

export default function root() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
    </Routes>
  );
}
