import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import PageLinks from "./types/pages"
import { HomePage, EasyLevel, CustomLevel, NormalLevel } from "./pages"

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={PageLinks.home} element={<HomePage />} />
      <Route path={PageLinks.easyLevel} element={<EasyLevel />} />
      <Route path={PageLinks.customLevel} element={<CustomLevel />} />
      <Route path={PageLinks.normalLevel} element={<NormalLevel />} />
    </Routes>
  </BrowserRouter>
)

export default App
