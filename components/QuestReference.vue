<template>
  <nuxt-link :to="`/quests/${currentQuest.slug}`" :key="currentQuest.id">
        <card class="h-auto" :class="{ 'bg-primary': currentQuest.isActive }">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6">
                <h7 class="text-danger">Level {{ currentQuest.level[0] }}
                    <template v-if="currentQuest.level[1] != 99">
                        - {{ currentQuest.level[1] }}
                    </template></h7>
                <h5 class="card-title">{{ currentQuest.raw_title }}</h5>
              </div>
            </div>
          </template>
        </card>
      </nuxt-link>
</template>

<script>
import Card from './Cards/Card.vue';
export default {
  components: { Card },
  data () {
    let currentQuest = this.$attrs.for;
    currentQuest.isActive = this.$attrs.active == true;

    return {
      currentQuest
    }
  }
}
</script>