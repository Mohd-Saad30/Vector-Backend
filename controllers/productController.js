import Product from '../models/Product.js';

export const getAllProducts = async (req, res) => {
  try {
    const { limit = 24, category, lastCreatedAt, lastId } = req.query;
    const parsedLimit = parseInt(limit, 10);

    const query = {};
    if (category && category !== 'All Categories') {
      query.category = category;
    }

    if (lastCreatedAt && lastId) {
      query.$or = [
        { createdAt: { $lt: new Date(lastCreatedAt) } },
        {
          createdAt: new Date(lastCreatedAt),
          _id: { $lt: lastId }
        }
      ];
    }

    // Query for parsedLimit + 1 items to determine if hasMore is true
    const products = await Product.find(query)
      .sort({ createdAt: -1, _id: -1 })
      .limit(parsedLimit + 1);

    const hasMore = products.length > parsedLimit;
    if (hasMore) {
      products.pop();
    }

    let nextCursor = null;
    if (products.length > 0 && hasMore) {
      const lastProduct = products[products.length - 1];
      nextCursor = {
        createdAt: lastProduct.createdAt,
        id: lastProduct._id
      };
    }

    res.status(200).json({
      success: true,
      products,
      hasMore,
      nextCursor
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.status(200).json({
      success: true,
      categories
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};
