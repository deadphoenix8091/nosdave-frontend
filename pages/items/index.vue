<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><nuxt-link to="/">Home</nuxt-link></li>
        <li class="breadcrumb-item active" aria-current="page">Items</li>
      </ol>
    </nav>
    
    <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" v-model="searchTerm" v-on:input="search">
<el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="25"
        :total="resultCount">
    </el-pagination>

    <el-table
      :data="items"
      style="width: 100%">
      <el-table-column prop="internalId" label="Image">
        <template slot-scope="scope">
          <img :src="`https://itempicker.atlagaming.eu/api/items/icon/${scope.row.internalId}`"/>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name">
        <template slot-scope="scope">
          <nuxt-link :to="`/items/${scope.row.slug}`">{{ scope.row.name }}</nuxt-link>
        </template>
      </el-table-column>
      <el-table-column prop="raw_description" label="Description">
        <template slot-scope="scope">
          {{ scope.row.raw_description | description }}
        </template>
      </el-table-column>
      <template slot="empty">
        <div>
          No items found.
        </div>
      </template>
    </el-table>
    <!--<ul>
      <li v-for="currentItem in items" :key="currentItem.id">
        <nuxt-link :to="`/items/${currentItem.slug}`">{{ currentItem.name }}</nuxt-link>
      </li>
    </ul>-->

  </div>
</template>

<script>
import Fuse from 'fuse.js'
export default {
  async asyncData ({ $content, route }) {
    let query = $content('item', { deep: true })
    let items = await query.fetch();
    let searchTerm = "";
    const unfilteredItems =  JSON.parse(JSON.stringify(items));
    let resultCount = unfilteredItems.length;
    
    items = items.slice(0, 25);
    return {
      items,
      searchTerm,
      unfilteredItems,
      resultCount
    }
  },
  methods: {
    async search({ $http }) {
      const options = {
        includeScore: true,
        // Search in `author` and in `tags` array
        keys: ['name']
      }

      const fuse = new Fuse(this.unfilteredItems, options)

      const result = fuse.search(this.searchTerm);
      this.items = result.map((x) => x.item);
      this.resultCount = this.items.length;
      this.items = this.items.slice(0, 25);
      //filter items
    },
    handleCurrentChange(val) {
      if (this.searchTerm) {
        const options = {
          includeScore: true,
          // Search in `author` and in `tags` array
          keys: ['name']
        }

        const fuse = new Fuse(this.unfilteredItems, options)

        const result = fuse.search(this.searchTerm);
        this.items = result.map((x) => x.item);
      } else {
        this.items = this.unfilteredItems;
      }

      this.resultCount = this.items.length;
      this.items = this.items.slice(25 * (val - 1), 25 * val);
    },
  }
}
</script>