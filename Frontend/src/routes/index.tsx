import { createFileRoute } from "@tanstack/react-router";
import Register from "../pages/register";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="home">
      <div className="home_container">
        <div className="home_image"></div>
        <section className="home_section w-full px-4 sm:px-0 sm:w-auto">
          <h2 className="text-3xl mb-12 sm:mb-24">
            Discover Your Passion for Dance!
          </h2>
          <Register />
        </section>
      </div>
    </div>
  );
}
