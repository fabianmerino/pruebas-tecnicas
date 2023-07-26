<script setup lang="ts">
import { Book } from 'types'

const { addToReadingList, isInReadingList } = useReadingList()

const props = defineProps({
  books: {
    type: Array as PropType<Book[]>,
    required: true,
  },
})
</script>

<template>
  <li v-for="book in books" :key="book.title" class="max-w-md">
    <UCard
      :ui="{
        body: { padding: 'p-0' },
      }"
      class="h-auto"
    >
      <img
        :src="book.cover"
        :alt="book.title"
        class="h-auto w-full max-h-[32rem] object-cover"
        :class="{
          'grayscale contrast-125': isInReadingList(book),
        }"
      />
      <template #footer>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <NuxtLink
              :to="`/books/${slugify(book.title)}`"
              class="text-xl font-bold hover:text-green-500 truncate"
            >
              {{ book.title }}
            </NuxtLink>
            <div class="flex gap-2 items-center justify-between">
              <span class="text-gray-400"> {{ book.author?.name }}</span>
              <UBadge size="sm">{{ book.year }}</UBadge>
            </div>
          </div>

          <div class="flex gap-2 items-center justify-between">
            <div class="flex flex-col sm:flex-row gap-2 items-center">
              <UBadge color="teal" class="self-start mt-2">{{ book.genre }}</UBadge>
              <UBadge color="orange" class="self-start mt-2">{{ book.pages }} Pág</UBadge>
            </div>
            <UButton
              variant="soft"
              size="lg"
              icon="i-heroicons-plus"
              label="Agregar"
              :disabled="isInReadingList(book)"
              @click="addToReadingList(book)"
            />
          </div>
        </div>
      </template>
    </UCard>
  </li>
</template>
