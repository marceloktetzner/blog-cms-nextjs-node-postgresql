import { Header } from '../../components/site/Header';
import { Hero } from '../../components/site/Hero';
import { FeaturedPosts } from '../../components/site/FeaturedPosts';
import { Newsletter } from '../../components/site/Newsletter';
import { Footer } from '../../components/site/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        {/* Lista posts publicados vindos da API */}
        {/* Em caso de nenhum post, componente mostra mensagem */}
        {/* FeaturedPosts usa fetch no server side com revalidação */}
        {/* Certifique-se de rodar a migração Prisma e publicar posts */}
        <FeaturedPosts />
        {/* Seção com CTA; aqui o botão já está "Login" */}
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
