import React, { ReactNode } from "react";

const AdminMainContent = ({ children }: { children: ReactNode }) => {
  return (
    <main className="lg:hs-overlay-layout-open:ps-60 bg-white transition-all duration-300 lg:fixed lg:inset-0 pt-16 px-3 pb-3">
      <div className="h-[calc(100dvh-62px)] lg:h-full  flex flex-col bg-[#ece9e9] border border-gray-200 shadow-xs rounded-xl">
        {/* Body */}
        <div className="flex-1 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:w-2  [&::-webkit-scrollbar-thumb]:bg-slate-400 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-track]:bg-gray-200">
          <div className="flex-1 flex flex-col lg:flex-row">
            <div className="flex-1 min-w-0 flex flex-col border-e border-gray-200">
              <div className="flex-1 min-h-0 overflow-y-auto">
                <div className="px-4 py-10 lg:p-6">{children}</div>
              </div>
            </div>
          </div>
        </div>
        {/* End Body */}
      </div>
    </main>
  );
};

export default AdminMainContent;
