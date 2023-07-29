"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { FormData, NewsletterValidator } from "@/lib/validators/newsletter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { useForm } from "react-hook-form";

interface NewsletterFormProps extends React.HTMLAttributes<HTMLFormElement> {}

const NewsletterForm = ({ className, ...props }: NewsletterFormProps) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(NewsletterValidator),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: subscribe, isLoading } = useMutation(
    async (email: string) => {
      const payload = {
        email: email,
      };

      const response = await axios.post("/api/newsletter-submit", payload);
      return response.data as string;
    },
    {
      onError: (err) => {
        if (err instanceof AxiosError) {
          if (err.response?.status === 409) {
            return toast({
              title: "User already subscribed.",
              description: "Please choose a different email.",
              variant: "destructive",
            });
          }

          if (err.response?.status === 422) {
            return toast({
              title: "Invalid email.",
              description: "Please choose a valid email.",
              variant: "destructive",
            });
          }
        }
      },
      onSuccess: (data) => {
        reset();
        toast({
          title: "Subscription sucessfull.",
          description: data,
          variant: "default",
        });
      },
    }
  );

  return (
    <div>
      <form
        className={cn(className)}
        onSubmit={handleSubmit((e) => {
          subscribe(e.email);
        })}
      >
        <Input
          id="name"
          placeholder="E-mail"
          className="w-[300px] pl-6"
          size={32}
          {...register("email")}
        />
        {errors?.email && (
          <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
        )}
        <Button isLoading={isLoading}>Submit Email</Button>
      </form>
    </div>
  );
};

export default NewsletterForm;
