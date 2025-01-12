require("dotenv").config();
const bodyParser = require('body-parser');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const   URL=process.env.URLL
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.URLL, { useNewUrlParser: true });

const HeroSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
});

const Hero = mongoose.model('Hero', HeroSchema);

// Get Hero Section Content
app.get('/api/hero-section', async (req, res) => {
    try {
        let heroContent = await Hero.findOne();
        if (!heroContent) {
            heroContent = { title: "", subtitle: "" }; // Default values
        }
        res.json(heroContent);
    } catch (error) {
        console.error("Error fetching hero section content:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Update Hero Section Content
app.post('/api/hero-section', async (req, res) => {
    const { title, subtitle } = req.body;

    if (!title || !subtitle) {
        return res.status(400).json({ error: "Title and Subtitle are required!" });
    }

    try {
        await Hero.updateOne({}, { title, subtitle }, { upsert: true });
        res.send('Hero section updated!');
    } catch (error) {
        console.error("Error updating hero section content:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get("/api/products", (req, res) => {
    const products = [
      { id: 1, name: "Product 1", description: "Description 1", price: "$10", image: "url1" },
      { id: 2, name: "Product 2", description: "Description 2", price: "$20", image: "url2" },
    ];
    res.json(products);
  });
  
  app.get("/api/testimonials", (req, res) => {
    const testimonials = [
      { id: 1, name: "Client 1", feedback: "Amazing service!" },
      { id: 2, name: "Client 2", feedback: "Loved the product quality!" },
    ];
    res.json(testimonials);
  });
  

app.listen(5000, () => console.log('Server running on port 5000'));
