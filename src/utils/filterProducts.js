export function filterProducts(products, query = '', category = '') {
  const search = query.trim().toLocaleLowerCase('ko-KR')
  return products.filter(product => {
    const matchesCategory = !category || product.category === category
    const terms = [product.storeName, ...(product.menuKeywords ?? [])]
    const matchesSearch = !search || terms.some(term => term.toLocaleLowerCase('ko-KR').includes(search))
    return matchesCategory && matchesSearch
  })
}
