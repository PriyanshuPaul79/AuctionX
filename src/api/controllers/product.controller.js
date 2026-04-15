const productService = require('../../core/services/product.service');

/**
 * Product Controller
 * Handles all HTTP requests related to product metadata
 */
const productController = {
    // POST /products
    async createProduct(req, res, next) {
        try {
            // req.user.id comes from authMiddleware
            const sellerId = req.user.id; 
            const productData = req.body;

            const product = await productService.createProduct(sellerId, productData);
            
            return res.status(201).json({
                success: true,
                message: 'Product created successfully',
                data: product
            });
        } catch (error) {
            next(error); // Pass to global error handler
        }
    },

    // GET /products/:id
    async getProduct(req, res, next) {
        try {
            const { id } = req.params;
            const product = await productService.getProductById(id);

            return res.status(200).json({
                success: true,
                data: product
            });
        } catch (error) {
            next(error);
        }
    },

    // PUT /products/:id
    async updateProduct(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const updateData = req.body;

            // Service layer will handle ownership verification (is this the seller?)
            const updatedProduct = await productService.updateProduct(id, userId, updateData);

            return res.status(200).json({
                success: true,
                message: 'Product updated successfully',
                data: updatedProduct
            });
        } catch (error) {
            next(error);
        }
    },

    // DELETE /products/:id
    async deleteProduct(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            await productService.deleteProduct(id, userId);

            return res.status(204).send(); // No content
        } catch (error) {
            next(error);
        }
    }
};

module.exports = productController;