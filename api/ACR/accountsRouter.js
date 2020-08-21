const express = require("express")
const db = require("../../data/dbConfig")

const router = express.Router()

//GET ACCOUNTS
router.get("/", async (req, res, next) => {
	try {
		const accounts = await db.select("*").from("accounts")
		res.json(accounts)
	} catch (err) {
		next(err)
	}
})

//GET BY :ID
router.get("/:id", async (req, res, next) => {
	try {	
        const account = await db("accounts")
            .where("id", req.params.id)
            .first()

			res.json(account)
	} catch (err) {
		next(err)
	}
})

//POST
router.post("/",validateAcc, async (req, res, next) => {
	try {
		const input = {
			name: req.body.name,
			budget: req.body.budget,
		}
		const [ID] = await db.insert(input).into("accounts")

		const account = await db.first("*").from("accounts").where("id", ID)

		res.status(201).json(account)
	} catch (err) {
		next(err)
	}
})

//PUT-EDIT
router.put("/:id",validateAcc, async (req, res, next) => {
	try {
		const input = {
			name: req.body.name,
			budget: req.body.budget,
		}
		if (req.body.name || req.body.budget) {
			await db("accounts")
			.update(input)
			.where("id", req.params.id)
		}
		const account = await db.first("*")
			.from("accounts")
			.where("id", req.params.id)

		res.json(account)
	} catch (err) {
		next(err)
	}
})

//DELETE
router.delete("/:id", async (req, res, next) => {
	try {
		await db("accounts").where("id", req.params.id).del()
		res.status(204).end()
	} catch (err) {
		next(err)
	}
})

//CMD
function validateAcc(req, res, next) {
	if (Object.keys(req.body).length !== 0) {
	  (req.body.budget)
		? next()
		: res.status(400).json({
		  error: "budget REQUIRED"
		})
	} else {
	  res.status(400).json({
		error: "No account data found"
	  })
	}
  }

module.exports = router