var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express();

router.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

router.get('/', function (req, res) {
	var url = req.query.url,
			recipe = {
				title: null,
				cuisine: null,
				ingredients: [],
				method:[],
				time: {
					preparation: null,
					cooking: null
				},
				serves: null,
				rating: {
					average: null,
					count: null,
					total: null
				},
				self_url: url
			};

	request(url, function (err, response, html) {
		if (!err) {
			var $ = cheerio.load(html);
			recipe.title = $('h1.masthead__title.heading-1').text();
			if (!recipe.title || recipe.title.length < 1) {
				// res.sendStatus(404, 'Page not found');
				return res.send({ error: "Not a valid BBC Good Food URL" });
			} else {
				$('.recipe-template__ingredients ul li.list-item').each(function (index, item){
					// Trim string up to line break where ingredient anchor description starts
					var lineBreak = $(this).text().indexOf('\n');
					if (lineBreak > 0) {
						recipe.ingredients.push($(this).text().substring(0, lineBreak));
					} else {
						recipe.ingredients.push($(this).text());
					}

				});
				$('.recipe-template__method-steps ul .list-item p').each(function (index, item) {
					recipe.method.push($(this).text());
				});
				recipe.time = {
					prep: $('.cook-and-prep-time .list').find('time').first().text(),
					cook: $('.cook-and-prep-time .list').find('time').last().text()
				}
				recipe.serves = $('.masthead__servings').children().last().text();
				recipe.image = $('.masthead__image img').attr('src');

				res.send(recipe);
			}

		} else {
			console.log(err);
			res.send({ error: 'Invalid URI'});
		}
	})
});

module.exports = router;
