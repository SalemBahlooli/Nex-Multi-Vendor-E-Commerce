import { Suspense } from "react";

import { Results, ResultsSkeleton } from "./_components/results";

import React, { useState, useEffect } from "react";

export default function Page() {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <div className="h-full p-2 max-w-screen-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Categoris</h1>
      </div>
    </div>
  );
}
