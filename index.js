const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://as1549yasas:CqCqYZjGUK4MLmX9@cluster0.szctkgt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
 .then(() => console.log("Connected to MongoDB"))
 .catch((err) => console.error(err));

app.use(express.json());

const Article = require("./models/Article");

  
app.get("/hello", (req, res) => {
  res.send("Hello World!");
});
app.get("/", (req, res) => {
  res.send("Hello in node js project!");
});

app.get("/sumNumbers/:number1/:number2",(req,res)=>{
    const number1 = parseInt(req.params.number1);
    const number2 = parseInt(req.params.number2);
    const sum = number1 + number2;
    res.send(`The sum of ${number1} and ${number2} is ${sum}`);
})
app.put("/about", (req, res) => {
    let numbers = '';
    for(let i=0;i<100;i++)
    {
        numbers+=i+"-";
    }
    res.render("students.ejs", {
        students: [
            { name: "John", age: 25 },
            { name: "Jane", age: 30 },
            { name: "Bob", age: 22 }
        ]
    });
  //res.send("<h1 style='color: red; font-style: italic;'>About! .Programming Advices <h1>"+numbers);
});

app.get("/students", (req, res) => {

  res.json({
    name: req.body.name,
    age: req.body.age
  });
});

app.post("/AddArticle", (req, res) => {
  const article = new Article({
    title: req.query.title,
    content: req.query.content
  });
  article.save()
    .then(() => res.json(article))
    .catch((err) => console.error(err));
});

app.get("/GetArticles", (req, res) => {
  Article.find()
    .then((articles) => res.render("articles.ejs", { articles }))
    .catch((err) => console.error(err));
});

app.get("/GetArticleById/:id", (req, res) => {
  Article.findById(req.params.id)
    .then((article) => res.render("article.ejs", { article }))
    .catch((err) => console.error(err));
});

app.delete("/DeleteArticle/:id", (req, res) => {
  Article.findByIdAndDelete(req.params.id)
    .then(() => res.send("Article deleted successfully"))
    .catch((err) => console.error(err));
});

app.put("/UpdateArticle/:id", (req, res) => {
  Article.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content
  })
    .then(() => res.send("Article updated successfully"))
    .catch((err) => console.error(err));
});



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
