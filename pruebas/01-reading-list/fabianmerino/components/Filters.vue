<script setup lang="ts">
const { filters, clear } = useFilters()
const { data: listOfGenres } = await useLazyAsyncData('genres', () => $fetch('/api/v1/genres'))
</script>

<template>
  <UContainer class="p-4 my-4 border rounded-xl border-gray-300 dark:border-gray-800">
    <div class="flex items-center justify-between">
      <span class="text-xl font-semibold leading-6 text-gray-900 dark:text-white">Filtros</span>
      <UButton
        color="gray"
        variant="ghost"
        icon="i-mdi-filter-remove"
        class="-my-1"
        @click="clear"
      />
    </div>
    <div class="mt-4">
      <div class="flex items-center gap-4">
        <div class="flex flex-col gap-3 w-72 justify-between">
          <span class="text-base font-semibold text-gray-900 dark:text-white"> Nº de páginas </span>
          <div class="flex gap-2 items-center justify-between">
            <URange v-model="filters.numberOfPages" :min="10" :max="1200" :step="1" />
            <UBadge size="sm">{{ filters.numberOfPages }}</UBadge>
          </div>
        </div>
        <div class="flex flex-col gap-3 w-72 justify-between">
          <span class="text-base font-semibold text-gray-900 dark:text-white">Género</span>
          <USelectMenu
            v-model="filters.genre"
            :options="listOfGenres || []"
            multiple
            :debounce="600"
            searchable
            searchable-placeholder="Buscar un género..."
          />
        </div>
      </div>
    </div>
  </UContainer>
</template>
