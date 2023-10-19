import "./App.css";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./Components/Login/Login";
import LoginPage from "./pages/LoginPage";
import Signup from "./Components/Signup/Signup";
import AuthContext from "./store/AuthContext";
import ChatContext from "./store/ChatContext";
import ChatPage from "./pages/ChatPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <HomePage></HomePage>,
    },
    {
      path: "/login",
      element: <LoginPage></LoginPage>,
    },
    {
      path: "/signup",
      element: <Signup></Signup>,
    },
    {
      path: "/chat",
      element: <ChatPage></ChatPage>,
    },
  ]);
  return (
    <>
      <div className="w-full min-h-screen  ">
        <AuthContext>
          <ChatContext>
            <RouterProvider router={router}></RouterProvider>
          </ChatContext>
        </AuthContext>
      </div>
    </>
  );
}

export default App;
