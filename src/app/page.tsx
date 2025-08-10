import Container from "@/components/Container";
import SubscribeForm from "@/components/SubscribeForm";

export default function HomePage() {
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-3">My Newsletter</h1>
      <p className="mb-6 text-sm text-gray-600">Thoughtful updates, straight to your inbox. No spam, unsubscribe anytime.</p>
      <SubscribeForm />
    </Container>
  );
}
