const path = require('path');
const db = require('../../database/models');
const sequelize = require("sequelize");
const { Op } = sequelize;
const moment = require('moment');
const { like } = Op


const productsAPIController = {
    'list': async (req, res) => {
        await db.Product.findAll({
            include: ['colors', "sizes", "brand", "categories"]
        })
        .then(products => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: 'api/products'
                },
                data: 
                    {
                    count: products.length,
//                    products: products,
                    product: products.map(product => {
                        let product22 = { 
                            id: product.id,
                        name: product.name,
                        color: product.colors.map(color => color.name )}
                        return product22
                    }
                    )}
                
                   //countByCategory: ???
                        // detail: url
                        // un array con principal relación de uno a muchos                                               
                
            }
                res.json(respuesta);
            })
    },
    
    'detail': (req, res) => {
        db.Product.findByPk(req.params.id)
            .then(product => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: product.length,
                        url: '/api/products/:id' //req params
                    },
                    data: product
                    //urlImagen: "localhost:"
                    // Una URL para la imagen del producto (para mostrar la imagen).
                    //un array por cada relación de uno a muchos (categories, colors, sizes, etc).
                }
                res.json(respuesta);
            });
    }    
}

module.exports = productsAPIController;