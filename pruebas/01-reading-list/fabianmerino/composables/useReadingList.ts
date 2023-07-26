import { Book } from 'types'

export function useReadingList() {
  const readingList = useState<Book[]>('readingList', () => [])

  const addToReadingList = (book: Book): void => {
    readingList.value.push(book)
  }

  const removeFromReadingList = (book: Book): void => {
    readingList.value.splice(readingList.value.indexOf(book), 1)
  }

  const isInReadingList = (book: Book): boolean => {
    return readingList.value.some((rbook) => rbook.title === book.title)
  }
  return {
    readingList,
    addToReadingList,
    removeFromReadingList,
    isInReadingList,
  }
}
