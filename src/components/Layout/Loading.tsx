interface LoadingProps {
  isVisible: boolean;
}

export const Loading = ({ isVisible }: LoadingProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-2xl font-bold text-black">Loading...</h2>
      </div>
    </div>
  );
};