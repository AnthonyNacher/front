<template>
  <div class="flex flex-col gap-5">
    
    <EntityArray />
    <span class="text-orange-600 font-bold text-2xl text-center">Tableau de bord APERTURE SCIENCE</span>
    <table class="table-auto">
      <thead>
        <tr>
          <th>Nom de l'appareil</th>
          <th>Type</th>
          <th>Valeur</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-center"
          v-for="entity in entities"
          :key="entity.id">
          <td>
            {{ entity.name.toUpperCase() }}
          </td>
          <td>
            {{ getFrenchTypeDisplay(entity.type) }}
          </td>
          <td>
            {{ Number(entity.value).toLocaleString() }} €
          </td> 
          <td>
            <!-- BLUE SLIDER - ON -->
            <div v-if="entity.status=='on'">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  checked 
                  disabled>
                <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              
              </label>
            </div>
            
            <!-- GREY SLIDER - OFF -->
            <div v-else-if="entity.status=='off'">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  disabled>
                <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              
              </label>
            </div>
            
            <!-- RED SLIDER - UNAVAVAILBLE -->
            <div v-else>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  disabled>
                <div class="w-6 h-6 bg-red-200 rounded-full peer dark:bg-red-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              
              </label>
            </div>
          </td>
          <td>
            <div>
              <button v-on:click="deleteEntity(entity.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6">
                  <path
                    fill-rule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import coreApi from "@/providers/core-api"
import EntityArray from "@/components/forms/EntityArray.vue"

export default {
  name: "Dashboard",
  created() {
    this.getEntities()
  },
  data() {
    return {
      entities: [],
      isLoading: false,
      isError: false 
    }
  },
  components: { EntityArray },
  methods: { 
    getEntities() {
      this.isLoading = true

      coreApi.glados.getEntities()
        .then((entities) => {
          this.entities = entities
        })
        .catch((error) => {
          console.error(error)
          this.isError = true
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    getFrenchTypeDisplay(valueToTranslate)
    {
      let translations = {
        "sensor": "détecteur",
        "light": "lumière",
        "switch": "interrupteur",
        "multimedia": "multimédia",
        "air_conditioner": "climatiseur",
      }
      if (valueToTranslate in translations)
        return translations[valueToTranslate].toUpperCase()
      else
        return valueToTranslate.toUpperCase()
    }, 
    deleteEntity(entity_uuid){
      this.isLoading = true

      coreApi.glados.deleteEntity(entity_uuid)
        .then(() => {
          
        })
        .catch((error) => {
          console.error(error)
          this.isError = true
        })
        .finally(() => {
          this.isLoading = false
          // maybe a bit slow to do that, deleting the selected object would be better (if response is successfull, such as 204 for example)
          this.getEntities()
        })
    }
  }
}
</script>

<style scoped>

</style>