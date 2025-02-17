import { Route, Routes } from "react-router-dom";
import { CreateCointainer, Header, MainCointainer } from "./components";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <AnimatePresence>
      <div
        className="w-screen h-auto flex flex-col"
        style={{ backgroundColor: "var(--primary)" }}
      >
        <Header />

        <main className="mt-24 p-8 w-full">
          <Routes>
            <Route path="/*" element={<MainCointainer />} />
            <Route path="/createItem" element={<CreateCointainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
