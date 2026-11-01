import { redirect } from "next/navigation";

const HomePage = () => {
  redirect("/cats");
};

export default HomePage;
