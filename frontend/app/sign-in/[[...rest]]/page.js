import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import "./page.css";

export default function SignInPage() {
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
            <h1>Sign In</h1>
            <p>Access your OopsEngine workspace</p>
          </div>
          <SignIn
            routing="path"
            signUpUrl="/sign-up"
            forceRedirectUrl="/dashboard"
            fallbackRedirectUrl="/dashboard"
          />
          <div className="auth-footer">
            <p>
              New to OopsEngine? <Link href="/sign-up">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

