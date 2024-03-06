import { Outlet } from "react-router-dom"

/*

This wraps around all the routes in the App.jsx page.
I'm not currently 100% what purpose it serves. It seems to simply pass through
whatever path/route is requested.

...need to get a bit further
or experiment with what will happen if I remove it.

I did experiment with removing it and it seemed like nothing changed.

This came from Dave Gray video, BTW

*/


function Layout() {
  return (
    <main>
      <Outlet/>
    </main>
  )
}

export default Layout