import { categories } from '../data/categories'

const categoryNames = ['전체', ...categories.map(category => category.name)]

export default function CategoryTabs({ selected, onSelect }) {
  return (
    <div className="home-categories" role="group" aria-label="럭키백 카테고리">
      {categoryNames.map(category => (
        <button key={category} type="button" aria-pressed={selected === category}
          className={`home-category${selected === category ? ' home-category--selected' : ''}`}
          onClick={() => onSelect(category)}>{category}</button>
      ))}
    </div>
  )
}
