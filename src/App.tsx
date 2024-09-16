import { Outlet } from "react-router-dom";
import { UserProvider } from "./Context/useAuth";
import { Suspense } from "react";
import Loader from "./pages/Loader";


const App = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <UserProvider>
          <Outlet />
        </UserProvider>
      </Suspense>
    </>
  );
}

export default App;
