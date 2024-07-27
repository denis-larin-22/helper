'use client'

import { getFormattedDate } from "./utils";

const LS_KEY = 'daily-nutrient-data';

interface IDailyNutrients {
    date: string,
    dailyProteins: number,
    dailyCarbohydrates: number,
    dailyFats: number,
    dailyKilocalories: number
}

interface IUpdates {
    proteinsResult: number,
    carbohydratesResult: number,
    fatsResult: number,
    kilocaloriesResult: number,
}

export function updateDailyNutrientsLS(updates: IUpdates) {
    if (typeof window === 'undefined') {
        return null;
    }

    let dailyNutrientFromLS: string | null = localStorage.getItem(LS_KEY);

    if (!dailyNutrientFromLS) {
        const dailyNutrients: IDailyNutrients = {
            date: getFormattedDate(),
            dailyProteins: updates.proteinsResult,
            dailyCarbohydrates: updates.carbohydratesResult,
            dailyFats: updates.fatsResult,
            dailyKilocalories: updates.kilocaloriesResult
        }

        localStorage.setItem(LS_KEY, JSON.stringify(dailyNutrients));
    } else {
        const dailyNutrients: IDailyNutrients = JSON.parse(dailyNutrientFromLS);
        const currentDate = getFormattedDate();

        if (dailyNutrients.date === currentDate) {
            localStorage.setItem(LS_KEY, JSON.stringify({
                date: dailyNutrients.date,
                dailyProteins: dailyNutrients.dailyProteins + updates.proteinsResult,
                dailyCarbohydrates: dailyNutrients.dailyCarbohydrates + updates.carbohydratesResult,
                dailyFats: dailyNutrients.dailyFats + updates.fatsResult,
                dailyKilocalories: dailyNutrients.dailyKilocalories + updates.kilocaloriesResult
            }))
        } else {
            localStorage.setItem(LS_KEY, JSON.stringify({
                date: currentDate,
                dailyProteins: dailyNutrients.dailyProteins + updates.proteinsResult,
                dailyCarbohydrates: dailyNutrients.dailyCarbohydrates + updates.carbohydratesResult,
                dailyFats: dailyNutrients.dailyFats + updates.fatsResult,
                dailyKilocalories: dailyNutrients.dailyKilocalories + updates.kilocaloriesResult
            }))
        }
    }
}

export function getDailyNutrientsLS(): IDailyNutrients | null {
    if (typeof window === 'undefined') {
        return null;
    }

    const currentDate = getFormattedDate();

    const dailyNutrients = localStorage.getItem(LS_KEY);

    if (dailyNutrients) {
        const result = JSON.parse(dailyNutrients) as IDailyNutrients;

        if (result.date === currentDate) {
            return result;
        } else {
            return {
                date: getFormattedDate(),
                dailyProteins: 0,
                dailyCarbohydrates: 0,
                dailyFats: 0,
                dailyKilocalories: 0
            }
        }
    } else {
        return {
            date: getFormattedDate(),
            dailyProteins: 0,
            dailyCarbohydrates: 0,
            dailyFats: 0,
            dailyKilocalories: 0
        }
    }
}