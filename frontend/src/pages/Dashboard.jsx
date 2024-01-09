import NavBar from "../components/NavBar.jsx";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="py-8 px-5 flex flex-col gap-4">
      <NavBar />
      <main>
        <div className="container bg-neutral-900 rounded-2xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
