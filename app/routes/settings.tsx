import { Avatar, AvatarImage } from "~/components/ui/avatar";
import avatar from "public/logo.png";
import content from "public/remixpage.png";
import { Link, Outlet } from "@remix-run/react";

export default function SettingsPage() {
  return (
    <>
      <div className="bg-zinc-700 h-screen">
        <header className="p-2 px-8 bg-zinc-800">
          <nav>
            <Link to="/settings/picture">
              <Avatar className="w-11 h-11">
                <AvatarImage src={avatar} />
              </Avatar>
            </Link>
          </nav>
        </header>
        <main className="w-full bg-zinc-900  ">
          <img className="mx-auto" src={content} alt="Remix Content Youtube" />
        </main>
      </div>
      <Outlet />
    </>
  );
}
