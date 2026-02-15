import { Router } from "express";
import { getUser, createUser, getUserByID, updateUser, deleteUser } from "../controllers/UserController";

const router = Router()

router.get("/", getUser)
router.get("/:id", getUserByID)
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

export default router