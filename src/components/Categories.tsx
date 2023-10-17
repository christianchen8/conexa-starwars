import { SetStateAction, Dispatch } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  CATEGORY_FILMS,
  CATEGORY_PEOPLE,
  CATEGORY_PLANETS,
  CATEGORY_STARSHIPS,
} from "@/utils/constants";

import "swiper/css";
import "swiper/css/free-mode";

interface CategoriesProps {
  category: string;
  getData: (e: string) => void;
}

const categories = [
  CATEGORY_FILMS,
  CATEGORY_PEOPLE,
  CATEGORY_PLANETS,
  CATEGORY_STARSHIPS,
];

export function Categories({ category, getData }: CategoriesProps) {
  return (
    <div className="flex items-center justify-start w-full">
      <Swiper slidesPerView={"auto"} spaceBetween={30}>
        {categories.map((nav) => {
          return (
            <SwiperSlide key={nav}>
              <h1
                key={nav}
                className={` text-5xl text-white font-[100] uppercase cursor-pointer hover:text-yellow-500 ${
                  category === nav.toLocaleLowerCase()
                    ? "font-[400] text-yellow-500"
                    : ""
                }`}
                onClick={() => getData(nav.toLocaleLowerCase())}
              >
                {nav}
              </h1>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
