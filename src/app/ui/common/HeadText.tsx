import Link from "next/link";

type Props = {
  text: string;
  href?: string;
};

const className = "block p-2 font-semibold text-lg";

export default function HeadText({ text, href }: Props) {
  return href ? (
    <Link href={href} className={className}>
      {text}
    </Link>
  ) : (
    <h2 className={className}>{text}</h2>
  );
}
