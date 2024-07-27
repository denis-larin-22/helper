'use client'

import { FormEvent, useEffect, useState } from "react";
import { updateDailyNutrientsLS } from "../lib/local-storage";
import { groceriesListValues } from "../lib/data";

interface INutrientsObject {
    proteins: number,
    carbohydrates: number,
    fats: number,
    kilocalories: number,
    finishedProductWeight: number
}

export default function NutrientCalculator() {
    const [buttonsState, setButtonsState] = useState(false);

    const initStateResult = {
        proteinsResult: 0,
        carbohydratesResult: 0,
        fatsResult: 0,
        kilocaloriesResult: 0,
    }

    const [foodQuantity, setFoodQuantity] = useState<number>(0);
    const [selectedGrocery, setSelectedGrocery] = useState(groceriesListValues[0]);
    const [result, setResult] = useState(initStateResult);

    function getResult() {
        if (!foodQuantity) return;

        const rawProduct = (foodQuantity / selectedGrocery.finishedProductWeight) * 100;
        const proteinsResult = Number((selectedGrocery.proteins * (rawProduct / 100)).toFixed(2));
        const carbohydratesResult = Number((selectedGrocery.carbohydrates * (rawProduct / 100)).toFixed(2));
        const fatsResult = Number((selectedGrocery.fats * (rawProduct / 100)).toFixed(2));
        const kilocaloriesResult = Number((selectedGrocery.kilocalories * (rawProduct / 100)).toFixed(2));

        const result = { proteinsResult, carbohydratesResult, fatsResult, kilocaloriesResult };
        setResult(result);
    }

    return (
        <form className="container py-5">
            <div className="flex items-center justify-between mb-5 border-y-2 border-teal-400 py-4 px-1 bg-teal-100">
                <select
                    name="select"
                    className="border-2 border-teal-300 h-10 rounded-lg max-h-[150px] overflow-hidden"
                    value={selectedGrocery.name}
                    onChange={(e) => {
                        const selected = groceriesListValues.find(item => item.name === e.target.value);
                        if (selected) setSelectedGrocery(selected);
                    }}
                >
                    {groceriesListValues.map(grocery => (
                        <option key={grocery.name} value={grocery.name}>{grocery.name}</option>
                    ))}
                </select>

                <input
                    type="number"
                    id="quantity"
                    className="inline-block ring-2 ring-teal-300 ring-offset-2 focus:outline-none rounded-lg max-w-36"
                    value={foodQuantity}
                    onChange={(e) => setFoodQuantity(Number(e.target.value))}
                />
            </div>
            <p className="text-lg">Результат:</p>
            <div className="flex justify-between text-sm mb-8">
                <p className="border-2 border-teal-300 w-full">Б -<br /> {result.proteinsResult.toFixed(2)}</p>
                <p className="border-2 border-teal-300 w-full">У -<br /> {result.carbohydratesResult.toFixed(2)}</p>
                <p className="border-2 border-teal-300 w-full">Ж -<br /> {result.fatsResult.toFixed(2)}</p>
                <p className="border-2 border-teal-300 w-full">кКал. -<br /> {result.kilocaloriesResult.toFixed(2)}</p>
            </div>

            <button
                className="mb-5 p-3 border-2 bg-teal-500"
                onClick={(e: FormEvent) => {
                    e.preventDefault();
                    getResult();
                    if (foodQuantity) {
                        setButtonsState(true);
                    }
                }}
            >Рассчитать</button>

            {buttonsState && <>
                <button className="bg-blue-100 border-2 border-blue-300 p-2" onClick={(e) => {
                    e.preventDefault();
                    setFoodQuantity(0);
                    setResult(initStateResult);
                    setButtonsState(false);
                }}>Очистить</button>
                <button className="bg-orange-100 border-2 border-orange-300 p-2" onClick={(e) => {
                    e.preventDefault();

                    updateDailyNutrientsLS(result);

                    location.reload();
                }}>Записать</button>
            </>}
        </form>
    );
}
