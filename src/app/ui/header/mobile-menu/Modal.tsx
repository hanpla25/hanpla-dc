// -- UI ---
import HeaderLinks from "../HeaderLinks";

type Props = {
  isLogin: boolean;
};

export default function MobileMenuWrapper({ isLogin }: Props) {
  return (
    <div className="absolute top-17 left-0 bg-white z-50 w-[100vw] h-[calc(100vh-68px)] flex flex-col gap-4">
      <HeaderLinks
        isLogin={isLogin}
        className="block w-full hover:bg-neutral-100 p-2 text-left cursor-pointer"
      />
    </div>
  );
}
