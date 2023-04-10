<template> 
  <div>
    <!-- ICONS FROM https://heroicons.com/ -->
    <!-- ADD FORM- START -->
    <div>
      <button
        class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        @click="isHidden=!isHidden">
        <p v-if="isHidden">+</p> <p v-if="!isHidden">-</p> Ajouter un nouvel appareil 
      </button>
      <div v-if="!isHidden">
        <div class="w-1/2">
          <div class="grid gap-2 mb-2 md:grid-cols-2">        <label
                                                                for="name"
                                                                class="block mb-2 text-sm font-medium">Nom de l'appareil</label>
            <input
              class="bg-orange-50 border border-orange-500 text-orange-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-1 dark:bg-orange-500 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
              type="text"
              required
              name="name"
              v-model="newEntityName">
            <label
              for="status"
              class="block mb-2 text-sm font-medium">Etat de l'appareil</label>
            <select
              required
              class="bg-orange-50 border border-orange-500 text-orange-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-1 dark:bg-orange-500 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
              name="status"
              v-model="newEntityStatus">
              <option
                v-for="option in status_options"
                :value="option.value"
                :key="option">{{ option.text }}</option>
            </select>
            <label
              for="type"
              class="block mb-2 text-sm font-medium">Type d'appareil</label>
            <select
              required
              class="bg-orange-50 border border-orange-500 text-orange-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-1 dark:bg-orange-500 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
              name="type"
              v-model="newEntityType">
              <option
                v-for="option in type_options"
                :value="option.value"
                :key="option">{{ option.text }}</option>
            </select>

            
            <label
              for="value"
              class="block mb-2 text-sm font-medium">Valeur de l'appareil</label>
            <input
              class="bg-orange-50 border border-orange-500 text-orange-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-1 dark:bg-orange-500 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
              type="number"
              name="value"
              v-model="newEntityValue">
            <label
              for="room"
              class="block mb-2 text-sm font-medium">Pièce de l'appareil</label>
            <select
              required
              class="bg-orange-50 border border-orange-500 text-orange-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-1 dark:bg-orange-500 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
              name="room"
              v-model="newEntityRoom">
              <!-- Find a better way to do that, that's awful -->
              <option
                value="00000000-0000-0000-0000-000000000001"
                selected>Aucune pièce attribuée</option>
              <option
                v-for="room in rooms"
                :value="room.id"
                :key="room.id">{{ room.name }}</option>
            </select>
            <div class="flex justify-center items-center">
              <button
                @click="createEntity"
                class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Ajouter l'appareil<svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="orange"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-12 h-12">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ADD FORM- END -->
  </div>
</template>
<script>
import coreApi from "@/providers/core-api"

export default {
  name: "EntityCreation",
  created() {
    this.getRooms()
  },
  data() {
    return { 
      isHidden: true,
      rooms: [],
      newEntityName: "",
      newEntityStatus: "",
      newEntityType: "",
      newEntityValue: "",
      newEntityRoom: "",
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
  methods: {
    
    createEntity() {
      this.isLoading = true
      this.isError = false
      let form_data= {
        name: this.newEntityName,
        status: this.newEntityStatus,
        type: this.newEntityType,
        value: this.newEntityValue,
        room: this.newEntityRoom
      }

      coreApi.glados.createEntity(form_data)
        .then(() => {
          this.$parent.getEntities()
          this.newEntityName = ""
          this.newEntityStatus = ""
          this.newEntityType = ""
          this.newEntityValue = ""
          this.newEntityRoom = ""
          this.isHidden = true

        })
        .catch((error) => {
          console.error(error)
          this.isError = true
        })
        .finally(() => {
          this.isLoading = false
          if (this.isError)
          {
            this.$parent.addNewMessage("Echec de la création", "Une erreur est survenue lors de la création.", "alert")
          }
          else 
          {
            this.$parent.addNewMessage("Création réussie", "L'appareil a bien été ajouté.", "success")
          }
        })
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
    
  }
}
</script>
