<template>
  <transition name="food">
    <article v-if="food" class="food">
      <header class="food__header">
        <h2 class="food__title">{{ title }}</h2>

        <h3 class="food__meta">by <router-link class="food__author"
          :to="`/by/${kebabify(author)}`">{{ author }}</router-link>
          <span class="food__sep"></span>
          <time>{{ prettyDate(published) }}</time>
        </h3>

        <blockquote class="food__subtitle">{{ description }}</blockquote>
      </header>

      <section class="food__body rte" v-html="content"></section>

      <footer class="food__footer">
        <vue-disqus v-if="commentsReady" shortname="vue-recipe-demo"
          :key="food" :identifier="food" :url="`https://vue-recipe-demo.netlify.com/read/${food}`"/>
      </footer>
    </article>
  </transition>
</template>

<script>
import VueDisqus from 'vue-disqus/VueDisqus'
import { kebabify, prettyDate } from '../helpers'

export default {
  name: 'recipe-food',
  resource: 'RecipeFood',
  components: { VueDisqus },
  props: { food: String },

  data() {
    return {
      title: '',
      author: '',
      content: '',
      published: '',
      description: '',
      commentsReady: false
    }
  },

  watch: {
    food(to, from) {
      if (to === from || !this.food) return;

      this.commentsReady = false
      this.$getResource('food', to)
        .then(this.showComments)
    }
  },

  methods: {
    kebabify,
    prettyDate,
    showComments() {
      setTimeout(() => {
        this.commentsReady = true
      }, 1000)
    }
  },

  beforeMount() {
    if (!this.food) return;
    this.$getResource('food', this.food)
      .then(this.showComments)
  }
}
</script>
