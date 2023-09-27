import { TbRepeat } from 'react-icons/tb';

type Props = {
  isReplies: boolean;
  onReplies: () => void;
};

export default function RepliesButton({ isReplies, onReplies }: Props) {
  return (
    <div
      onClick={onReplies}
      className="cursor-pointer transition-all duration-300 active:scale-150">
      {isReplies ? (
        <svg
          width="20"
          height="18"
          viewBox="0 0 14 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 8V5.75C1 5.15326 1.23705 4.58097 1.65901 4.15901C2.08097 3.73705 2.65326 3.5 3.25 3.5H13M13 3.5L10.75 1.25M13 3.5L10.75 5.75"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13 8V10.25C13 10.8467 12.7629 11.419 12.341 11.841C11.919 12.2629 11.3467 12.5 10.75 12.5H1M1 12.5L3.25 14.75M1 12.5L3.25 10.25"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.22279 7.09565C9.30919 7.03362 9.42417 6.99933 9.54346 7.00001C9.66276 7.00069 9.77703 7.03629 9.86218 7.09929C9.94733 7.1623 9.99669 7.24778 9.99984 7.33771C10.003 7.42763 9.95969 7.51496 9.87908 7.58127L7.43178 9.88914C7.3897 9.92331 7.33891 9.95074 7.28245 9.96978C7.22599 9.98882 7.16502 9.99908 7.10318 9.99994C7.04134 10.0008 6.97991 9.99226 6.92255 9.97481C6.86519 9.95736 6.81309 9.93137 6.76936 9.89839L5.14641 8.67462C5.10122 8.64286 5.06497 8.60456 5.03982 8.56202C5.01468 8.51947 5.00116 8.47353 5.00007 8.42696C4.99898 8.38038 5.01034 8.33412 5.03348 8.29093C5.05662 8.24774 5.09105 8.2085 5.13474 8.17556C5.17842 8.14262 5.23045 8.11666 5.28773 8.09921C5.34501 8.08177 5.40637 8.0732 5.46813 8.07402C5.5299 8.07484 5.59082 8.08504 5.64724 8.10399C5.70367 8.12295 5.75446 8.15029 5.79657 8.18437L7.08094 9.15238L9.21113 7.10582C9.21497 7.10226 9.21845 7.09886 9.22279 7.09565Z"
            fill="black"
            stroke="black"
            stroke-width="0.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ) : (
        <TbRepeat size={20} />
      )}
    </div>
  );
}
