import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import "./page.css";

export default function SignUpPage() {
  return (
    <div id="oe-root">
      <div className="scanline"></div>
      <div className="noise"></div>
      
      <nav>
        <div className="nav-logo">
          <span>OopsEngine</span>
          <div className="logo-dot"></div>
        </div>
      </nav>

      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Join OopsEngine and start coding</p>
          </div>
          <SignUp
            routing="path"
            signInUrl="/sign-in"
            forceRedirectUrl="/dashboard"
            fallbackRedirectUrl="/dashboard"
          />
          <div className="auth-footer">
            <p>
              Already have an account? <Link href="/sign-in">Sign in instead</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

