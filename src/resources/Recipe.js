import config from '../config'

export default {
  recipe() {
    return {
      path: '/recipe.json',
      resolve: (response, mappers) => {
        let recipe = response.results[0]
        return mappers.merge({
          title: config.RECIPE_TITLE || recipe.title,
          labels: {
            food: recipe.food_label,
            author: recipe.author_label
          }
        })
      }
    }
  }
}
