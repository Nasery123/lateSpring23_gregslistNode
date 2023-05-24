import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class HousesService {
    async getHouseById(houseId) {
        const house = await dbContext.Houses.findById(houseId)
        if (!house) {
            throw new BadRequest("could not find house by id")
        }
        return house

    }
    async getHouses(query) {
        const houses = await dbContext.Houses.find(query)
        return houses
    }
    async createHouse(houseData) {
        const newHouse = await dbContext.Houses.create(houseData)
        return newHouse
    }
    async editHouse(houseData, houseId, userId) {
        const originalHouse = await this.getHouseById(houseId)
        if (originalHouse.creatorId != userId) {
            throw new Forbidden("edit needs permission")
        }
        originalHouse.yearMake = houseData.yearMake || originalHouse.yearMake
        originalHouse.bedrooms = houseData.bedrooms || originalHouse.bedrooms
        originalHouse.bathrooms = houseData.bathrooms || originalHouse.bathrooms
        originalHouse.price = houseData.price || originalHouse.price
        originalHouse.description = houseData.description || originalHouse.description
        await originalHouse.save()
        return originalHouse

    }
}
export const housesService = new HousesService()
