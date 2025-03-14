import express from "express"
import gadgetController from "../controllers/gadgetController"
import selfDestruct from "../controllers/selfDestructController"
import { userMiddleware } from "../middleware"

const router = express.Router()

router.get("/", gadgetController.getGadgets)
router.post("/", userMiddleware,gadgetController.createGadget)
router.patch("/:id",userMiddleware, gadgetController.updateGadget)
router.delete('/:id', userMiddleware,gadgetController.deleteGadget)
router.post('/:id/self-destruct', userMiddleware,selfDestruct)



export default router;