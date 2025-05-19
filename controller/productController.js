import productModel from '../models/productSchema.js'


// get all products
export const getAllProducts = async (req, res) => {

    try {
        const products = await productModel.find();
        res.status(200).json(products);
        if (!products)
            return res.status(404).json({ message: 'Product not found' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get single product
export const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product)
            return res.status(404).json({ message: 'Product not found' });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const newProduct = new productModel(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'product created successfully', savedProduct });
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error });
    }
};

//  Update a product
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedProduct)
            return res.status(404).json({ message: 'Product not found' });

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error });
    }
};

//  Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const deleted = await productModel.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: 'Product not found' });

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};
