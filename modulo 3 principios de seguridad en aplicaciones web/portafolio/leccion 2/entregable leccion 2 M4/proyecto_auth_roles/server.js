require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const authRoutes = require('./auth/routes');
const postRoutes = require('./routes/posts');

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(process.env.PORT || 3000, () => console.log('Server up'));
});
