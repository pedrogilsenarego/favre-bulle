import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-4">
        <p className="text-blue-600">Welcome to Favre Bulle Website</p>
        <p className="text-zinc-500">Please register for our Newsletter</p>
        <NewsletterForm />
      </div>
    </main>
  );
}
