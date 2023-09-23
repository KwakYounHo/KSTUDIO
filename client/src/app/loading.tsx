"use client";

import * as React from "react";
import Lottie from "react-lottie-player";

import loadingAniFile from "@pub/loadingAni.json";

const Loading: React.FC = () => {
  return (
    <div>
      <Lottie
        loop
        animationData={loadingAniFile}
        play
        className={"mt-auto w-96 h-96"}
      />
      <p className={"text-base font-light text-center relative -top-32"}>Loading...</p>
    </div>
  );
};
export default Loading;
