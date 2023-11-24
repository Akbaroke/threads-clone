export type VerifyStatusType = 'expired' | 'verified' | 'invalid' | null;

const getMessageAndStyle = (verifyStatus: VerifyStatusType) => {
  switch (verifyStatus) {
    case 'expired':
      return {
        message: 'Sorry, the verification link has expired.',
        style: 'bg-red-500/90 text-white',
      };
    case 'invalid':
      return {
        message:
          'Sorry, your account verification was unsuccessful. Make sure you follow the verification link correctly.',
        style: 'bg-red-500/90 text-white',
      };
    case 'verified':
      return {
        message:
          'Congrats! Your account has been successfully verified. Now you can access all the features and benefits it has to offer.',
        style: 'bg-green-500/90',
      };
    default:
      return { message: '', style: '' };
  }
};

export default function LabelVerifyStatus({
  verifyStatus,
}: {
  verifyStatus: VerifyStatusType;
}) {
  const { message, style } = getMessageAndStyle(verifyStatus);

  return (
    message && (
      <div className={`border p-3 rounded-lg text-[14px] ${style}`}>
        {message}
      </div>
    )
  );
}
