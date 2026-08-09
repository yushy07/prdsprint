import { Link, useLocation } from 'react-router-dom';
import { Footer } from '@/components/layout/Footer';

const legalContent = {
  terms: {
    title: 'Terms of Service',
    intro: 'These terms govern your use of PRDSprint. By using the service, you agree to use it lawfully and responsibly.',
    sections: [
      ['The service', 'PRDSprint provides a guided workflow for creating product requirements documents and exporting generated material. Features may depend on the configured Supabase project, AI provider, storage service, or payment service.'],
      ['Accounts and acceptable use', 'You are responsible for your account and activity. Do not share credentials, bypass access controls, abuse providers, evade credit or rate limits, or submit content intended to facilitate harm, fraud, or abuse.'],
      ['Your content and generated output', 'You retain rights to content you submit, subject to the rights needed to operate the service. Review generated output before relying on it; AI-generated material may be incomplete or inaccurate.'],
      ['Credits, plans, and payments', 'Credits and plan limits are described in the service interface. Credits may be consumed or refunded according to backend policy. Payment gateways and subscription billing remain deployment-specific until enabled.'],
      ['Disclaimer and contact', 'The service is provided on an “AS IS” and “AS AVAILABLE” basis to the maximum extent permitted by law. Questions may be sent to ayushrock3006@gmail.com.'],
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    intro: 'This policy explains the information PRDSprint may process when you use the application.',
    sections: [
      ['Information we process', 'This may include your email and profile information, project content, builder selections, generated PRD sections, support messages, credit and plan records, technical information, and security logs.'],
      ['How information is used', 'Information is used to authenticate users, provide generation and exports, manage credits and plans, respond to support requests, administer the service, prevent abuse, and improve reliability.'],
      ['AI and infrastructure providers', 'When generation is enabled, submitted inputs may be processed by the server-side AI provider configured for the deployment. Supabase may process authentication, database, function, and storage data under its own terms.'],
      ['Retention and security', 'Retention depends on the deployed Supabase schema and operational policy. We use reasonable safeguards, but no internet service is completely secure.'],
      ['Your choices and contact', 'Depending on your location, you may have rights to access, correct, export, delete, or restrict processing. Contact ayushrock3006@gmail.com for assistance.'],
    ],
  },
};

export function Legal() {
  const type = useLocation().pathname.includes('privacy') ? 'privacy' : 'terms';
  const content = legalContent[type];
  return (
    <div className="min-h-screen bg-[#030305] text-gray-200">
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-16">
        <Link to="/" className="text-cyan-400 hover:text-cyan-300 text-sm">← Back to PRDSprint</Link>
        <p className="mt-10 text-xs uppercase tracking-[0.25em] text-cyan-400">PRDSprint legal</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-white">{content.title}</h1>
        <p className="mt-5 text-gray-400 leading-7 max-w-2xl">{content.intro}</p>
        <p className="mt-3 text-xs text-gray-500">Last updated: August 9, 2026</p>
        <div className="mt-12 space-y-8">
          {content.sections.map(([heading, text]) => (
            <section key={heading} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-lg font-semibold text-white">{heading}</h2>
              <p className="mt-3 text-sm leading-7 text-gray-400">{text}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer variant="compact" />
    </div>
  );
}
