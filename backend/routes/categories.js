const router = require("express").Router();
const Cat = require("../models/category");

// Add Category
router.post("/add-category", async (req, res) => {
    try {
        const { categoryName } = req.body;

        // Create new category
        const cat = new Cat({ categoryName });

        // Save category to the database
        await cat.save();

        // Respond with success message
        return res.status(200).json({ message: "Category added" });
    } catch (error) {
        // Handle errors
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
