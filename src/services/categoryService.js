import Category from '../models/Category.js';
import paginate from '../utils/pagination.js';
import ApiError from '../utils/ApiError.js';

export const getCategories = async (query) => {
  const { page, limit, search } = query;
  const { page: p, limit: l, skip } = paginate(page, limit);

  const filter = {};
  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  const [categories, total] = await Promise.all([
    Category.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(l),
    Category.countDocuments(filter),
  ]);

  return {
    categories,
    pagination: {
      page: p,
      limit: l,
      total,
      pages: Math.ceil(total / l),
    },
  };
};

export const getAllCategories = async () => {
  return Category.find().sort({ name: 1 });
};

export const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }
  return category;
};

export const createCategory = async (data) => {
  const category = await Category.create(data);
  return category;
};

export const updateCategory = async (id, data) => {
  const category = await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  return category;
};

export const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }
  return category;
};
