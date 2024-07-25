const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require("express");

//Connect to DB
const uri = "mongodb+srv://Test1:lUsmbMxDQxLhvYZ2@sundb1.dudhuts.mongodb.net/?retryWrites=true&w=majority&appName=SunDB1";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Create Api
const app = express();
app.use(express.json());

app.post("/addBook",async (req, res) => {
  const { title, description, imgName, price, tag } = req.body;
  // const title = req.body.title
  // const description = req.body.description
  // const imgName = req.body.imgName
  // const price = req.body.price
  // const tag = req.body.tag

  const books = client.db("website1").collection("books");
  
  const query = {
    title: title,
    description: description,
    imgName: imgName,
    price: price,
    tag: tag
  }

  try {
    if (!title || !description || !imgName || !price || !tag) {
      throw new Error("data error");
    }

    const result = await books.insertOne(query);
    res.status(200).json({
      status: "success"
    });

  } catch (err) {
    console.log(err)
    res.status(401).json({
      status: "fail",
      error: err
    });
  }
});

app.get("/deleteBook",async (req, res) => {
  const { id } = req.query;
  const books = client.db("website1").collection("books");
  const query = { _id: new ObjectId(id)};

  try {
    await books.findOneAndDelete(query);

    res.status(200).json({
      status: "success",
    });

  } catch (err) {
    console.log(err)
    res.status(401).json({
      status: "fail",
      error: err
    });
  }
})


app.get("/searchBooks",async (req, res) => {
  const { title } = req.query;
  const books = client.db("website1").collection("books");
  const query = { title: { $regex: '^'+title } };
  const options = {
    sort: { title: 1 },
    projection: {
      _id: 0
    }
  };

  try {
    if ((await books.countDocuments(query)) === 0) {
      throw new Error("No documents found!");
    }

    const cursor = await books.find(query, options).toArray();

    res.status(200).json({
      status: "success",
      books: cursor
    });

  } catch (err) {
    console.log(err)
    res.status(401).json({
      status: "fail",
      error: err
    });
  }
})


app.listen(3000, () => {
  console.log("Server started on port 3000");
});