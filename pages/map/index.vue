<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><nuxt-link to="/">Home</nuxt-link></li>
        <li class="breadcrumb-item active" aria-current="page">Maps</li>
      </ol>
    </nav>
    
    <ul>
      <li v-for="currentMap in maps" :key="currentMap.id">
        <nuxt-link :to="`/map/map_${currentMap.internalId}`">{{ currentMap.name }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, route }) {
    let query = $content('map', { deep: true })
    const maps = await query.fetch();
    return {
      maps
    }
  }
}
</script>