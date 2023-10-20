import * as React from "react";
import type { Metadata } from "next";
import { constants } from "@/app/common/domain/models/constants";
import { clientSupabase } from "@/utils/supabase";

export const metadata: Metadata = {
  title: constants.createTitle("Quote"),
};

const Quote: React.FC = async () => {
  return <></>;
};
export default Quote;
