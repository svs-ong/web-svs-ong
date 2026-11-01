import type { Metadata } from "next";
import { CatBoard } from "@/components/CatBoard";

export const metadata: Metadata = {
  title: "Cat Gallery · Cat Café",
};

const CatsPage = () => <CatBoard view="gallery" />;

export default CatsPage;
