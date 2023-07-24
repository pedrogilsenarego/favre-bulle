import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { NewsletterValidator } from "@/lib/validators/newsletter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function Home() {
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-4">
        <p className="text-blue-600">Welcome to Favre Bulle Website</p>
        <p className="text-zinc-500">Please register for our Newsletter</p>
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
    </main>
  );
}
