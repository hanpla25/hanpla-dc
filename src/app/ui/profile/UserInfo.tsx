import NicknameForm from "./NicknameForm";
import UserIdForm from "./UserIdForm";

type Props = {
  nickname: string;
  userId: string;
};

export default function UserInfo({ nickname, userId }: Props) {
  return (
    <div className="space-y-4 max-w-md">
      <NicknameForm nickname={nickname} />
      <UserIdForm userId={userId} />
    </div>
  );
}
