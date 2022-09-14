import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Home from "./components/Home";
import LinkPage from "./components/LinkPage";
import Lounge from "./components/Lounge";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Admin from "./components/Admin";
import PersistLogin from "./components/PersistLogin";
import {Routes, Route} from "react-router-dom";

const ROLES = {
    'User' : 'ROLE_USER',
    'Admin' : 'ROLE_ADMIN'
}

function App() {
    return (
        <main className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* public routes */}
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="linkpage" element={<LinkPage />} />
                    <Route path="unauthorized" element={<Unauthorized />} />

                    {/* we want to protect these routes */}
                    <Route element={<PersistLogin />}>
                        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                            <Route path="/" element={<Home />} />
                        </Route>

                        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                            <Route path="admin" element={<Admin />} />
                        </Route>

                        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
                            <Route path="lounge" element={<Lounge />} />
                        </Route>
                    </Route>

                    {/* catch all */}
                    <Route path="*" element={<Missing />} />
                </Route>
            </Routes>
        </main>
    );
}

export default App;
