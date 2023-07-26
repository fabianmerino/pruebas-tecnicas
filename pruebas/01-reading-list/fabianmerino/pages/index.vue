<script setup lang="ts">
import type { Book } from '~/types/index.d'
const isOpen = ref(false)

const { queryString } = useFilters()
const { readingList, removeFromReadingList } = useReadingList()

const {
  data: books,
  pending,
  refresh,
} = await useLazyAsyncData('books', () => $fetch(`/api/v1/books${queryString.value}`), {
  transform: (data) => data?.map(({ book }) => book),
})

const availableBooks = computed(() => {
  const available = books.value?.filter(
    (book) => !readingList.value.some((rbook) => rbook.title === book.title)
  )
  return available?.length ?? 0
})

// When query string changes, refresh
watchDebounced(
  queryString,
  () => {
    refresh()
  },
  { debounce: 500, maxWait: 3000 }
)
</script>

<template>
  <!-- NAVBAR -->
  <nav class="border-b border-gray-300 dark:border-gray-800 fixed w-full z-50 backdrop-blur-lg">
    <UContainer>
      <div class="h-16 flex justify-between items-center">
        <NuxtLink to="/" class="text-3xl font-bold">Biblioteca XYZ</NuxtLink>
        <div class="flex items-center gap-2">
          <ColorChange />
          <UButton label="Ver lista" @click="isOpen = true" />
        </div>
      </div>
    </UContainer>
  </nav>
  <!-- SLIDE -->
  <USlideover v-model="isOpen">
    <UCard
      class="flex flex-col flex-1"
      :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Lista de lectura
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />
        </div>
      </template>

      <div class="h-full">
        <ul class="grid grid-cols-[repeat(auto-fit,_12rem)] gap-4 py-4">
          <li v-for="book in readingList" :key="book.title">
            <UCard
              :ui="{
                body: { padding: 'p-0', base: 'relative' },
                footer: { padding: 'px-2 py-2 sm:px-4' },
              }"
            >
              <img
                :src="book.cover"
                :alt="book.title"
                class="h-auto w-full max-h-72 object-cover"
              />
              <template #footer>
                <div class="flex flex-col gap-4">
                  <div class="flex flex-col">
                    <div class="flex gap-2 items-center justify-between">
                      <NuxtLink
                        :to="`/books/${slugify(book.title)}`"
                        class="text-base font-bold hover:text-green-500 truncate"
                      >
                        {{ book.title }}
                      </NuxtLink>
                      <UBadge>{{ book.year }}</UBadge>
                    </div>
                    <span class="text-sm text-gray-300 font-serif"> {{ book.author?.name }}</span>
                    <div class="flex gap-2 items-center text-xs">
                      <span class="text-gray-500">{{ book.genre }}</span>
                      <hr class="bg-gray-500 dark:bg-gray-800 w-px h-full" />
                      <span class="text-gray-500">{{ book.year }}</span>
                    </div>
                  </div>

                  <UButton
                    color="red"
                    variant="soft"
                    icon="i-heroicons-minus"
                    label="Eliminar"
                    class="self-end"
                    @click="removeFromReadingList(book)"
                  />
                </div>
              </template>
            </UCard>
          </li>
        </ul>
      </div>
    </UCard>
  </USlideover>
  <!-- Filters -->
  <div class="pt-16">
    <Filters />
  </div>

  <!-- List of books -->
  <section>
    <UContainer>
      <header class="py-4">
        <h3 class="text-2xl font-semibold leading-6 text-gray-900 dark:text-white">
          Libros disponibles:
          <span class="text-green-500 text-3xl font-bold border border-green-500 rounded-lg p-2">
            {{ availableBooks }}
          </span>
        </h3>
      </header>
      <NuxtLoadingIndicator v-if="pending" />
      <ul
        v-else
        class="grid grid-cols-[repeat(auto-fit,_minmax(15rem,_1fr))] gap-8 py-4 md:grid-cols-[repeat(auto-fit,_minmax(20rem,_1fr))]"
      >
        <BooksList :books="books || []" />
      </ul>
    </UContainer>
  </section>
</template>
