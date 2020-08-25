const fs = require('fs');
const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .then(
            (products) => {
                res.status(200).json(products);
            }
        ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getOneProduct = (req, res, next) => {
    Product.findOne({
        _id: req.params.id
    }).then(
        (product) => {
            res.status(200).json(product);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.createProduct = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    req.body.product = JSON.parse(req.body.product);
    const product = new Product({
        title: req.body.product.title,
        description: req.body.product.description,
        imageUrl: url + '/images' + req.file.filename,
        price: req.body.product.price,
        userId: req.body.product.userId
    });
    product.save().then(
        () => {
            res.status(201).json({
                message: 'Product created successfully.'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.modifyProduct = (req, res, next) => {
    let product = new Product({_id: req.params.id});
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.product = JSON.parse(req.body.product);
        product = {
            title: req.body.product.title,
            description: req.body.product.description,
            imageUrl: url + '/images' + req.file.filename,
            price: req.body.product.price,
            userId: req.body.product.userId
        };
    } else {
        product = {
            _id: req.params.id,
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            userId: req.body.userId
        };
    }
    Product.updateOne({_id: req.params.id}, product).then(
        () => {
            res.status(201).json({
                message: 'Product updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.deleteProduct = (req, res, next) => {
    Product.findOne({_id: req.params.id})
        .then(
            (product) => {
                const filename = product.imageUrl.split('/images')[1];
                fs.unlink('images/' + filename, () => {
                    Product.deleteOne({_id: req.params.id}).then(
                        () => {
                            res.status(200).json({
                                message: 'Product deleted successfully!'
                            });
                        }
                    ).catch(
                        (error) => {
                            res.status(400).json({
                                error: error
                            });
                        }
                    );
                })
            }
        )
};

