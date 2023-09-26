import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

type Props = {
  onClick: () => void;
  isLiked: boolean;
};

export default function LikeButton({ onClick, isLiked }: Props) {
  const [isLike, setIsLike] = useState(isLiked);

  const togleLike = () => {
    setIsLike(!isLike);
    onClick();
  };

  return (
    <div
      onClick={togleLike}
      className="cursor-pointer transition-all duration-300 active:scale-150 hover:[&>svg]:fill-red-600">
      {isLike ? (
        <AiFillHeart size={23.5} className="fill-red-600" />
      ) : (
        <AiOutlineHeart size={23.5} />
      )}
    </div>
  );
}
