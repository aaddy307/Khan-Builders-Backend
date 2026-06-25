import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import Property from '../models/Property.js';
import Enquiry from '../models/Enquiry.js';
import Category from '../models/Category.js';
import Place from '../models/Place.js';

export const getDashboard = asyncHandler(async (req, res) => {
  const [
    totalProperties,
    totalEnquiries,
    totalCategories,
    totalPlaces,
    newEnquiries,
    featuredCount,
    propertiesByType,
    enquiriesByStatus,
    recentEnquiries,
  ] = await Promise.all([
    Property.countDocuments(),
    Enquiry.countDocuments(),
    Category.countDocuments(),
    Place.countDocuments(),
    Enquiry.countDocuments({ status: 'new' }),
    Property.countDocuments({ isFeatured: true }),
    Property.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } },
    ]),
    Enquiry.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Enquiry.find().sort({ createdAt: -1 }).limit(5),
  ]);

  res.status(200).json(
    new ApiResponse(200, 'Dashboard data fetched', {
      stats: {
        totalProperties,
        totalEnquiries,
        totalCategories,
        totalPlaces,
        newEnquiries,
        featuredCount,
      },
      propertiesByType,
      enquiriesByStatus,
      recentEnquiries,
    })
  );
});
