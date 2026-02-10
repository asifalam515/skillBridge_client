import Navbar from "@/components/(shared)/Navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container mx-auto px-4">
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <Navbar></Navbar>
        {children}
      </div>
    </>
  );
}
