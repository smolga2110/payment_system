import { Router } from "express";
import { getWallets, getWalletByID, getWalletByEmail, createWallet, changeWalletAmount, deleteWallet } from "../controllers/walletController";

const router = Router()

router.get("/", getWallets)
router.get("/:id", getWalletByID)
router.get("/:email", getWalletByEmail)
router.post("/", createWallet)
router.put("/:id", changeWalletAmount)
router.delete("/:id", deleteWallet)

export default router