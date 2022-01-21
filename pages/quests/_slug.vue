<template>
  <div class="pt-3">
    <div class="row">
      <div class="col-sm-6">
        <h1 class="m-0">{{ quest.raw_title }}
        </h1>
      </div><!-- /.col -->
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><nuxt-link to="/">Home</nuxt-link></li>
          <li class="breadcrumb-item"><nuxt-link to="/quests">Quests</nuxt-link></li>
          <li class="breadcrumb-item active">Detail</li>
        </ol>
      </div><!-- /.col -->
    </div>
    <div class="row">
      <div class="col-xl-3 col-md-4 mb-1">
        <div class="card shadow">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="card-title">Quest Details</h6>
            </div>
            
            <div class="card-body">
              <table class="table table-striped borderless">
                <thead>
                  <tr><th colspan="2">Data</th></tr>
                </thead>
                <tbody>
                  <tr><td>Level:</td><td>{{ quest.level[0] }} - {{ quest.level[1] }}</td></tr>
                </tbody> 
              </table>
            </div>
        </div>
      </div>
      <div class="col-xl-9 col-md-8">
        <h2 v-if="quest.subquests.length">
          Quest part {{ quest.questChainRootDistance + 1 }} of {{ quest.subquests.length }} quests in this chain.
        </h2>
        <template v-if="quest.prevQuest || quest.nextQuest">
          <div class="row">
            <div class="col-6">
              <template v-if="quest.prevQuest">
                <h2>Previous Quest</h2>
                <QuestReference :for="quest.prevQuest" :key="quest.prevQuest.id"/>
              </template>
            </div>
            
            <div class="col-6">
              <template v-if="quest.nextQuest">
                <h2>Next Quest</h2>
                <QuestReference :for="quest.nextQuest" :key="quest.nextQuest.id"/>
              </template>
            </div>
          </div>
        </template>

        <h2>Description</h2>
        <template v-if="!quest.desc">
          <div class="card bg-info text-white shadow">
            <div class="card-body">
              This quest has no description!
            </div>
          </div>
        </template>
        <template v-if="quest.desc">
          <div class="card bg-info text-white shadow">
            <div class="card-body">
              {{ quest.desc }}
            </div>
          </div>
        </template>

        <h2>Complete Conditions</h2>   
        <ul>
          <template v-if="quest.goalType == 19">
            <!-- not sure weather or not this is correct, for now to assume goalType 19 == visit target -->
            <li>Gehe zu der markierten Position auf der Karte:
              <nuxt-link :to="`/map/map_${quest.targetMap.internalId}`" :key="quest.targetMap.id">
                {{ quest.targetMap.name }}
              </nuxt-link> [{{ quest.target[0] }}/{{ quest.target[1] }}]
            </li>
          </template>
          <template v-else-if="quest.collectItem">
            <li>Sammle {{ quest.data[1] }}x 
              <nuxt-link :to="`/items/${quest.collectItem.id}`" :key="quest.collectItem.id">
                {{ quest.collectItem.name }}
              </nuxt-link>
            </li>
          </template>
          <template v-else-if="quest.huntMonster">
            <li>
              Jage {{ quest.data[1] }}x 
              <nuxt-link :to="`/monsters/${quest.huntMonster.id}`" :key="quest.huntMonster.id">
                {{ quest.huntMonster.name }}
              </nuxt-link>
            </li>
          </template>
          <template v-else-if="quest.talkToNpc">
            <li>
              Gespräch mit  
              <nuxt-link :to="`/monsters/${quest.talkToNpc.id}`" :key="quest.talkToNpc.id">
                {{ quest.talkToNpc.name }}
              </nuxt-link>
            </li>
          </template>
            <li>
              debug<br/>
              <pre>{{ rawData }}</pre>
            </li>
           
        </ul>

        <h2 v-if="quest.talk.length">Dialogs</h2>
        <template v-for="currentDialog in quest.talk">
          <card :key="currentDialog.id">
            <div>
              <p v-for="currentDialogText in currentDialog.dialog" :key="currentDialogText">
                {{ currentDialogText }}
              </p>
            </div>
          </card>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { Pagination } from 'element-ui';
export default {
  components: {
    Pagination
  },
  async asyncData ({ $content, params, error }) {
    let quest;
    try {
      quest = await $content('quest', params.slug).fetch()
    } catch (e) {
      return error({ message: 'Quest ' + params.slug + ' not found' })
    }

    if (quest.length == 1) {
      quest = quest[0];
    }

    quest.talk = quest.talk.filter((el, idx) => el != "-1").map((el) => parseInt(el));

    if (quest.questChainRoot > 0) {
      //this is a quest chain start quest
      let subquests = await $content('quest').where({ questChainRoot: quest.questChainRoot }).fetch();
      //subquests = subquests.filter((el, idx) => (el.prevQuest * 1) != quest.internalId);
      subquests.sort(function(a, b) {
          return a.level[0] - b.level[0];
      });
      quest.subquests = subquests;
    } else {
      quest.subquests = [];
    }

    //new exporter does not export npctalk correctly yet so skip this
    if (quest.talk.length > 0 && false) {
      let npcTalks = await $content('npctalk', { deep: true }).fetch();

      quest.talk = quest.talk.map((currentTalkReference, idx) => {
        let filteredDialogs = npcTalks.filter((el, index) => {
          if (el.hasOwnProperty('referenceIds')) {
            if (el.referenceIds.indexOf(currentTalkReference) >= 0) {
              return true;
            }
          }

          return false;
        });

        if (filteredDialogs.length == 1) {
          return filteredDialogs[0];
        } else {
          return currentTalkReference;
        }
      });

      quest.talk = quest.talk.filter((el) => el != el*1);
    }
    
    if (quest.link) {
      quest.link = quest.link * 1;

      let nextQuest = await $content('quest').where({ internalId: quest.link }).fetch();
      if (nextQuest.length == 1) {
        quest.nextQuest = nextQuest[0];
      } else {
        quest.nextQuest = null;
      }
    } else {
      quest.nextQuest = null;
    }
    //fix questChainPrev;
    if (quest.questChainPrev) {
      if (quest.questChainPrev == -1 || quest.questChainPrev == quest.internalId) {
          quest.prevQuest = null;
      } else {
        quest.questChainPrev = quest.questChainPrev * 1;

        let prevQuest = await $content('quest').where({ internalId: quest.questChainPrev }).fetch();
        if (prevQuest.length == 1) {
          quest.prevQuest = prevQuest[0];
        } else {
          quest.prevQuest = null;
        }
      }
    } else {
      quest.prevQuest = null;
    }

    let subQuestIndex = 1;
    let found = false;
    quest.subquests.forEach((el) => {
      if (found) return;
      if (el.internalId == quest.internalId) {
        found = true;
      }
      subQuestIndex++;
    });

    console.log(quest.data[0] * 1);
    if (quest.goalType == 2) { //Sammle
      let collectItem = await $content('item').where({ internalId: quest.data[0] * 1 }).fetch();
      if (collectItem.length == 1) {
        quest.collectItem = collectItem[0];
      } else {
        console.log(collectItem);
        quest.collectItem = null;
      }
    } else if (quest.goalType == 1) { // jage
      let huntMonster = await $content('monster').where({ internalId: quest.data[0] * 1 }).fetch();
      if (huntMonster.length == 1) {
        quest.huntMonster = huntMonster[0];
      } else {
        quest.huntMonster = null;
      }
    } else if (quest.goalType == 12) { // jage
    console.log("herelol");
      let talkToNpc = await $content('monster').where({ internalId: quest.data[0] * 1 }).fetch();
      console.log(talkToNpc);
      if (talkToNpc.length == 1) {
        quest.talkToNpc = talkToNpc[0];
      } else {
        quest.talkToNpc = null;
      }
    }

    return {
      quest: quest,
      listQuery: {
        page: subQuestIndex,
        limit: 1
      },
      rawData: JSON.stringify(quest, null, 4)
    };
  },
  head () {
    return {
      title: this.quest.raw_title,
      description: this.quest.desc
    }
  },
  methods : {
    setPage (page) {
      let newUrl = "/quests/" + this.quest.subquests[page - 1].id;
      this.$router.replace(newUrl);
    }
  }
}
</script>