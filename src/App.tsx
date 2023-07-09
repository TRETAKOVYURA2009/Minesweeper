import React from "react"
import { Routes, Route, HashRouter } from "react-router-dom"
import PageLinks from "./types/pages"
import {
  HomePage,
  EasyLevel,
  CustomLevel,
  NormalLevel,
  HardLevel,
} from "./pages"

const App: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path={PageLinks.home} element={<HomePage />} />
      <Route path={PageLinks.easyLevel} element={<EasyLevel />} />
      <Route path={PageLinks.customLevel} element={<CustomLevel />} />
      <Route path={PageLinks.normalLevel} element={<NormalLevel />} />
      <Route path={PageLinks.hardLevel} element={<HardLevel />} />
    </Routes>
  </HashRouter>
)

export default App
