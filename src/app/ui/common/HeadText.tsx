import Link from "next/link";

type Props = {
  href: string;
  text: string;
  isLink: boolean;
};

const className = "block text-xl font-bold px-2 py-3";

const LinkText = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link href={href} className={className}>
      {text}
    </Link>
  );
};

const Head = ({ text }: { text: string }) => {
  return <h2 className={className}>{text}</h2>;
};

export default function HeadText({ href, text, isLink }: Props) {
  return isLink ? <LinkText href={href} text={text} /> : <Head text={text} />;
}
