import Enquiry from '../models/Enquiry.js';
import paginate from '../utils/pagination.js';
import ApiError from '../utils/ApiError.js';

export const getEnquiries = async (query) => {
  const { page, limit, search, interest, status, dateFrom, dateTo } = query;
  const { page: p, limit: l, skip } = paginate(page, limit);

  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
    ];
  }

  if (interest) filter.interest = interest;
  if (status) filter.status = status;
  if (dateFrom || dateTo) {
    filter.createdAt = {};
    if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
    if (dateTo) {
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999);
      filter.createdAt.$lte = toDate;
    }
  }

  const [enquiries, total] = await Promise.all([
    Enquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(l),
    Enquiry.countDocuments(filter),
  ]);

  return {
    enquiries,
    pagination: {
      page: p,
      limit: l,
      total,
      pages: Math.ceil(total / l),
    },
  };
};

export const getEnquiryById = async (id) => {
  const enquiry = await Enquiry.findById(id);
  if (!enquiry) {
    throw new ApiError(404, 'Enquiry not found');
  }
  return enquiry;
};

export const createEnquiry = async (data) => {
  const enquiry = await Enquiry.create(data);
  return enquiry;
};

export const updateEnquiry = async (id, data) => {
  const enquiry = await Enquiry.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!enquiry) {
    throw new ApiError(404, 'Enquiry not found');
  }

  return enquiry;
};

export const deleteEnquiry = async (id) => {
  const enquiry = await Enquiry.findByIdAndDelete(id);
  if (!enquiry) {
    throw new ApiError(404, 'Enquiry not found');
  }
  return enquiry;
};
