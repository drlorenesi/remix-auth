import { Outlet } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "Auth" },
    { description: "A cool App built with Remix" },
    { keywords: "remix, react, javascript, typescript" },
  ];
};

export default function Auth() {
  return (
    <div className="background">
      <Outlet />
    </div>
  );
}
