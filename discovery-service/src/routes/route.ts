import { Router } from "express";
import {
  createNodeTypeTables,
  syncAllNodeData,
  getDiscoveryStats,
} from "../controllers/discoveryController";

const router = Router();

// Discovery istatistikleri
router.get("/stats", getDiscoveryStats);

// 1. Adım: Node türlerine göre tablolar oluştur
router.post("/create-tables", createNodeTypeTables);

// 2. Adım: Tüm node verilerini senkronize et (3 aşamalı süreç)
router.post("/sync-all", syncAllNodeData);

export default router;
