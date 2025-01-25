import { createFileRoute } from "@tanstack/react-router";
import Register from "../components/register";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
<div className="home">
  <div className="home_container">
    <div className="home_image"></div>
    <section className="home_section">
      <h2 className="text-3xl mb-24">Discover Your Passion for Dance!</h2>
      <Register/>
    </section>
  </div>
</div>
  );
}
