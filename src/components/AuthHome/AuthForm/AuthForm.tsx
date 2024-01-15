import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import InputForm from "./InputForm";
import ButtonForm from "./ButtonForm";
import AuthSocialButton from "./AuthSocialButton";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const [loginToken, setLoginToken] = useState(null);
  let responseDataFromBackend;
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  // Refresh Token function to automatically update it

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    // console.log('Form data:', data);
    if (variant === "REGISTER") {
      try {
        await axios
          .post("http://localhost:8000/api/register", data)
          .then(() => {
            toast.success("Registration successful");
            navigate("/userspage");
          })
          .catch((error) => {
            toast.error("Registration went wrong!");
          });
      } catch (error) {
        console.log("Registration failed", error);
      }
    }
    if (variant === "LOGIN") {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/login",
          data
        );
        navigate("/userspage");
        setLoginToken(response.data.accessToken);

        responseDataFromBackend = response.data;

        // console.log("Response from server:", responseDataFromBackend);
        toast.success("Login successful");
      } catch (error) {
        console.error("Login failed", error);
        toast.error("Login went wrong!");
      }
    }
    setIsLoading(false);
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    // signin
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {variant === "REGISTER" && (
          <InputForm
            label="Name"
            id="name"
            register={register}
            errors={errors}
          />
        )}
        <InputForm
          label="Email"
          id="email"
          type="email"
          register={register}
          errors={errors}
        />
        <InputForm
          label="Password"
          id="password"
          type="password"
          register={register}
          errors={errors}
        />
        <div className="pt-5">
          <ButtonForm disabled={isLoading} fullWidth type="submit">
            {variant === "LOGIN" ? "Sign in" : "Register"}
          </ButtonForm>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-white text-gray-500">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 gap-3">
        <AuthSocialButton
          icon={BsGithub}
          onClick={() => socialAction("github")}
        />
        <AuthSocialButton
          icon={BsGoogle}
          onClick={() => socialAction("google")}
        />
      </div>
      <div className="pt-3 gap-2 text-gray-400">
        <div>
          {variant === "LOGIN" ? "New to Script?" : "Already Have an account?"}
        </div>
        <div onClick={toggleVariant}>
          <div>{variant === "LOGIN" ? "Create an Account" : "Log in"}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;