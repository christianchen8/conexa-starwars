import { Skeleton } from "@nextui-org/react";

export function Skeletons() {
  const emptyArray = new Array(8).fill(null);

  return (
    <>
      {emptyArray.map((num) => {
        return (
          <Skeleton
            key={num}
            className="bg-white h-[30rem] p-1 text-black relative group/card hover:border-white border cursor-pointer"
          />
        );
      })}
    </>
  );
}
