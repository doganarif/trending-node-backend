var express = require('express');
var router = express.Router();

const {
	Category,
	Product,
	Card,
	Company,
	Photo,
	CompanyPhoto
} = require('../database');

router.get('/get_all_category', (req, res) => {
	Category.findAll({
		attributes: [
			['title', 'Kategori Başlığı'],
			['parent_id', 'Ust Kategori']
		]
	}).then(data => {
		res.json({
			status: 'success',
			data
		});
	});
});

router.post('/add_category', (req, res) => {
	const { name, kategori } = req.body;
	Category.create({
		title: name,
		parent_id: kategori
	}).then(data => {
		res.json({
			status: 'success',
			data
		});
	});
});
router.get('/get_all_lure', (req, res) => {
	Category.findAll({
		attributes: [
			['title', 'text'],
			['id', 'value']
		]
	}).then(data => {
		res.json({
			status: 'success',
			data
		});
	});
});
router.get('/', async function(req, res, next) {
	Category.findAll({
		where: {
			parent_id: null
		},
		include: [
			{
				model: Category
			},
			{
				model: Company
			}
		]
	})
		.then(data => {
			if (data.length < 1) {
				res.json({
					status: 'warning',
					message: 'no categories listed'
				});
			}
			res.json({
				status: 'success',
				data
			});
		})
		.catch(err => {
			console.log(err);
			res.json({
				status: 'error',
				message: 'check logs'
			});
		});
});

router.post('/products/:id', (req, res) => {
	console.log(req.body.filter, 'asdasd');
	var where;
	where = {
		parent_id: req.params.id
	};
	console.log('ASD', req.body.ilId);
	if (req.body.sokakId) {
		where = {
			parent_id: req.params.id,
			sokakId: req.body.sokakId
		};
	} else if (req.body.mahalleId) {
		where = {
			parent_id: req.params.id,
			mahalleId: req.body.mahalleId
		};
	} else if (req.body.ilceId) {
		where = {
			parent_id: req.params.id,
			ilceId: req.body.ilceId
		};
	} else if (req.body.ilId) {
		where = {
			parent_id: req.params.id,
			sehirId: req.body.ilId
		};
	}
	if (req.body.filter == 0) {
		Company.findAll({
			where,
			include: [
				{
					model: Card,
					as: 'company_id'
				},
				{
					model: CompanyPhoto
				}
			]
		})
			.then(data => {
				res.json({
					status: 'success',
					data
				});
			})
			.catch(err => {
				res.end();
				console.log(err);
			});
	} else if (req.body.filter == 1) {
		// FIYAT ARTAN
		Company.findAll({
			where,
			order: [['price', 'ASC']],
			include: [
				{
					model: Card,
					as: 'company_id'
				},
				{
					model: CompanyPhoto
				}
			]
		})
			.then(data => {
				res.json({
					status: 'success',
					data
				});
			})
			.catch(err => {
				res.end();
				console.log(err);
			});
	} else if (req.body.filter == 2) {
		//Fiyat Azalan
		Company.findAll({
			where,
			order: [['price', 'DESC']],
			include: [
				{
					model: Card,
					as: 'company_id'
				},
				{
					model: CompanyPhoto
				}
			]
		})
			.then(data => {
				res.json({
					status: 'success',
					data
				});
			})
			.catch(err => {
				res.end();
				console.log(err);
			});
	} else if (req.body.filter == 3) {
		// Yildiz Artan
		Company.findAll({
			where,
			include: [
				{
					model: Card,
					as: 'company_id'
				},
				{
					model: CompanyPhoto
				}
			]
		})
			.then(data => {
				res.json({
					status: 'success',
					data
				});
			})
			.catch(err => {
				res.end();
				console.log(err);
			});
	} else if (req.body.filter == 4) {
		//Yildiz Azalan
		Company.findAll({
			where,
			include: [
				{
					model: Card,
					as: 'company_id'
				},
				{
					model: CompanyPhoto
				}
			]
		})
			.then(data => {
				res.json({
					status: 'success',
					data
				});
			})
			.catch(err => {
				res.end();
				console.log(err);
			});
	} else {
		Company.findAll({
			where,
			include: [
				{
					model: Card,
					as: 'company_id'
				},
				{
					model: CompanyPhoto
				}
			]
		})
			.then(data => {
				console.log('asd', data, 'SSDADSDS');
				res.json({
					status: 'success',
					data
				});
			})
			.catch(err => {
				res.end();
				console.log(err);
			});
	}
});

router.get('/detail/:id', (req, res) => {
	Category.findAll({
		where: {
			parent_id: req.params.id
		},
		include: [
			{
				model: Category
			},
			{
				model: Company
			}
		]
	}).then(data => {
		if (!data) {
			res.json({
				status: 'warning',
				message: 'No category Found'
			});
		}
		res.json({
			status: 'success',
			data
		});
	});
});

module.exports = router;
