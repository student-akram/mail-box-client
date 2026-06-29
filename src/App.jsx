import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import ComposeMail from "./pages/ComposeMail";
import Inbox from "./pages/Inbox";
import ReadMail from "./pages/ReadMail";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/welcome" element={<Welcome />} />

        <Route path="/compose" element={<ComposeMail />} />

        <Route path="/inbox" element={<Inbox />} />

        <Route path="/mail/:id" element={<ReadMail />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;