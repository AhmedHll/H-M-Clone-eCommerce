const Skeleton = () => (
  <div className="flex w-full flex-1 flex-col items-center   px-2">
    <div className="mt-12 w-full animate-pulse flex-row items-center justify-center space-x-1 rounded-xl border p-6 ">
      <div className="flex flex-col space-y-2">
        <div className="h-32 w-11/12 rounded-md bg-gray-400" />
        <div className="h-6 w-10/12 rounded-md bg-gray-400" />
        <div className="h-6 w-9/12 rounded-md bg-gray-400" />
      </div>
    </div>
  </div>
);

export default Skeleton;
