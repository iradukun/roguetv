import AuthForm from "@/components/auth-form";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

export const Actions = () => {
  return (
    <div className="flex items-center justify-end gap-x-2">
      <Button
        size={"sm"}
        variant={"ghost"}
        className="text-muted-foreground hover:text-primary"
        asChild
      >
        <Link href={"/"}>
          <LogOut className="h-5 w-5 mr-2 " />
          Exit
        </Link>
      </Button>
      {/* <AuthForm initVariant="LOGIN" /> */}
    </div>
  );
};
