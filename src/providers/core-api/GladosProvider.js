import coreApiClient from "@/providers/core-api/CoreApi"

export default {
  getEntities() {
    return coreApiClient.sendRequest("get", "/entities", {})
  },
  deleteEntity(entity_uuid) {
    return coreApiClient.sendRequest("delete", "/entities/" + entity_uuid, {})
  },
  createEntity(data) {
    return coreApiClient.sendRequest("post", "/entities", data)
  },
  updateEntity(entity_uuid, data) {
    return coreApiClient.sendRequest("put", "/entities/" + entity_uuid, data)
  },
  getRooms() {
    return coreApiClient.sendRequest("get", "/rooms", {})
  },
  deleteRoom(room_uuid) {
    return coreApiClient.sendRequest("delete", "/rooms/" + room_uuid, {})
  },
  createRoom(data) {
    return coreApiClient.sendRequest("post", "/rooms", data)
  },
  updateRoom(room_uuid, data) {
    return coreApiClient.sendRequest("put", "/rooms/" + room_uuid, data)
  },
  getTTS() {
    return coreApiClient.sendRequest("get", "/getTTS", {})
  },

}