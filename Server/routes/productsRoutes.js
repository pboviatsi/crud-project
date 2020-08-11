//όλα τα queries για το CRUD του project
const express = require('express');
const router = express.Router();
var pool = require('../dbConfig');

//εμφάνιση όλων των προϊόντων
router.get('/', async function (req, res) {
    try {
        const client = await pool.connect();
        let dbRes = await client.query(`SELECT * FROM products ORDER BY product_id ASC`);
        await res.json(dbRes.rows);
        client.release();
    } catch (e) {
        console.error(e);
    }
});

//εμφάνιση προϊόντος με συγκεκριμένο id
router.get('/:product_id', async function (req, res) {
    try {
        const client = await pool.connect();
        let dbRes = await client.query(`
              SELECT * FROM products WHERE product_id = $1
            `, [req.params.product_id]);
        await res.json(dbRes.rows);
        client.release();
    } catch (e) {
        console.error(e);
    }
});

//διαγραφή προϊόντος με συγκεκριμένο id
router.delete('/:product_id', async function (req, res) {
    try {
        const client = await pool.connect();
        let dbRes = await client.query(`
            DELETE
            FROM products
            WHERE products.product_id = $1
        `, [req.params.product_id]);
        await res.json({});
        client.release();
    } catch (e) {
        console.error(e);
    }
});

//προσθήκη νέου προϊόντος
router.post('/', async function (req, res) {
    const values = [ req.body.name_product, req.body.descr, req.body.price, req.body.availability_count, req.body.product_link ];

    try {
        const client = await pool.connect();
        let dbRes = await client.query(`
            INSERT INTO products (name_product, descr, price, availability_count, product_link)
            VALUES ($1, $2, $3, $4, $5)
            returning *
        `, values );
        await res.json(dbRes.rows[0]);
        client.release();
    } catch (e) {
        console.error(e);
    }
});

//ενημέρωση προϊόντος
router.put('/:product_id', async (req, res) => {
    const values = [ req.params.product_id, req.body.name_product, req.body.descr, req.body.price, req.body.availability_count, req.body.product_link ];

    try {
        const client = await pool.connect();
        let dbRes = await client.query(`
            UPDATE products
            SET name_product = $2, 
                descr = $3, 
                price = $4, 
                availability_count = $5, 
                product_link = $6
            WHERE product_id = $1
        `, values );
        await res.json(dbRes.rows[0]);
        client.release();
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;
