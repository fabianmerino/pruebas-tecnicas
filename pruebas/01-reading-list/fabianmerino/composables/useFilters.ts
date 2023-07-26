export function useFilters() {
  const filters = useState('filters', () => {
    return {
      numberOfPages: 10,
      genre: [],
    }
  })

  const clear = () => {
    filters.value = {
      numberOfPages: 10,
      genre: [],
    }
  }

  const queryString = computed(() => {
    let values = '?pages=' + filters.value.numberOfPages
    values += filters.value.genre.length ? '&genre=' + filters.value.genre.join(',') : ''

    return values
  })

  return {
    filters,
    clear,
    queryString,
  }
}
