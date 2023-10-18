import Image from "next/image";
import Link from "next/link";

interface FilmCardProps {
  doc: any;
  favs: any[];
  id?: string;
  category?: string;
  handleAddItem: (item: any) => void;
  handleRemoveItem: (item: any) => void;
}

const cardContainer =
  "bg-whit relative h-[30rem] p-1 text-black relative group/card hover:border-yellow-500 border ";

export function Card({
  doc,
  favs,
  category,
  id,
  handleAddItem,
  handleRemoveItem,
}: FilmCardProps) {
  const isFavorite =
    favs && favs.length ? favs.find((fav: any) => fav.url === doc.url) : false;

  const toggleFavs = () => {
    if (isFavorite) return handleRemoveItem(doc);
    return handleAddItem(doc);
  };

  return (
    <div
      // href={`/${category}/${id}`}
      key={doc.episode_id ? doc?.title : doc?.name}
      className={`${cardContainer}`}
    >
      <div className="h-full w-full relative bg-black">
        <Image
          fill
          alt={doc.episode_id ? doc?.title : doc?.name}
          src={`/images/${category}/${category}_${doc.episode_id ?? id}.jpeg`}
          className={
            doc.episode_id ? "object-cover" : "object-cover object-top"
          }
        />
      </div>

      <div className="absolute top-2 right-2 cursor-pointer" onClick={toggleFavs}>
        <Image
          alt={doc.episode_id ? doc?.title : doc?.name}
          src={`/icons/${isFavorite ? "bookmark_filled" : "bookmark"}.svg`}
          width={40}
          height={40}
        />
      </div>

      <Link
          href={`/${category}/${id}`}
        style={{
          background: `linear-gradient(to top, black 50%, transparent )`,
        }}
        className=" flex-col justify-end items-start text-white p-2  flex bg-black h-[12rem] w-full absolute bottom-0 left-0 z-50"
      >
        <h1 className="uppercase text-3xl font-bold mt-2 pl-2 leading-10 group-hover/card:text-yellow-500">
          {doc.episode_id ? doc?.title : doc?.name}
        </h1>
      </Link>

    </div>
  );
}
