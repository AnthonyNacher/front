<template> 
  <div>
    <!-- ICONS FROM https://heroicons.com/ -->
    <!-- ADD FORM- START -->
    <div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="isHidden=!isHidden">
        <p v-if="isHidden">+</p> <p v-if="!isHidden">-</p> Ajouter une nouvelle pièce
      </button>
      <div v-if="!isHidden">
        <div class="w-1/2">
          <div class="grid gap-2 mb-2 md:grid-cols-2">        <label
                                                                for="name"
                                                                class="block mb-2 text-sm font-medium">Nom de la pièce</label>
            <input
              class="bg-blue-50 border border-blue-500 text-blue-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-1 dark:bg-blue-500 dark:border-blue-600 dark:placeholder-blue-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
              type="text"
              required
              name="name"
              v-model="newRoomName">
            <div class="flex justify-center items-center">
              <button
                @click="createRoom"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ajouter la pièce<svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="blue"
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
  name: "RoomCreation",
  data() {
    return { 
      isHidden: true,
      newRoomName: ""
    }
  }, 
  methods: {
    
    createRoom() {
      this.isError = false
      this.isLoading = true
      let form_data= { name: this.newRoomName }

      coreApi.glados.createRoom(form_data)
        .then(() => {
          this.newEntityName = ""
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
            this.$parent.addNewMessage("Echec de la création", "Une erreur est survenue lors de la création de la nouvelle pièce.", "alert")
          }
          else 
          {
            this.$parent.addNewMessage("Création réussie", "La nouvelle pièce a bien été ajoutée.", "success")
          }
        })
    }
    
  }
}
</script>
