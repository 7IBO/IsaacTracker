interface LoadingProps {
  isVisible: boolean;
}

export const Loading = ({ isVisible }: LoadingProps) => {
  if (!isVisible) return null;

  return (
    <div className="bg-opacity-50 fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black">
      <div className="rounded-lg bg-white p-4">
        <h2 className="text-2xl font-bold text-black">Loading...</h2>
      </div>
    </div>
  );
};
