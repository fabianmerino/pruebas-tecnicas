import { data } from '../../mock/books'

export default defineEventHandler((event) => {
  // get the filters from the query
  const { pages, genre } = getQuery(event)

  const { library } = data

  // filter the books
  const books = library.filter(({ book }) => {
    if (pages && book.pages <= +pages) {
      return false
    }

    const genrelist = String(genre).split(',')
    if (genre && !genrelist.includes(book.genre)) {
      return false
    }

    return true
  })

  return books
})
