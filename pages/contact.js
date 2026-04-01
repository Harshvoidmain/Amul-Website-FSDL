import Head from 'next/head';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us — Amul | Get in Touch</title>
        <meta name="description" content="Contact Amul for inquiries, feedback, or support. Reach us by phone, email, or visit us in Anand, Gujarat." />
      </Head>

      <div style={{ paddingTop: '80px' }}>
        <ContactForm />
      </div>
    </>
  );
}
