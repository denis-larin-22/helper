import { getDailyNutrientsLS } from "../lib/local-storage"
import { getDayOfWeek, getFormattedDate } from "../lib/utils";

export function DailyNutrients() {
    const daiyNutrients = getDailyNutrientsLS();
    if (!daiyNutrients) return null;

    const { dailyProteins, dailyCarbohydrates, dailyFats, dailyKilocalories } = daiyNutrients;
    const date = getFormattedDate();
    const dayOfWeek = getDayOfWeek();

    return (
        <section>
            <div className="flex justify-between items-center text-white bg-teal-500 px-4 border-b-4 border-teal-800">
                <p className="text-xl">{dayOfWeek}</p>
                <p className="text-sm">📅{date}</p>
            </div>
            <ul className="flex justify-between ">
                <li className="border-2 border-teal-400 w-full text-sm">
                    <p className="border-b-2 border-teal-100 ">🍗 Б</p>
                    <p className="">{dailyProteins.toFixed(1)}</p>
                </li>
                <li className="border-2 border-teal-400 w-full text-sm">
                    <p className="border-b-2 border-teal-100 ">🍟 У</p>
                    <p className="">{dailyCarbohydrates.toFixed(1)}</p>
                </li>
                <li className="border-2 border-teal-400 w-full text-sm">
                    <p className="border-b-2 border-teal-100 ">🥑 Ж</p>
                    <p className="">{dailyFats.toFixed(1)}</p>
                </li>
                <li className="border-2 border-teal-400 w-full text-sm">
                    <p className="border-b-2 border-teal-100 ">🔥 кКал.</p>
                    <p className="">{dailyKilocalories.toFixed(1)}</p>
                </li>
            </ul>
            {/* <ul className="flex justify-between ">
                <li className="border-2 border-teal-400 w-full text-sm">
                    <p className="border-b-2 border-teal-100 ">🍗 Б</p>
                    <p className="">{dailyProteins.toFixed(1)}</p>
                </li>
                <li className="border-2 border-teal-400 w-full text-sm">
                    <p className="border-b-2 border-teal-100 ">🍟 У</p>
                    <p className="">{dailyCarbohydrates.toFixed(1)}</p>
                </li>
                <li className="border-2 border-teal-400 w-full text-sm">
                    <p className="border-b-2 border-teal-100 ">🥑 Ж</p>
                    <p className="">{dailyFats.toFixed(1)}</p>
                </li>
                <li className="border-2 border-teal-400 w-full text-sm">
                    <p className="border-b-2 border-teal-100 ">🔥 кКал.</p>
                    <p className="">{dailyKilocalories.toFixed(1)}</p>
                </li>
            </ul> */}
        </section>
    )
}