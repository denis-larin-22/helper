'use client'

import { useState } from "react";
import { updateDailyNutrientsLS } from "../lib/local-storage";

export function EnterManuallyForm() {
    const initState = {
        proteinsResult: 0,
        carbohydratesResult: 0,
        fatsResult: 0,
        kilocaloriesResult: 0,
    }
    const [formState, setFormState] = useState(initState);
    const [toggleVissible, setToggleVissible] = useState(false);

    return (
        <section className="relative h-full flex flex-col justify-end">
            {toggleVissible && <form className="flex flex-col text-sm">
                <label htmlFor="proteins" className="">Белки:</label>
                <input
                    id="proteins" type="number" className="ring-2 ring-teal-200 ring-offset-2 focus:outline-none"
                    value={formState.proteinsResult}
                    onChange={(e) => setFormState({ ...formState, proteinsResult: Number(e.target.value) })}
                />

                <label htmlFor="carbohydrates" className="">Углеводи:</label>
                <input
                    id="carbohydrates" type="number" className="ring-2 ring-teal-200 ring-offset-2 focus:outline-none"
                    value={formState.carbohydratesResult}
                    onChange={(e) => setFormState({ ...formState, carbohydratesResult: Number(e.target.value) })}
                />

                <label htmlFor="fats" className="">Жиры:</label>
                <input
                    id="fats" type="number" className="ring-2 ring-teal-200 ring-offset-2 focus:outline-none"
                    value={formState.fatsResult}
                    onChange={(e) => setFormState({ ...formState, fatsResult: Number(e.target.value) })}
                />

                <label htmlFor="kilocalories" className="">кКал</label>
                <input
                    id="kilocalories" type="number" className="ring-2 ring-teal-200 ring-offset-2 focus:outline-none"
                    value={formState.kilocaloriesResult}
                    onChange={(e) => setFormState({ ...formState, kilocaloriesResult: Number(e.target.value) })}
                />

                <button
                    className="py-1 px-2 text-sm bg-teal-300 mt-5"
                    onClick={() => {
                        updateDailyNutrientsLS(formState);
                        setFormState(initState);
                        setToggleVissible(false);
                    }}
                >Записать</button>
            </form>}

            <p
                className="text-sm text-right text-gray-400 mt-3"
                onClick={() => setToggleVissible(!toggleVissible)}
            >Ввести вручную</p>
        </section>
    )
}