<template>
  <div class="pt-3">
    <div class="row">
      <div class="col-sm-6">
        <h1 class="m-0">{{ item.name }}
        </h1>
      </div><!-- /.col -->
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><nuxt-link to="/">Home</nuxt-link></li>
          <li class="breadcrumb-item"><nuxt-link to="/items">Items</nuxt-link></li>
          <li class="breadcrumb-item active">Detail</li>
        </ol>
      </div><!-- /.col -->
    </div>
    <div class="row">
      <div class="col-xl-3 col-md-4 mb-1">
        <div class="card shadow">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="card-title">Item Details</h6>
            </div>
            
            <div class="card-body">
              <table class="table table-striped borderless">
                <thead>
                  <tr><th colspan="2">Data</th></tr>
                </thead>
                <tbody>
                  
                </tbody> 
              </table>

              
            </div>
        </div>
      </div>
      <div class="col-auto">
        <h2>Description</h2>
        <template v-if="!item.raw_description">
          <div class="card bg-info text-white shadow">
            <div class="card-body">
              This quest has no description!
            </div>
          </div>
        </template>
        <template v-if="item.raw_description">
          <div class="card bg-info text-white shadow">
            <div class="card-body">
              {{ item.raw_description }}
            </div>
          </div>
        </template>
        <pre><code>{{rawData}}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params, error }) {
    let item;
    try {
      item = await $content('item', params.slug).fetch()
    } catch (e) {
      return error({ message: 'Item ' + params.slug + ' not found' })
    }
    
    return {item: item, rawData: JSON.stringify(item, null, 4)};
  },
  head () {
    return {
      title: this.item.name,
      description: this.item.name
    }
  }
}
</script>