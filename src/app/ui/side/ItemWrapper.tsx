export default function ItemWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2 border border-neutral-400 p-4">{children}</div>
  );
}
