import './login-form.css';

export const LoginForm = () => {
  return (
    <div className="login-background">
      <div className="login-box">
        <button className="close-button">×</button>
        <h2>Login Form</h2>
        <form>
          <label>Email or Phone</label>
          <input type="text" placeholder="Enter email or phone" required />

          <label>Password</label>
          <input type="password" placeholder="Enter password" required />

          <a href="#" className="forgot-password">
            Forgot Password?
          </a>

          <button type="submit" className="login-button">
            LOGIN
          </button>

          <p className="signup-text">
            Not a member? <a href="#">Signup now</a>
          </p>
        </form>
      </div>
    </div>
  );
};
