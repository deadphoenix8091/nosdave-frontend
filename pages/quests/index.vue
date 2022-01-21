<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><nuxt-link to="/">Home</nuxt-link></li>
        <li class="breadcrumb-item active" aria-current="page">Quests</li>
      </ol>
    </nav>
    
    <template v-for="currentQuest in quests">
      <QuestReference :for="currentQuest" :key="currentQuest.id"/>
    </template>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, route }) {
    let query = $content('quest', { deep: true });
    let quests = await query.fetch();

    quests.sort(function(a, b) {
        return a.level[0] - b.level[0];
    });
    
    return {
      quests
    }
  }
}
</script>