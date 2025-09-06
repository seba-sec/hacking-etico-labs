require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const authRoutes = require('./auth/routes');
const projectRoutes = require('./routes/projects');

app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => app.listen(process.env.PORT || 3000, () => console.log('Server up')))
  .catch(err => { console.error('DB error', err); process.exit(1); });
