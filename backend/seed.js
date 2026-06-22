const { Product, syncDatabase } = require('./models');

const products = [
  {
    name: 'Gaming Laptop',
    description:
      'High performance gaming laptop with RTX 3060, 16GB RAM, 512GB SSD',
    price: 1299.99,
    category: 'Electronics',
    stock: 10,
    imageUrl:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300'
  },

  {
    name: 'Wireless Headphones',
    description:
      'Noise cancelling Bluetooth headphones with 30-hour battery life',
    price: 89.99,
    category: 'Electronics',
    stock: 25,
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'
  },

  {
    name: 'Cotton T-Shirt',
    description:
      'Comfortable 100% cotton t-shirt available in multiple colors',
    price: 19.99,
    category: 'Clothing',
    stock: 50,
    imageUrl:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300'
  },

  {
    name: 'Programming Book',
    description:
      'Complete guide to JavaScript and modern web development',
    price: 39.99,
    category: 'Books',
    stock: 30,
    imageUrl:
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300'
  },

  {
    name: 'Smart Watch',
    description:
      'Fitness tracker with GPS and heart-rate monitoring',
    price: 199.99,
    category: 'Electronics',
    stock: 15,
    imageUrl:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300'
  },

  {
    name: 'Coffee Mug',
    description:
      'Ceramic coffee mug with stylish design',
    price: 12.99,
    category: 'Home',
    stock: 100,
    imageUrl:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300'
  },

  {
    name: 'Running Shoes',
    description:
      'Lightweight running shoes with cushioned sole',
    price: 79.99,
    category: 'Sports',
    stock: 20,
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300'
  },

  {
    name: 'Smartphone',
    description:
      'Latest smartphone with excellent camera and performance',
    price: 699.99,
    category: 'Electronics',
    stock: 8,
    imageUrl:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300'
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding Database...');

    await syncDatabase();

    const count = await Product.count();

    if (count > 0) {
      console.log(
        `✅ ${count} products already exist. Skipping seed.`
      );
      process.exit(0);
    }

    await Product.bulkCreate(products);

    console.log(
      `✅ ${products.length} products added successfully`
    );

    process.exit(0);

  } catch (error) {
    console.error('❌ Seed Error:', error.message);
    process.exit(1);
  }
};

seedDatabase();