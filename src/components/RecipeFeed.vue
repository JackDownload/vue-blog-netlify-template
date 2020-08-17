<template>
  <transition-group tag="ul" :name="transition"  class="recipe__feed">
    <li v-for="food in feed" class="preview" :key="food.id">
      <figure class="preview__figure" :class="figureClass" :style="getBgImg(food.image)">
        <transition name="v--fade">
          <figcaption v-if="!reading || $device.phone" class="preview__details">
            <router-link class="preview__title"
              :to="`/read/${food.id}`"
              @click.native="scrollTo(0, 220, scrollDelay)">
              {{ food.title }}
            </router-link>

            <div class="preview__meta">
              <time class="preview__published">
                {{ prettyDate(food.published) }}
              </time>

              <router-link class="preview__author"
                :to="`/by/${kebabify(food.author)}`"
                @click.native="scrollTo(0, 220, scrollDelay)">
                {{ food.author }}
              </router-link>
            </div>
          </figcaption>
        </transition>
      </figure>
    </li>
  </transition-group>
</template>

<script>
import { scrollTo, kebabify, prettyDate } from '../helpers'

export default {
  name: 'recipe-feed',
  resource: 'RecipeFeed',

  props: {
    filters: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      foods: [],
      transition: 'preview-appear'
    }
  },

  computed: {
    reading() { return this.filters.food },
    scrollDelay() { return (this.$device.phone) ? 0 : 560 },
    figureClass() {
      return { 'preview__figure--mobile': this.$device.phone && this.reading }
    },
    feed() {
      const filterBy = {
        food: (filter, { id }) => filter === id,
        author: (filter, { author }) => filter === this.kebabify(author)
      }

      if (!Object.keys(this.filters).length) return this.foods

      return this.foods.filter(food => {
        return Object.keys(this.filters).every(filter => {
          return filterBy[filter](this.filters[filter], food)
        })
      })
    }
  },

  methods: {
    scrollTo,
    kebabify,
    prettyDate,
    getBgImg(src) {
      return { backgroundImage: `url(${src})` }
    },
    stackFoods(foods) {
      let interval
      const stack = () => {
        this.foods.push(foods.shift())

        if (!foods.length) {
          this.transition = 'preview'
          clearInterval(interval)
        }
      }

      interval = setInterval(stack, 125)
    }
  },

  beforeMount() {
    this.$getResource('feed')
      .then(foods => {
        if (!Object.keys(this.filters).length) {
          this.stackFoods(foods)
        } else {
          this.foods = foods
          this.transition = 'preview'
        }
      })
  }
}
</script>
