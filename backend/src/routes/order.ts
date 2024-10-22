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
