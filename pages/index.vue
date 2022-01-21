<template>
  <div class="pt-3">
    <h2>Dave Database presents nosdave.de</h2>
    <p>Free unofficial online database for the game "NosTale" © 2007 Entwell Co., Ltd. Published by Gameforge 4D GmbH.</p>
    <p>All data is taken from the official steam client of the game and automatically processed. Images and text are property of Gameforge 4D GmbH and are only to be used for informational purposes while playing the game.</p>

    <div class="row">
      <nuxt-link to="/items" class="col-xl-3 col-md-6">
          <div class="card border-left-primary shadow">
              <div class="card-body">
                  <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-primary text-uppercase">
                              Item database</div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800">{{ itemCount | thousands }} items</div>
                      </div>
                      <div class="col-auto">
                          <img style="width: 4em; height: 4em" src="https://ik.imagekit.io/flyffdb/icon/item/syssysscrsmepro.png"/>
                      </div>
                  </div>
              </div>
          </div>
      </nuxt-link>

      <nuxt-link to="/quests" class="col-xl-3 col-md-6">
          <div class="card border-left-primary shadow">
              <div class="card-body">
                  <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-primary text-uppercase">
                              Quest Database</div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800">{{ questCount }} quests</div>
                      </div>
                      <div class="col-auto">
                          <i class="fas fa-calendar fa-2x text-gray-300"></i>
                      </div>
                  </div>
              </div>
          </div>
      </nuxt-link>
      <!--
      <nuxt-link to="/dialogs" class="col-xl-3 col-md-6">
          <div class="card border-left-primary shadow">
              <div class="card-body">
                  <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-primary text-uppercase">
                              Dialog Database</div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800">{{ dialogCount }} dialogs</div>
                      </div>
                      <div class="col-auto">
                          <i class="fas fa-calendar fa-2x text-gray-300"></i>
                      </div>
                  </div>
              </div>
          </div>
      </nuxt-link>
      -->
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, route }) {
    let itemCount = (await $content('item').only([]).fetch()).length;
    let questCount = (await $content('quest').only([]).fetch()).length;
    //let dialogCount = (await $content('npctalk').only([]).fetch()).length;
    return {
      itemCount,
      questCount,
      //dialogCount
    }
  }
}
</script>