import Vue from 'vue'
import Router from 'vue-router'
import Blog from '../components'
import RecipeList from '../components'
import RecipeSingle from '../components'
import RecipeForm from '../components'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [{
    path: '/',
    name: 'feed',
    component: Blog
  }, {
    path: '/by/:author',
    name: 'author',
    props: true,
    component: Blog
  }, {
    path: '/read/:post',
    name: 'post',
    props: true,
    component: Blog
  }, {
    path: '/recipes',
    name: 'recipes',
    component: RecipeList
  }, {
    path: '/edit/:recipe',
    name: 'recipe',
    props: true,
    component: RecipeForm
  }, {
    path: '/recipes/:recipe',
    name: 'recipe',
    props: true,
    component: RecipeSingle
  }]
})
