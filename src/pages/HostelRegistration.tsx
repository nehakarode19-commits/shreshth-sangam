import HostelRegistrationForm from '@/components/forms/HostelRegistrationForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HostelRegistration() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="flex-1 py-12">
        <HostelRegistrationForm />
      </main>
      <Footer />
    </div>
  );
}
