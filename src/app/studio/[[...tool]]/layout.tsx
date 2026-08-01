export const dynamic = 'force-dynamic';

export { viewport } from 'next-sanity/studio';
export { metadata } from 'next-sanity/studio';

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
