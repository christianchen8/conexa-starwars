import Fade from "react-reveal/Fade";

export function PageTitle({ title }: { title: string }) {
  return (
    <div className="w-full border-b">
      <Fade left>
        <h1 className="uppercase text-bold text-4xl lg:text-6xl pb-2 text-white">
          {title}
        </h1>
      </Fade>
    </div>
  );
}
