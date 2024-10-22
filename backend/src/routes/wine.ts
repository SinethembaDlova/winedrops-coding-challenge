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

  // Route to create an order
  fastify.post<{ Body: OrderRequestBody }>('/orders', async (request, reply) => {
    const orderRepository = AppDataSource.getRepository(CustomerOrder);
    const { wine_product_id, quantity, total_amount, status } = request.body;

    const newOrder = orderRepository.create({
      wine_product: { id: wine_product_id }, // Reference WineProduct entity by ID
      quantity,
      total_amount,
      status,
    });

    await orderRepository.save(newOrder);
    reply.send(newOrder);
  });

  // Route to get all orders
  fastify.get('/orders', async (request, reply) => {
    const orderRepository = AppDataSource.getRepository(CustomerOrder);
    const orders = await orderRepository.find({
      relations: ['wine_product', 'wine_product.master_wine'],
    });

    reply.send(orders);
  });
}
