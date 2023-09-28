import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

type Props = {
  isLike: boolean;
  onLike: () => void;
};

export default function LikeButton({ isLike, onLike }: Props) {
  return (
    <div
      onClick={onLike}
      className="cursor-pointer transition-all duration-300 active:scale-150 hover:[&>svg]:fill-red-600">
      {isLike ? (
        <AiFillHeart size={23.5} className="fill-red-600" />
      ) : (
        <AiOutlineHeart size={23.5} />
      )}
    </div>
  );
}
