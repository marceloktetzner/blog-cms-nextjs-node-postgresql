import { Header } from "../components/site/Header";
import { Hero } from "../components/site/Hero";
import { FeaturedPosts } from "../components/site/FeaturedPosts";
import { Newsletter } from "../components/site/Newsletter";
import { Footer } from "../components/site/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedPosts />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
