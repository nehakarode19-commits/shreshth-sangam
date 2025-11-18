import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I apply for admission to a hostel?",
      answer: "You can apply by visiting our Apply page, selecting your preferred institution, and filling out the online application form. You'll need to provide student details, parent/guardian information, and upload necessary documents."
    },
    {
      question: "What documents are required for admission?",
      answer: "Typically, you'll need birth certificate, previous academic records, identity proof, photographs, and any relevant certificates. Specific requirements may vary by institution."
    },
    {
      question: "How can I become a donor?",
      answer: "Visit our Donors page and click on 'Donate Now'. You can choose to support specific institutions, sponsor beds, or contribute to general funds. We accept one-time and recurring donations."
    },
    {
      question: "Are donations tax-deductible?",
      answer: "Yes, donations to Jain Boarding Federation are eligible for tax benefits under Section 80G. You'll receive a receipt for all donations made through our platform."
    },
    {
      question: "How do trustees join the federation?",
      answer: "Trustees can register through our Trustee Portal. After submitting required verification documents, our team will review your application and guide you through the onboarding process."
    },
    {
      question: "What facilities are available at the hostels?",
      answer: "Facilities vary by institution but typically include accommodation, meals, study halls, recreational areas, medical facilities, and security. Check individual institution profiles for specific amenities."
    },
    {
      question: "How can I track my donation impact?",
      answer: "Once you create a donor account, you'll have access to a dashboard showing your donation history, impact reports, and updates from the institutions you've supported."
    },
    {
      question: "What is the application process timeline?",
      answer: "Applications are reviewed on a rolling basis. You'll typically hear back within 2-3 weeks of submission. Admission timelines may vary based on the institution and availability."
    },
    {
      question: "Can I visit a hostel before applying?",
      answer: "Yes, we encourage prospective students and parents to visit institutions. Contact the institution directly through their profile page to schedule a visit."
    },
    {
      question: "What support is available for students?",
      answer: "Students receive academic support, counseling, career guidance, and preparation for competitive exams. Many institutions also offer scholarships and financial aid."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
              <p className="text-xl text-muted-foreground">
                Find answers to common questions about our platform and services.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border rounded-lg px-6 bg-card"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-semibold">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">
                  Still have questions?
                </p>
                <a 
                  href="/contact" 
                  className="text-primary hover:underline font-medium"
                >
                  Contact us for more information
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
