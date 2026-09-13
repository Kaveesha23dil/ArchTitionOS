import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p>404 / Route not found</p>
      <h1>This workspace does not exist.</h1>
      <span>The requested ArchTitan OS page could not be found.</span>
      <Link href="/">Return to the ArchTitan OS overview →</Link>
    </main>
  );
}
