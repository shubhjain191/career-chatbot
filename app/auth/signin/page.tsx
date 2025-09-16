import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { AuthForm } from "@/frontend/auth/components/AuthForm";

export default async function SignInPage() {
    const session = await getServerSession(authOptions);
    if (session?.user?.id) {
        redirect("/chat");
    }


return (
    <main className="min-h-dvh grid place-items-center p-6">
        <AuthForm />
    </main>
 );
}