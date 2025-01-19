// App.jsx

import PasswordResetForm from "./Components/Authentication/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset" element={<PasswordResetForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;