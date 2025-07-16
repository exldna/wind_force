import CustomHeader from "./custom_header.tsx";
import CustomFooter from "./custom_footer.tsx";
import CustomHead from "./custom_head.tsx";
import { JSX } from "preact/jsx-runtime";

interface LayoutParams {
  head?: {
    title?: string;
    description?: string;
  };
  header?: {
    title?: string;
    description?: string;
  };
}

export default function FullLayout({
  children,
  params = {},
}: {
  children: JSX.Element;
  params?: LayoutParams;
}) {
  const { head, header } = params;

  return (
    <>
      <CustomHead params={head} />
      <CustomHeader params={header} />
      <body>{children}</body>
      <CustomFooter />
    </>
  );
}
