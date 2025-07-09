import Header from "./header.tsx";
import Footer from "./footer.tsx";
import CustomHead from "./custom_head.tsx";

export default function FullLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomHead />
      <Header />
      <body>{children}</body>
      <Footer />
    </>
  );
}
