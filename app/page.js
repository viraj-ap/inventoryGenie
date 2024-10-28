// app/page.js
import Navbar from "./Components/Navbar";
import StockManager from "./Components/StockManager";

export default function Home() {
  return (
    <>
      <Navbar />
      <StockManager />
    </>
  );
}
