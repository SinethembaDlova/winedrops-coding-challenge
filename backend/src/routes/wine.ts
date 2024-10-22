import { FastifyInstance } from 'fastify';
import { AppDataSource } from '../data-source';
import { MasterWine } from '../entity/MasterWine';
import { WineProduct } from '../entity/WineProduct';
import { CustomerOrder } from '../entity/CustomerOrder';

// Define the expected request body types
interface ProductRequestBody {
  master_wine_id: number;
  name: string;
  price: number;
}

interface BulkProductRequestBody {
  products: ProductRequestBody[];
}

interface OrderRequestBody {
  wine_product_id: number;
  quantity: number;
  total_amount: number;
  status: string;
}

export default async function productRoutes(fastify: FastifyInstance) {

  // Route to get all products
  fastify.get('/products', async (request, reply) => {
    const productRepository = AppDataSource.getRepository(WineProduct);
    const products = await productRepository.find({ relations: ['master_wine'] });
    reply.send(products);
  });

  // Route to create a single product
  fastify.post<{ Body: ProductRequestBody }>('/products', async (request, reply) => {
    const productRepository = AppDataSource.getRepository(WineProduct);
    const { master_wine_id, name, price } = request.body;

    const newProduct = productRepository.create({
      master_wine: { id: master_wine_id }, // Reference MasterWine entity by ID
      name,
      price,
    });

    await productRepository.save(newProduct);
    reply.send(newProduct);
  });

  // Route to create multiple products at once
  fastify.post<{ Body: BulkProductRequestBody }>('/products/bulk', async (request, reply) => {
    const productRepository = AppDataSource.getRepository(WineProduct);
    const { products } = request.body;

    const newProducts = products.map((product) =>
      productRepository.create({
        master_wine: { id: product.master_wine_id }, // Reference MasterWine entity by ID
        name: product.name,
        price: product.price,
      })
    );

    await productRepository.save(newProducts);
    reply.send(newProducts);
  });
}
