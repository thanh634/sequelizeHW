const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const expressHbs = require('express-handlebars');
const { createPagination } = require('express-handlebars-paginate')

app.use(express.static(__dirname + "/html"));

app.engine('hbs', expressHbs.engine({
	layoutsDir: __dirname + "/views/layouts",
	partialsDir: __dirname + "/views/partials",
	extname: "hbs",
	defaultLayout: "layout",
	runtimeOptions: {
		allowProtoPropertiesByDefault: true,
	},
	helpers: {
		createPagination
	}
}))
app.set('view engine', "hbs");

app.get("/createTables", (req, res) => {
	let models = require("./models");
	models.sequelize.sync().then(() => {
		res.send("tables created")
	})
})

app.use("/blogs", require("./routes/blogRouter"));

app.listen(port, () => console.log(`Example app listen on port ${port}`))
