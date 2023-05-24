import { Auth0Provider } from "@bcwdev/auth0provider";
import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";


export class HousesController extends BaseController {
    constructor() {
        super('api/houses')
        this.router
            .get('', this.getHouses)
            .get('/:houseId', this.getHouseById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createHouse)
            .put('/:houseId', this.editHouse)
    }

    async createHouse(req, res, next) {
        try {
            const houseData = req.body
            houseData.creatorId = req.userInfo.id
            const newHouse = await housesService.createHouse(houseData)
            res.send(newHouse)
        } catch (error) {
            next(error)

        }

    }



    async getHouses(req, res, next) {
        try {
            const query = req.query
            const houses = await housesService.getHouses(query)
            return res.send(houses)
        } catch (error) {
            next(error)
        }
    }
    async editHouse(req, res, next) {
        try {
            const houseData = req.body
            const houseId = req.params.houseId
            const userId = req.userInfo.id
            const editHouse = await housesService.editHouse(houseData, houseId, userId)
            res.send(editHouse)

        } catch (error) {
            next(error)
        }
    }
    async getHouseById(req, res, next) {
        try {
            const houseId = req.params.houseId
            const house = await housesService.getHouseById(houseId)
            return res.send(house)
        } catch (error) {
            next(error)
        }
    }
}
