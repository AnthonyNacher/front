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
    }
}