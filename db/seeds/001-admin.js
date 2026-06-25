import Admin from '../../src/models/Admin.js';
import env from '../../src/config/env.js';

const seedAdmin = async () => {
  const existing = await Admin.findOne({ email: env.defaultAdminEmail || 'admin@khanbd.com' });

  if (existing) {
    console.log('Default admin already exists');
    return;
  }

  await Admin.create({
    name: 'Admin',
    email: env.defaultAdminEmail || 'admin@khanbd.com',
    password: env.defaultAdminPassword || 'admin123',
  });

  console.log('Default admin created successfully');
};

export default seedAdmin;
