import React from "react";
import useConversation from "../../../utils/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { Button } from "../../../@/components/ui/button";
import { HiPaperAirplane } from "react-icons/hi";
import useFetchCurrentUser from "../../../utils/hooks/useFetchCurrentUser";

const Form = () => {
  const { conversationId } = useConversation();
  // console.log(conversationId);
  const currentUserData = useFetchCurrentUser();

  const { user } = currentUserData ? currentUserData : { user: { email: "" } };
  const userEmail = user.email;
  // console.log(userEmail);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Token not found");

      throw new Error("Token not found");
    }

    setValue("message", "", { shouldValidate: true });

    try {
      // console.log(...data)
      const response = await axios.post(
        `http://localhost:8000/api/message?userEmail=${userEmail}`,
        { ...data, conversationId }
      );

      // console.log("Response data:", response.data);
    } catch (error: any) {
      // console.error("form Response")
      console.error("Handle error", error.message);
    }
  };

  return (
    <div
      className="
        py-4
        px-4
        bg-white
        border-t
        flex
        items-center
        gap-2
        lg:gap-4
        w-full
      "
    >
      
      <HiPhoto size={30} className="text-sky-300" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write your message"
        />
        <Button
          type="submit"
          className="
           rounded-full 
           p-2 
           bg-sky-500 
           cursor-pointer 
           hover:bg-sky-600 
           transition
         "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </Button>
      </form>
    </div>
  );
};

export default Form;
