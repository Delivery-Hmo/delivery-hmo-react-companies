import { Route, Routes } from 'react-router-dom';
import RoterChecker from './RouterCheker';
import routes from './routes';

const MyRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<RoterChecker />}>
      {
        routes.map(r => (
          <Route key={r.path} {...r} />
        ))
      }
      </Route>
    </Routes>
  )
}

export default MyRouter;
