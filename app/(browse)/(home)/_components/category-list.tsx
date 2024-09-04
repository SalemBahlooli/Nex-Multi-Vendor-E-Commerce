"use client";

import { getAllCategories } from '@/lib/category-service';
import React, { useState, useEffect } from 'react';

type Category = {
  id: string;
  title: string;
  image: string | null;
  slug: string | null;
  createdAt: Date;
};

export const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const displayedCategories = showAll ? categories : categories.slice(0, 5);

  return (
    <div className="relative p-4  shadow-md">
      <div className="flex justify-end mb-4">
        <button
          className="text-xl text-gray-700 hover:text-gray-900 focus:outline-none"
          onClick={toggleShowAll}
        >
          &rarr;
        </button>
      </div>
      <div className="flex overflow-x-auto space-x-4">
        {displayedCategories.map((category) => (
          <div key={category.id} className="flex flex-col items-center">
            {category.image && (
              <img style={{ height:150  , width:110}}   
                src={category.image}
                alt={category.title}
               
              />
            )}
            <span className="mt-2 text-sm text-gray-600">{category.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};