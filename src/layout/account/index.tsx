import Appbar from "./Appbar";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";

const AccountLayout = () => {
  return (
    <>
      <ErrorBoundary>
        <div className="flex h-screen">
          <div className="h-full">
            <Appbar />
          </div>
          <main className="flex flex-grow overflow-y-auto">
            <div className="py-6 px-2 w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default AccountLayout;
