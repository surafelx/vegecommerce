"use-client"
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import type { FC, FormEvent,  } from "react";
import { useAuth } from "../../context/AuthContext"; // Adjust the path based on your folder structure
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import {useState} from "react"

const SignInPage: FC = function () {
  const { login } = useAuth(); // Get the login function from context
  const navigate = useNavigate(); // For programmatic navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    try {
      await login(email, password); // Call your login function
      navigate("/"); // Redirect to the dashboard or homepage after successful login
    } catch (err) {
      setError("Invalid email or password"); // Handle login error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <a href="/" className="my-6 flex items-center gap-x-1 lg:my-0">
        Market Fresh
      </a>
      <Card
        horizontal
        imgAlt=""
        className="w-full md:max-w-[500px] md:[&>*]:w-full md:[&>*]:p-16 [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 lg:[&>img]:block"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Sign in to platform
        </h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Your email</Label>
            <TextInput
              id="email"
              name="email"
              placeholder="name@company.com"
              type="email"
              value={email} // Bind the email state
              onChange={(e) => setEmail(e.target.value)} // Update state on change
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="password">Your password</Label>
            <TextInput
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              value={password} // Bind the password state
              onChange={(e) => setPassword(e.target.value)} // Update state on change
            />
          </div>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <Checkbox id="rememberMe" name="rememberMe" />
              <Label htmlFor="rememberMe">Remember me</Label>
            </div>
            <a
              href="#"
              className="w-1/2 text-right text-sm text-primary-600 dark:text-primary-300"
            >
              Lost Password?
            </a>
          </div>
          <div className="mb-6">
            <Button type="submit" className="w-full lg:w-auto">
              Login to your account
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Not registered?&nbsp;
            <a
              href="/authentication/sign-up"
              className="text-primary-600 dark:text-primary-300"
            >
              Create account
            </a>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignInPage;
