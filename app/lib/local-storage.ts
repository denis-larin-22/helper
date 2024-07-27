'use client'

const LS_KEY = 'daily-nutrient-result';

interface IDailyNutrients {
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
            dailyProteins: updates.proteinsResult,
            dailyCarbohydrates: updates.carbohydratesResult,
            dailyFats: updates.fatsResult,
            dailyKilocalories: updates.kilocaloriesResult
        }

        localStorage.setItem(LS_KEY, JSON.stringify(dailyNutrients));
    } else {
        const dailyNutrients: IDailyNutrients = JSON.parse(dailyNutrientFromLS);

        localStorage.setItem(LS_KEY, JSON.stringify({
            dailyProteins: dailyNutrients.dailyProteins + updates.proteinsResult,
            dailyCarbohydrates: dailyNutrients.dailyCarbohydrates + updates.carbohydratesResult,
            dailyFats: dailyNutrients.dailyFats + updates.fatsResult,
            dailyKilocalories: dailyNutrients.dailyKilocalories + updates.kilocaloriesResult
        }))
    }
}

export function getDailyNutrientsLS(): IDailyNutrients | null {
    if (typeof window === 'undefined') {
        return null;
    }

    const dailyNutrients = localStorage.getItem(LS_KEY);

    if (dailyNutrients) {
        return JSON.parse(dailyNutrients) as IDailyNutrients;
    } else {
        return {
            dailyProteins: 0,
            dailyCarbohydrates: 0,
            dailyFats: 0,
            dailyKilocalories: 0
        }
    }
}