import { useRouter } from 'next/router';

export default function InfoPage() {
  const router = useRouter();
  const { slug } = router.query;

  let content;

  // Handle different levels of routes dynamically
  if (slug[0] === 'info') {
    // If no slug is provided, render the default "Info" page
    content = <h1>Welcome to the Information Section</h1>;
  } else if (slug[0] === 'faqs') {
    content = <h1>FAQs: Frequently Asked Questions</h1>;
  } else if (slug[0] === 'support') {
    content = <h1>Support: How can we help you?</h1>;
  } else {
    router.push("/404")
  }

  return (
    <div>
      {content}
    </div>
  );
}
