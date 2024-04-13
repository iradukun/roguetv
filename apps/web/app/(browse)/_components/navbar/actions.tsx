import getSession from "@/actions/get-session";
import AuthForm from "@/components/auth-form";
import { Button } from "@/components/ui/button";
import { Clapperboard } from "lucide-react";
import Link from "next/link";

export const Actions = async () => {
  const data = await getSession();

  return (
    <div className="flex items-center justify-center ml-4 lg:ml-0">
      {!data?.user && <AuthForm initVariant="LOGIN" />}
      {!!data?.user && (
        <div className="flex items-center gap-x-4">
          <Button
            size={"sm"}
            variant={"ghost"}
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${data?.user.username}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2 " />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <AuthForm initVariant="LOGIN" />
        </div>
      )}
    </div>
  );
};
