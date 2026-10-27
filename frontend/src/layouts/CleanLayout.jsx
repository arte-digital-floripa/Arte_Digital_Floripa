import { Outlet } from "react-router-dom";

export default function CleanLayout() {
  return (
    <div className="clean-layout">
      <Outlet />
    </div>
  );
}
