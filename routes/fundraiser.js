import express from "express";
const router = express.Router();

// 資料庫使用，使用原本的mysql2 + sql
import db from "../utils/connect-mysqls.js";

// 修改路由路徑，移除 fundraiser-list
router.get("/plane/:project", async (req, res) => {
  console.log(123);
  // res.json({red:1254})
  
  try {
    
    const projectId = req.params.project;
    const sql = `SELECT * FROM f_plan WHERE f_project_list=${projectId}`;
    const [rows] = await db.query(sql);
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({
      success: false,
      error: 'Database query failed'
    });
  }
});
router.get("/list/:project", async (req, res) => {
    const projectId = req.params.project;
  const sql =`SELECT * FROM f_project_list WHERE f_project_id=${projectId}`; //從第4筆開始取6筆資料
  const [rows, field] = await db.query(sql);
  // fields: 會拿到欄位相關的資訊, 通常不會用到
  res.json({ rows, field });
});
router.get("/kv/:project", async (req, res) => {
  const projectId = req.params.project;
const sql =`SELECT * FROM f_picture WHERE f_project_id=${projectId}`; //從第4筆開始取6筆資料
const [rows, field] = await db.query(sql);
// fields: 會拿到欄位相關的資訊, 通常不會用到
res.json({ rows, field });
});
router.get("/projectsNew", async (req, res) => {
  const sql = "SELECT * FROM f_project_list ORDER BY f_project_current DESC LIMIT 7"; 
  const [rows, field] = await db.query(sql);
  // fields: 會拿到欄位相關的資訊, 通常不會用到
  res.json({ rows, field });
});
router.get("/projectsRecommend", async (req, res) => {
  const sql = "SELECT * FROM f_project_list ORDER BY f_project_people DESC LIMIT 7"; 
  const [rows, field] = await db.query(sql);
  // fields: 會拿到欄位相關的資訊, 通常不會用到
  res.json({ rows, field });
});
router.get("/message", async (req, res) => {
  const sql = "SELECT * FROM f_message WHERE f_project_id=1"; //從第4筆開始取6筆資料
  const [rows, field] = await db.query(sql);
  // fields: 會拿到欄位相關的資訊, 通常不會用到
  res.json({ rows, field });
});

export default router;