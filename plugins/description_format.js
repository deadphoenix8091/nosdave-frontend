import Vue from 'vue'
Vue.filter('description', function (string) {
  return string.replaceAll('[n]', "\n");
})