<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><nuxt-link to="/">Home</nuxt-link></li>
        <li class="breadcrumb-item active" aria-current="page">Dialogs</li>
      </ol>
    </nav>
    
    <ul>
      <li v-for="currentQuest in quests" :key="currentQuest.id">
        <nuxt-link :to="`/dialogs/${currentQuest.id}`">{{ currentQuest.raw_title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, route }) {
    let query = $content('npctalk', { deep: true })
    const quests = await query.fetch()
    return {
      quests
    }
  }
}
</script>