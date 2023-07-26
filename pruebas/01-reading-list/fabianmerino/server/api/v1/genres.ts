import { data } from '../../mock/books'

export default defineEventHandler((event) => {
  const { library } = data

  const genres = library.reduce((acc, { book }) => {
    if (!acc.includes(book.genre)) {
      acc.push(book.genre)
    }

    return acc
  }, [] as string[])

  const uniqueGenres = [...new Set(genres)]

  return uniqueGenres.length > 0 ? uniqueGenres : ['No genres found']
})
