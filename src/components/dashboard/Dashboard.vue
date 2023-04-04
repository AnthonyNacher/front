<template>
  <div class="flex flex-col gap-5">
    <span class="text-orange-600 font-bold text-2xl text-center">Tableau de bord APERTURE SCIENCE</span>
    <table class="table-auto">
      <thead>
        <tr>
          <th>Nom de l'appareil</th>
          <th>Type</th>
          <th>Valeur</th>
          <th>Statut</th>
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
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import coreApi from "@/providers/core-api"

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
        "sensor" : "détecteur",
        "light" : "lumière",
        "switch" : "interrupteur",
        "multimedia" : "multimédia",
        "air_conditioner" : "climatiseur",
      }
      if (valueToTranslate in translations)
        return translations[valueToTranslate].toUpperCase()
      else
        return valueToTranslate.toUpperCase()
    }
  
  }
}
</script>

<style scoped>

</style>