import type { Metadata } from "next";
import { CatBoard } from "@/components/CatBoard";

export const metadata: Metadata = {
  title: "Top Cats · Cat Café",
};

const LeaderboardPage = () => <CatBoard view="leaderboard" />;

export default LeaderboardPage;
