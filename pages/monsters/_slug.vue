<template>
  <div class="pt-3">
    <div class="row">
      <div class="col-sm-6">
        <h1 class="m-0">{{ monster.name }}
        </h1>
      </div><!-- /.col -->
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><nuxt-link to="/">Home</nuxt-link></li>
          <li class="breadcrumb-item"><nuxt-link to="/monsters">Monster</nuxt-link></li>
          <li class="breadcrumb-item active">Detail</li>
        </ol>
      </div><!-- /.col -->
    </div>
    <div class="row">
      <div class="col-xl-3 col-md-4 mb-1">
        <div class="card shadow">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="card-title">Monster Details</h6>
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
      <div class="col-md-6 col-xl-9">
        <code><pre>{{ rawData }}</pre></code>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params, error }) {
    let monster;
    try {
      monster = await $content('monster', params.slug).fetch()
    } catch (e) {
      return error({ message: 'Monster ' + params.slug + ' not found' })
    }
    
    return {monster: monster, rawData: JSON.stringify(monster, null, 4)};
  },
  head () {
    return {
      title: this.monster.name,
      description: this.monster.name
    }
  }
}
</script>