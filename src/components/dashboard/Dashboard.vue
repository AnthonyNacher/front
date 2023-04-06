<template>
  <div class="flex flex-col gap-5">
    <div
      v-for="message of messages"
      v-bind:key="message">

      <div
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
        v-if="message.type === 'alert'">
        <strong class="font-bold"> {{ message.header }}</strong>
        <span class="block sm:inline"> {{ message.content }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            class="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            @click="deleteMessage(message.id)">
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
      <div
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
        role="success"
        v-else-if="message.type === 'success'">
        <strong class="font-bold"> {{ message.header }}</strong>
        <span class="block sm:inline"> {{ message.content }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            class="fill-current h-6 w-6 text-green-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            @click="deleteMessage(message.id)">
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
      <div
        class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative"
        role="information"
        v-else-if="message.type === 'information'">

        <strong class="font-bold"> {{ message.header }}</strong>
        <span class="block sm:inline"> {{ message.content }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            class="fill-current h-6 w-6 text-blue-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            @click="deleteMessage(message.id)">
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
    </div>
    <EntityCreation />
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
            <div v-if="entity.status == 'on'">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  checked
                  disabled>
                <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                </div>

              </label>
            </div>

            <!-- GREY SLIDER - OFF -->
            <div v-else-if="entity.status == 'off'">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  disabled>
                <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                </div>

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
                <div class="w-6 h-6 bg-red-200 rounded-full peer dark:bg-red-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                </div>

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
import EntityCreation from "@/components/forms/EntityCreation.vue"

export default {
  name: "Dashboard",
  created() {
    this.getEntities()
  },
  data() {
    return {
      entities: [],
      isLoading: false,
      isError: false,
      messages: {},
      message_count: 0
    }
  },
  components: { EntityCreation },
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
    getFrenchTypeDisplay(valueToTranslate) {
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
    deleteEntity(entity_uuid) {
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
          if (this.isError)
          {
            this.addNewMessage("Echec de la suppression", "Une erreur est survenue lors de la suppression.", "alert")
          }
          else 
          {
            this.addNewMessage("Suppression réussie", "La suppression a bien été faite.", "success")
          }
        })
    },
    addNewMessage(header, content, type) {
      this.messages[this.message_count] = {
        "header": header,
        "content": content,
        "type": type,
        "id": this.message_count
      }
      this.message_count++
    },
    deleteMessage(message_id) {
      delete this.messages[message_id]
    }
  }
}
</script>

<style scoped></style>