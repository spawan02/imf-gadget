import express from "express";
import gadget from "./gadgetRoutes";
import userRouter from "./userRoutes"

const router = express.Router();

router.get("/", (_, res) => {
    res.json({
        message: "server is healthy",
    });
});


router.use("/gadgets", gadget);
router.use("/user", userRouter)

export default router;
