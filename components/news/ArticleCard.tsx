// components/MarkdownArticle.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MarkdownArticle from "../../components/news/MarkdownArticle";


const ArticleCard: React.FC<ArticleCardProps> = ({ isNew, link, image, data }) => {
  return(
    <>
      <Link href={ link != null ? link : ""} className="cursor-pointer flex w-[250px] ">
        <div className="space-y-1 mr-auto outline outline-2 outline-zinc-300 rounded-md hover:scale-105 duration-200 flex flex-col">
          <div className="relative h-[250px] w-[250px]">
            {isNew && (
              <Image
                src={"/images/new_icon.png"}
                alt="new"
                className="absolute top-2 left-2 z-10 "
                width={50}
                height={50}
              />
            )}
            <Image
              src={image}
              alt="article preview"
              fill
              className="rounded-md"
            />
          </div>
          <div className="px-2 py-2 mx-auto text-center w-[250px]">
            <MarkdownArticle markdown={data} />
          </div>
        </div>
      </Link>
    </>
  )
}

export default ArticleCard;