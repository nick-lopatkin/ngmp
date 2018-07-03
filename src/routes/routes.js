import {Router} from 'express';
import CitySchema from '../models/city/schema';
import ProductSchema from '../models/product/schema';
import UserSchema from '../models/user/schema';
import productData from '../data/products';
import userData from '../data/users';

const router = new Router();

router.route('/').get((req, res) => {
    res.json({message: 'Home page'});
});

router.get('/products', (req, res) => {
    ProductSchema.find((err, products) => {
        res.json({products});
    });
});

router.get('/products/:id', (req, res) => {
    ProductSchema.findById(req.params.id, (err, product) => {
        res.json({product});
    });
});

router.get('/products/:id/reviews', (req, res) => {
    ProductSchema.findById(req.params.id, (err, product) => {
        const reviews = product.reviews;
        res.json({reviews});
    });
});

router.post('/products', (req, res) => {
    ProductSchema.insertMany(productData, (err, products) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end(err.message);
        }
        res.status(201).json(products);
    });
});

router.delete('/products/:id', (req, res) => {
    ProductSchema.deleteOne({_id: req.params.id}, (err, product) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end(err.message);
        }
        if (!product) {
            res.sendStatus(404);
        }
        res.status(204).json(product);
    });
});

router.get('/users', (req, res) => {
    UserSchema.find((err, users) => {
        res.json({users});
    });
});

router.get('/users/:id', (req, res) => {
    UserSchema.findById(req.params.id, (err, user) => {
        res.json({user});
    });
});

router.post('/users', (req, res) => {
    UserSchema.insertMany(userData, (err, users) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end(err.message);
        }
        res.status(201).json(users);
    });
});

router.delete('/users/:id', (req, res) => {
    UserSchema.deleteOne({_id: req.params.id}, (err, user) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end(err.message);
        }
        if (!user) {
            res.sendStatus(404);
        }
        res.status(204).json(user);
    });
});

router.get('/cities', (req, res) => {
    CitySchema.find((err, cities) => {
        res.json({cities});
    });
});

router.get('/cities/:id', (req, res) => {
    CitySchema.findById(req.params.id, (err, city) => {
        res.json({city});
    });
});

router.put('/cities/:id', (req, res) => {
    CitySchema.update({_id: req.params.id}, req.body, (err, results) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end(err.message);
        }
        if (results.n < 1) {
            return CitySchema.create({...req.body, _id: req.params.id}, (err, city) => {
                if (err) {
                    res.writeHead(400, {'Content-Type': 'text/plain'});
                    res.end(err.message);
                }
                res.status(201).json(city);
            });
        }
        if (results.nModified < 1) {
            return res.sendStatus(304);
        }
        res.json(results);
    });
});

router.delete('/cities/:id', (req, res) => {
    CitySchema.deleteOne({_id: req.params.id}, (err, city) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end(err.message);
        }
        if (!city) {
            res.sendStatus(404);
        }
        res.status(204).json(city);
    });
});

export default router;
