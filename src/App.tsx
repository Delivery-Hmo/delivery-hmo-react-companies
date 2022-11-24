import MyRouter from './router';
import { AuthProvider } from './context/authContext';

const App = () => {
  return (
    <AuthProvider>
      <MyRouter />
    </AuthProvider>
  )
}

export default App;
