<script>
import { unkebabify } from '../helpers'

export default {
  name: 'recipe-title',
  props: ['recipeName', 'filters'],

  data() {
    return {
      subTitle: ''
    }
  },

  computed: {
    title() {
      if (this.filters.food) return `${this.subTitle} - Food`;
      if (this.filters.author) return `${this.subTitle} - Author`;
      return `Feed - ${this.recipeName}`;
    }
  },

  methods: {
    setSubTitle(payload) {
      this.subTitle = unkebabify(payload)
    }
  },

  watch: {
    title () {
      document.title = this.title;
    },
    '$route.params' (params) {
      if (params.food) this.setSubTitle(params.food)
      if (params.author) this.setSubTitle(params.author)
    }
  },

  created () {
    document.title = this.title;
  },

  beforeMount() {
    let params = this.$route.params;
    if (params.food) this.setSubTitle(params.food)
    if (params.author) this.setSubTitle(params.author)
  },

  render() {
  }
}
</script>
