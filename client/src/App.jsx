import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";
import CreateEvent from "./components/CreateEvent.jsx";
import CreateLocation from "./components/CreateLocation.jsx";
import ViewEvent from "./components/ViewEvent.jsx";
import Search from "./components/Search.jsx";
import Layout from "./components/Layout.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Missing from "./components/Missing.jsx";
import PersistLogin from "./components/PersistLogin.jsx";
import ViewUser from "./components/ViewUser.jsx";

/*
  All routes are wrapped in 'Layout' component.
  The layout component simply passes through whatever component has a matching path
  using <Outlet/>. <Outlet/> basically is a placeholder in the jsx return that shows where
  to put the component that is being passed through. 

  Protected routes are additionally wrapped in 'RequireAuth' component.
  In 'RequireAuth' we are using conditional rendering of <Outlet/>. If there is a user
  present in our 'auth' (AuthContext), then we pass through the request route (<Outlet/>)
  If auth.user is *not* present, then we Navigate back to /login, requiring the user
  to log in (thereby populating 'auth.user') before they can try again.

 */

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Layout />}> */}

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<PersistLogin/>}> {/* These are the persisted routes */}
          <Route element={<RequireAuth/>}> {/* These are the protected routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="newEvent" element={<CreateEvent />} />
            <Route path="newlocation" element={<CreateLocation />} />
            <Route path="search" element={<Search />} />
            <Route path="events/:id" element={<ViewEvent />} />
            <Route path="users/:id" element={<ViewUser />} />
          </Route>
        </Route>

        <Route path="*" element={<Missing/>}/>

      {/* </Route> */}
    </Routes>
  );
}

export default App;
