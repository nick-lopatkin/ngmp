import {Router} from 'express';
import products from '../models/products';
import users from '../models/users';

const router = new Router();

router.route('/').get((req, res) => {
    console.log('Home page');
    res.json({message: 'Home page'});
});
router.get('/products', (req, res) => {
    console.log('ALL products');
    res.json({products});
});
router.get('/products/:id', (req, res) => {
    console.log('SINGLE product');
    res.json({product: products[req.params.id]});
});
router.get('/products/:id/reviews', (req, res) => {
    console.log('ALL reviews for a single product');
    const reviews = products[req.params.id] && products[req.params.id].reviews;
    res.json({reviews});
});
router.post('/products', (req, res) => {
    console.log('NEW product');
    res.json({product: 'NEW'});
});
router.get('/users', (req, res) => {
    console.log('ALL users');
    res.json({users});
});

export default router;
