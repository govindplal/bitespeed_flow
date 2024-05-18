"use client";

import { ReactFlowProvider } from "reactflow";

const MainLayout = ({
  children
}) => {

  return ( 
    <div className="h-screen flex flex-col">
      <ReactFlowProvider>
      <main className="flex flex-row h-screen overflow-y-auto">
        {children}
      </main>
      </ReactFlowProvider>
    </div>
   );
}
 
export default MainLayout;