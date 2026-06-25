import Property from '../models/Property.js';
import paginate from '../utils/pagination.js';
import ApiError from '../utils/ApiError.js';

export const getProperties = async (query) => {
  const { page, limit, search, category, place, type, status } = query;
  const { page: p, limit: l, skip } = paginate(page, limit);

  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
    ];
  }

  if (category) filter.category = category;
  if (place) filter.place = place;
  if (type) filter.type = type;
  if (status) filter.status = status;

  const [properties, total] = await Promise.all([
    Property.find(filter)
      .populate('category', 'name')
      .populate('place', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(l),
    Property.countDocuments(filter),
  ]);

  return {
    properties,
    pagination: {
      page: p,
      limit: l,
      total,
      pages: Math.ceil(total / l),
    },
  };
};

export const getPropertyById = async (id) => {
  const property = await Property.findById(id)
    .populate('category', 'name')
    .populate('place', 'name');

  if (!property) {
    throw new ApiError(404, 'Property not found');
  }

  return property;
};

export const getPropertyBySlug = async (slug) => {
  const property = await Property.findOne({ slug })
    .populate('category', 'name')
    .populate('place', 'name');

  if (!property) {
    throw new ApiError(404, 'Property not found');
  }

  return property;
};

const sanitize = (data) => {
  const clean = { ...data };
  if (clean.category === '' || clean.category === 'null') clean.category = undefined;
  if (clean.place === '' || clean.place === 'null') clean.place = undefined;
  if (clean.images && Array.isArray(clean.images) && clean.images.length === 0) {
    delete clean.images;
  }
  return clean;
};

export const createProperty = async (data) => {
  const property = await Property.create(sanitize(data));
  return property;
};

export const updateProperty = async (id, data) => {
  const property = await Property.findByIdAndUpdate(id, sanitize(data), {
    new: true,
    runValidators: true,
  })
    .populate('category', 'name')
    .populate('place', 'name');

  if (!property) {
    throw new ApiError(404, 'Property not found');
  }

  return property;
};

export const deleteProperty = async (id) => {
  const property = await Property.findByIdAndDelete(id);
  if (!property) {
    throw new ApiError(404, 'Property not found');
  }
  return property;
};

export const toggleFeatured = async (id) => {
  const property = await Property.findById(id);
  if (!property) {
    throw new ApiError(404, 'Property not found');
  }

  const updated = await Property.findByIdAndUpdate(
    id,
    { $set: { isFeatured: !property.isFeatured } },
    { new: true, runValidators: false }
  )
    .populate('category', 'name')
    .populate('place', 'name');

  return updated;
};

export const getFeaturedProperties = async () => {
  return Property.find({ isFeatured: true })
    .populate('category', 'name')
    .populate('place', 'name')
    .sort({ createdAt: -1 });
};
