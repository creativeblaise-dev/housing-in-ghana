import React, { ReactNode } from "react";
import PrelineScriptWrapper from "@/components/PrelineScriptWrapper";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children}
      <PrelineScriptWrapper />
    </div>
  );
};

export default layout;
