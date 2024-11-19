import InputField from "components/fields/InputField";
import { signInWithEmailAndPassword } from "firebase/auth";
import { BaseSyntheticEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "store/firebase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async (event: BaseSyntheticEvent) => {
    try {
      const usercredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (usercredentials.user.email === email) {
        // confirmation both from firebase and current
        sessionStorage.setItem("isAuthenticated", "true");
        navigate("/user");
      }
    } catch (err) {
      console.log(err);
    }
    event.preventDefault();
  };

  if (sessionStorage.getItem("isAuthenticated")) {
    return <Navigate to={"/user"} replace />;
  }

  return (
    <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </div>
        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
        {/* Email */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
          onChange={(event: BaseSyntheticEvent) => {
            setEmail(() => event.target.value);
          }}
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
          onChange={(event: BaseSyntheticEvent) =>
            setPassword(() => event.target.value)
          }
        />
        {/* <div className="mb-4 flex items-center justify-between px-2">
          <a
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href=" "
          >
            Forgot Password?
          </a>
        </div> */}
        <button
          onClick={handleSignIn}
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          Sign In
        </button>
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <Link
            to="/auth/signup"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
