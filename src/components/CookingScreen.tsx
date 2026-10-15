import React, { useState } from 'react';
import { ArrowLeft, Clock, Star, Users, ChefHat, Check, Bookmark, Printer, Sparkles } from 'lucide-react';
import { COOKING_SPOTLIGHT, Recipe } from '../data/newsData';
import { CookingChickenImage } from './EditorialImages';

interface CookingScreenProps {
  onBack: () => void;
  spotlightRecipe?: Recipe;
}

const ADDITIONAL_RECIPES: Recipe[] = [
  {
    id: 'pasta-al-limone',
    title: 'Silky Pasta al Limone With Basil',
    summary: 'A 20-minute Roman classic combining sweet butter, heavy cream, zesty Meyer lemon, and freshly grated Parmigiano.',
    cookTime: '20 minutes',
    prepTime: '5 minutes',
    servings: 4,
    rating: 4.9,
    reviewsCount: 3820,
    author: 'Alison Roman',
    ingredients: [
      '1 pound spaghetti or linguine',
      '4 tablespoons unsalted butter',
      '2 Meyer lemons (zest and juice)',
      '1 cup finely grated Parmigiano-Reggiano',
      '1/2 cup fresh basil leaves',
      'Freshly cracked black pepper and sea salt'
    ],
    instructions: [
      'Bring a large pot of salted water to a rolling boil and cook pasta until al dente.',
      'In a wide skillet, melt butter with lemon zest over medium-low heat.',
      'Transfer pasta directly to the skillet, along with 1/2 cup pasta water and lemon juice.',
      'Toss vigorously while adding cheese until a glossy, emulsified sauce forms.',
      'Finish with fresh basil and cracked pepper.'
    ],
    chefTips: 'Save at least 1 cup of starchy pasta water! The starch is the secret binder that keeps the sauce silky without separating.'
  },
  {
    id: 'brown-butter-cookies',
    title: 'The Ultimate Chewy Brown-Butter Chocolate Chip Cookies',
    summary: 'Nutty browned butter, flaky Maldon salt, and dark chocolate chunks create an unmistakably rich bakery bite.',
    cookTime: '14 minutes',
    prepTime: '25 minutes',
    servings: 12,
    rating: 4.9,
    reviewsCount: 8430,
    author: 'Ravneet Gill',
    ingredients: [
      '1 cup unsalted butter, browned and cooled',
      '1 cup dark brown sugar, packed',
      '1/2 cup granulated white sugar',
      '2 large eggs at room temperature',
      '2 cups all-purpose flour',
      '8 ounces bittersweet chocolate (70%), coarsely chopped',
      'Flaky sea salt for sprinkling'
    ],
    instructions: [
      'Melt butter in a skillet until foaming, fragrant, and specked with amber milk solids. Cool for 15 minutes.',
      'Whisk browned butter with both sugars until thick and glossy.',
      'Beat in eggs one at a time, followed by dry ingredients and chocolate chunks.',
      'Chill dough balls for at least 12 hours for deep toffee flavor development.',
      'Bake at 350°F (175°C) for 12–14 minutes. Hit with flaky sea salt while hot.'
    ],
    chefTips: 'Chilling the dough overnight allows the flour to hydrate fully, resulting in that coveted butterscotch chew.'
  }
];

export const CookingScreen: React.FC<CookingScreenProps> = ({ onBack, spotlightRecipe = COOKING_SPOTLIGHT }) => {
  const [activeRecipe, setActiveRecipe] = useState<Recipe>(spotlightRecipe);
  const [servingsMultiplier, setServingsMultiplier] = useState(1);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [cookingMode, setCookingMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-8 font-sans">
      {/* Top Navigation */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-nyt">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-nyt-black hover:text-nyt-blue transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Front Page</span>
        </button>
        <div className="flex items-center gap-2">
          <ChefHat className="w-4 h-4 text-rose-600" />
          <span className="text-xs font-bold uppercase tracking-widest text-nyt-black">NYT Cooking Desk</span>
        </div>
      </div>

      {/* Hero Recipe Banner */}
      <div className="border border-nyt p-6 sm:p-8 bg-neutral-50 mb-10 rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700 mb-2">
            <span>Cooking Spotlight</span>
            <span>·</span>
            <span>Weeknight Winner</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-nyt-black leading-tight mb-4">
            {activeRecipe.title}
          </h1>

          <p className="font-serif text-lg text-neutral-600 mb-6">
            {activeRecipe.summary}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-nyt-grayDark border-y border-nyt py-3">
            <span className="font-bold text-black">By {activeRecipe.author}</span>
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{activeRecipe.cookTime}</span>
            </span>
            <span className="flex items-center gap-1 text-amber-600 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{activeRecipe.rating} ({activeRecipe.reviewsCount.toLocaleString()})</span>
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>{activeRecipe.servings * servingsMultiplier} Servings</span>
            </span>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => {
                setCookingMode(true);
                setCurrentStep(0);
              }}
              className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
            >
              Start Cooking Mode
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-2.5 border border-nyt bg-white hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Recipe</span>
            </button>
          </div>
        </div>

        {/* Right: Recipe Visual Artwork */}
        <div className="lg:col-span-5">
          <div className="border border-nyt overflow-hidden rounded-xs shadow-xs">
            <CookingChickenImage />
          </div>
        </div>
      </div>

      {/* Cooking Mode Modal */}
      {cookingMode && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full p-8 rounded-sm space-y-6">
            <div className="flex items-center justify-between border-b border-nyt pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-nyt-grayMid">
                Cooking Mode · Step {currentStep + 1} of {activeRecipe.instructions.length}
              </span>
              <button
                onClick={() => setCookingMode(false)}
                className="text-xs font-bold uppercase tracking-wider text-rose-600 hover:underline cursor-pointer"
              >
                Exit Mode
              </button>
            </div>

            <p className="font-serif text-2xl text-nyt-black leading-relaxed">
              {activeRecipe.instructions[currentStep]}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-nyt">
              <button
                disabled={currentStep === 0}
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded cursor-pointer ${
                  currentStep === 0 ? 'bg-neutral-200 text-neutral-400' : 'bg-neutral-100 hover:bg-neutral-200'
                }`}
              >
                Previous Step
              </button>
              <button
                onClick={() => {
                  if (currentStep < activeRecipe.instructions.length - 1) {
                    setCurrentStep((prev) => prev + 1);
                  } else {
                    setCookingMode(false);
                  }
                }}
                className="px-6 py-2 text-xs font-bold uppercase tracking-wider bg-black text-white hover:bg-neutral-800 rounded cursor-pointer"
              >
                {currentStep === activeRecipe.instructions.length - 1 ? 'Finish Dish' : 'Next Step →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Recipe Content: 2-Column Split */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        {/* Left: Ingredients */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center justify-between border-b border-nyt pb-2">
            <h3 className="font-serif font-bold text-xl">Ingredients</h3>
            {/* Servings scale */}
            <div className="flex items-center space-x-1 text-xs">
              <span className="text-nyt-grayMid">Yield:</span>
              {[1, 1.5, 2].map((multiplier) => (
                <button
                  key={multiplier}
                  onClick={() => setServingsMultiplier(multiplier)}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    servingsMultiplier === multiplier ? 'bg-black text-white font-bold' : 'bg-neutral-100 hover:bg-neutral-200'
                  }`}
                >
                  {activeRecipe.servings * multiplier}
                </button>
              ))}
            </div>
          </div>

          <ul className="space-y-3 text-sm">
            {activeRecipe.ingredients.map((ing, idx) => {
              const isChecked = checkedIngredients[idx];
              return (
                <li
                  key={idx}
                  onClick={() => toggleIngredient(idx)}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <div
                    className={`w-4 h-4 mt-0.5 rounded-xs border flex items-center justify-center shrink-0 transition-colors ${
                      isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-neutral-400 group-hover:border-black'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={`font-serif ${isChecked ? 'line-through text-neutral-400' : 'text-neutral-800'}`}>
                    {ing}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Chef Tip Callout */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-sm space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">Chef's Note</span>
            <p className="font-serif text-xs text-amber-950 leading-relaxed">
              {activeRecipe.chefTips}
            </p>
          </div>
        </div>

        {/* Right: Step-by-Step Instructions */}
        <div className="md:col-span-7 space-y-6">
          <h3 className="font-serif font-bold text-xl border-b border-nyt pb-2">Preparation</h3>
          <ol className="space-y-6">
            {activeRecipe.instructions.map((step, idx) => (
              <li key={idx} className="flex gap-4">
                <span className="font-bold text-sm text-neutral-400 font-mono shrink-0 pt-0.5">
                  0{idx + 1}.
                </span>
                <p className="font-serif text-base text-neutral-800 leading-relaxed">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* More Curated Recipes */}
      <section className="pt-10 border-t-2 border-black">
        <h3 className="text-xs font-bold uppercase tracking-widest text-nyt-black mb-6">
          More From NYT Cooking
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[COOKING_SPOTLIGHT, ...ADDITIONAL_RECIPES].map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => {
                setActiveRecipe(recipe);
                setCheckedIngredients({});
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="border border-nyt p-4 hover:border-black transition-colors cursor-pointer group rounded-sm space-y-2 bg-white"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
                {recipe.cookTime} · {recipe.author}
              </span>
              <h4 className="font-serif font-bold text-base group-hover:text-nyt-blue leading-snug">
                {recipe.title}
              </h4>
              <p className="font-serif text-xs text-neutral-600 line-clamp-2">
                {recipe.summary}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-amber-600 pt-1">
                <Star className="w-3 h-3 fill-current" />
                <span className="font-bold">{recipe.rating}</span>
                <span className="text-neutral-400">({recipe.reviewsCount.toLocaleString()})</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
