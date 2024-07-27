'use client'

import { useEffect, useState } from "react";
import { DailyNutrients } from "./components/DailyNutrients";
import NutrientCalculator from "./components/NutrientCalculator";
import { EnterManuallyForm } from "./components/EnterManuallyForm";

export default function Home() {
  // Check client side
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  if (!isClient) return null;


  return (
    <main className="container h-dvh flex flex-col justify-between">
      <DailyNutrients />
      <EnterManuallyForm />
      <NutrientCalculator />
    </main>
  );
}
