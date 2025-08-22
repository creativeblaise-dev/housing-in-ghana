"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "./ui/layout-grid";

const LayoutGridFeature = ({ images }) => {
  return (
    <div className=" w-full ">
      <LayoutGrid cards={images} />
    </div>
  );
};

export default LayoutGridFeature;
