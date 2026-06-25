import Place from '../models/Place.js';
import paginate from '../utils/pagination.js';
import ApiError from '../utils/ApiError.js';

export const getPlaces = async (query) => {
  const { page, limit, search } = query;
  const { page: p, limit: l, skip } = paginate(page, limit);

  const filter = {};
  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  const [places, total] = await Promise.all([
    Place.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(l),
    Place.countDocuments(filter),
  ]);

  return {
    places,
    pagination: {
      page: p,
      limit: l,
      total,
      pages: Math.ceil(total / l),
    },
  };
};

export const getAllPlaces = async () => {
  return Place.find().sort({ name: 1 });
};

export const getPlaceById = async (id) => {
  const place = await Place.findById(id);
  if (!place) {
    throw new ApiError(404, 'Place not found');
  }
  return place;
};

export const createPlace = async (data) => {
  const place = await Place.create(data);
  return place;
};

export const updatePlace = async (id, data) => {
  const place = await Place.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!place) {
    throw new ApiError(404, 'Place not found');
  }

  return place;
};

export const deletePlace = async (id) => {
  const place = await Place.findByIdAndDelete(id);
  if (!place) {
    throw new ApiError(404, 'Place not found');
  }
  return place;
};
