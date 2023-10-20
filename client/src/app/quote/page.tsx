import * as React from "react";
import type { Metadata } from "next";
import { constants } from "@/app/common/domain/models/constants";

export const metadata: Metadata = {
  title: constants.createTitle("Quote"),
};

const Quote: React.FC = async () => {
  return <></>;
};
export default Quote;
