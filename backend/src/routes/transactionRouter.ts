import { Router } from "express";
import { 
    transferAmount, 
    getTransactions, 
    getTransactionById,
    getUserTransactions 
} from "../controllers/transactionController";

const router = Router();

router.post("/transfer", transferAmount);
router.get("/", getTransactions);
router.get("/user/:email", getUserTransactions);
router.get("/:id", getTransactionById);

export default router;