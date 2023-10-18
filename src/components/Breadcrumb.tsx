import Link from "next/link";

interface BreadcrumbProps {
  title: string;
  category: string;
}

export function Breadcrumb({ title, category }: BreadcrumbProps) {
  return (
    <div className="uppercase text-white text-xl mb-4">
      <h1>
        Home / <Link href={`/${category}`}>{category} </Link> /{" "}
        <span className="text-yellow-500">{title} </span>
      </h1>
    </div>
  );
}
