
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/signin',
    element:<SignIn/>
  },
  {
    path:'/signup',
    element:<SignUp/>
  },

])

function App() {
  return (
    <div className="p-4  h-screen flex items-center justify-center">
       <RouterProvider router={router}/>
    </div>
  );
}

export default App;
