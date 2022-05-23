const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const {nanoid} = require("nanoid");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const tempDir = path.join(__dirname, "temp");

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    limits: {
        fileSize: 1000,
    }
});

const upload = multer({
    storage: multerConfig
});

const products = [];

const productsDir = path.join(__dirname, "public", "products");

/* upload.fields([{
    name: "image",
    maxCount: 1
}])*/
// upload.array("image", 8);
app.post("/api/products", upload.single("image"), async (req, res) => {
    try {
        const {path: tempDir, filename} = req.file;
        const resultDir = path.join(productsDir, filename);
        await fs.rename(tempDir, resultDir);
        const image = path.join("products", filename);
        const newProduct = {
            name: req.body.name,
            image,
            id: nanoid()
        };
        products.push(newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        await fs.unlink(req.file.path);
    }
});

app.get("/api/products", async(req, res)=> {
    res.json(products);
})

app.listen(3000);