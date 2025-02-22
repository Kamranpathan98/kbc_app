import { Route, Routes } from "react-router-dom";
import { CreateCointainer, Header, MainCointainer } from "./components";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <AnimatePresence existBeforeEnter>
      <div
        className="w-screen h-auto flex flex-col"
        style={{ backgroundColor: "var(--primary)" }}
      >
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
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
