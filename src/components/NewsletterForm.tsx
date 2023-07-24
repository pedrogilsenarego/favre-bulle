"use client";

import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { NewsletterValidator } from "@/lib/validators/newsletter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface NewsletterFormProps extends React.HTMLAttributes<HTMLFormElement> {}

const NewsletterForm = ({ className, ...props }: NewsletterFormProps) => {
  type FormData = z.infer<typeof NewsletterValidator>;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(NewsletterValidator),
    defaultValues: {
      email: "",
    },
  });

  return (
    <div>
      <form
        className={cn(className)}
        onSubmit={handleSubmit((e) => console.log("teste"))}
      >
        <Input
          id="name"
          className="w-[400px] pl-6"
          size={32}
          {...register("email")}
        />
      </form>
    </div>
  );
};

export default NewsletterForm;
