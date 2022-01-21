<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><nuxt-link to="/">Home</nuxt-link></li>
        <li class="breadcrumb-item active" aria-current="page">Monsters</li>
      </ol>
    </nav>
    
    <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" v-model="searchTerm" v-on:input="search">

    <el-table
      :data="monsters"
      style="width: 100%">
      <el-table-column prop="name" label="Name">
        <template slot-scope="scope">
          <nuxt-link :to="`/monsters/${scope.row.slug}`">{{ scope.row.name }}</nuxt-link>
        </template>
      </el-table-column>
      <template slot="empty">
        <div>
          No monsters found.
        </div>
      </template>
    </el-table>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
export default {
  async asyncData ({ $content, route }) {
    let query = $content('monster', { deep: true })
    const monsters = await query.fetch();
    let searchTerm = "";
    const unfilteredMonsters =  JSON.parse(JSON.stringify(monsters));
    return {
      monsters,
      searchTerm,
      unfilteredMonsters
    }
  },
  methods: {
    async search({ $http }) {
      const options = {
        includeScore: true,
        // Search in `author` and in `tags` array
        keys: ['name']
      }

      const fuse = new Fuse(this.unfilteredMonsters, options)

      const result = fuse.search(this.searchTerm);
      this.monsters = result.map((x) => x.item);
      //filter items
    }
  }
}
</script>