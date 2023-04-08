<template>
  <div class="flex flex-col gap-5">
    <div
      v-for="message of messages"
      v-bind:key="message">

      <div
        v-bind:class="{
          'bg-red-100 border-red-400 text-red-700': message.type === 'alert',
          'bg-green-100 border-green-400 text-green-700': message.type === 'success',
          'bg-blue-100 border-blue-400 text-blue-700': message.type === 'information'
        }"
        class="px-4 py-3 rounded relative border">
        <div><strong class="font-bold"> {{ message.header }}</strong>
          <div class="block"> {{ message.content }}</div></div>
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
    </div>
    <EntityCreation />
    <RoomCreation />
    <span class="text-orange-600 font-bold text-2xl text-center">Tableau de bord APERTURE SCIENCE</span>
    <table class="table-auto">
      <thead>
        <tr>
          <th>Pièce de l'appareil</th>
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
            
            <div v-if="entity.editable">
              <select
                required
                name="room"
                v-model="entity.room">
                <option
                  v-for="room in rooms"
                  :value="room.id"
                  :key="room.id"
                  :selected="room.id === entity.room">{{ room.name }}</option>
              </select>
            </div>
            <div v-else>
              {{ getRoomDisplay(entity.room) }}
            </div>
            
          </td>
          <td>
            <div v-if="entity.editable">
              <input
                type="text"
                v-model="entity.name">
            </div>
            <div v-else>
              {{ entity.name.toUpperCase() }}
            </div>
            
          </td>
          <td>
            
            <div v-if="entity.editable">
              <select
                required
                name="type"
                v-model="entity.type">
                <option
                  v-for="option in type_options"
                  :value="option.value"
                  :key="option"
                  :selected="option.value === entity.type">{{ option.text }}</option>
              </select>
            </div>
            <div v-else>
              {{ getFrenchTypeDisplay(entity.type) }}
            </div>
            
          </td>
          <td>
            
            <div v-if="entity.editable">
              <input
                type="text"
                v-model="entity.value">
            </div>
            <div v-else>
              {{ Number(entity.value).toLocaleString() }} €
            </div>
            
          </td>
          <td>
            <div v-if="entity.editable">
              <select
                required
                name="status"
                v-model="entity.status">
                <option
                  v-for="option in status_options"
                  :value="option.value"
                  :key="option"
                  :selected="option.value === entity.status">{{  option.text }}</option>
              </select>
            </div>
            <div v-else>
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
            </div>
          </td>
          <td>
            <div>
              <button
                @click="prepareUpdateEntity(entity)"
                v-if="!entity.editable & !this.is_editing_line">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="orange"
                  class="w-6 h-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>

              </button>
              <button
                v-if="entity.editable"
                @click="updateEntity(entity)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="green"
                  class="w-6 h-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </button>
              <button 
                v-if="entity.editable" 
                @click="cancelUpdateEntity(entity)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="red"
                  class="w-6 h-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>

              </button>
              <button v-on:click="deleteEntity(entity.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="orange"
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
    <button
      class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
      @click="speakSummarizedEntities()">Je préfère entendre que voir.</button>
  </div>
</template>

<script>
import coreApi from "@/providers/core-api"
import EntityCreation from "@/components/forms/EntityCreation.vue"
import RoomCreation from "@/components/forms/RoomCreation.vue"

export default {
  name: "Dashboard",
  created() {
    this.getEntities()
    this.getRooms()
    this.isSpeaking = false
    this.speechSynthesis = new SpeechSynthesisUtterance()
    this.speechSynthesis.lang = "fr-FR"
    this.speechSynthesis.text = ""
    this.speechSynthesis.volume = 0.3
    this.speechSynthesis.onend = () => {
      this.isSpeaking = false
    }
  },
  data() {
    return {
      entities: [],
      rooms: [],
      isLoading: false,
      isError: false,
      messages: {},
      message_count: 0,
      is_editing_line: false,
      type_options: [
        {
          value: "sensor",
          text: "Détecteur"
        },
        {
          value: "light",
          text: "Lumière"
        },
        {
          value: "switch",
          text: "Interrupteur"
        },
        {
          value: "multimedia",
          text: "Multimédia"
        },
        {
          value: "air_conditioner",
          text: "Climatiseur"
        },
      ],
      status_options: [
        {
          value: "on",
          text: "Allumé"
        },
        {
          value: "off",
          text: "Éteint"
        },
        {
          value: "unavailable",
          text: "Indisponible"
        },
      ],
    }
  },
  components: {
    EntityCreation,
    RoomCreation 
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
    speakSummarizedEntities(){
      if (!this.isSpeaking)
      {
        coreApi.glados.getTTS()
          .then((data) => {
            this.speechSynthesis.text = data.text
            this.isSpeaking = true
            window.speechSynthesis.speak(this.speechSynthesis)
          })
          .catch((error) => {
            console.error(error)
            this.isError = true
          })
          .finally(() => {
          })
      }
    },
    getRooms() {
      this.isLoading = true

      coreApi.glados.getRooms()
        .then((rooms) => {
          this.rooms = rooms
        })
        .catch((error) => {
          console.error(error)
          this.isError = true
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    getRoomDisplay(valueToTranslate){
      for (let room of this.rooms)
      {
        if (room.id == valueToTranslate)
        {
          return room.name.toUpperCase()
        }
      }
      return "Aucune pièce attribuée"
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
    updateEntity(entity) {
      coreApi.glados.updateEntity(entity.id, entity)
        .then(() => {
          this.getEntities()
        })
        .catch((error) => {
          console.error(error)
          this.isError = true
        })
        .finally(() => {
          this.isLoading = false
          entity.editable = false
          this.is_editing_line = false
          if (this.isError)
          {
            this.addNewMessage("Echec de la mise à jour", "Une erreur est survenue lors de la mise à jour.", "alert")
          }
          else 
          {
            this.addNewMessage("Mise à jour réussie", "L'appareil a bien été mis à jour.", "success")
          }
        })
    },
    prepareUpdateEntity(entity)
    {      
      entity.editable = true
      this.is_editing_line = true
    },
    cancelUpdateEntity(entity)
    {
      entity.editable = false
      this.getEntities()
      this.is_editing_line = false
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
          
          if (this.isError) {
            this.addNewMessage("Echec de la suppression", "Une erreur est survenue lors de la suppression.", "alert")
          }
          else {
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