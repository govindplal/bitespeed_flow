"use client";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { ReactFlowProvider } from "reactflow";

const MainLayout = ({
  children
}) => {

  return ( 
    <div className="h-screen flex flex-col">
      <Navbar/>
      <ReactFlowProvider>
      <main className="flex flex-row h-screen overflow-y-auto">
        {children}
        <Sidebar/>
      </main>
      </ReactFlowProvider>
    </div>
   );
}
 
export default MainLayout;