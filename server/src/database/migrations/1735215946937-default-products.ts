import { IAuthor } from '@common/interfaces/author.interface';
import { IProduct } from '@common/interfaces/product.interface';
import { IPublisher } from '@common/interfaces/publisher.interface';
import { MigrationInterface, QueryRunner } from 'typeorm';

const products: (Pick<
  IProduct,
  'name' | 'description' | 'price' | 'stock_quantity' | 'originalPrice'
> & {
  categoryId: number;
  authorId: number;
  publisherId: number;
})[] = [
  // Fantasy Category
  {
    name: 'A Game of Thrones',
    description:
      'A Game of Thrones is the first novel in A Song of Ice and Fire, a series of fantasy novels by George R. R. Martin.',
    price: 19.99,
    stock_quantity: 0,
    categoryId: 1,
    authorId: 1,
    publisherId: 1,
    originalPrice: 24.99,
  },
  {
    name: 'The Hobbit',
    description:
      'The Hobbit is a fantasy novel by J.R.R. Tolkien, introducing the world of Middle-earth and the journey of Bilbo Baggins.',
    price: 14.99,
    stock_quantity: 10,
    categoryId: 1,
    authorId: 2,
    publisherId: 2,
    originalPrice: 19.99,
  },
  {
    name: "Harry Potter and the Sorcerer's Stone",
    description:
      'The first book in the Harry Potter series by J.K. Rowling, about the magical adventures of a young wizard.',
    price: 12.99,
    stock_quantity: 150,
    categoryId: 1,
    authorId: 3,
    publisherId: 3,
    originalPrice: null,
  },
  {
    name: 'Mistborn: The Final Empire',
    description:
      'Mistborn is a fantasy novel by Brandon Sanderson, set in a world of ash and mist.',
    price: 16.99,
    stock_quantity: 80,
    categoryId: 1,
    authorId: 4,
    publisherId: 4,
    originalPrice: 18.99,
  },
  {
    name: 'The Name of the Wind',
    description:
      'A fantasy novel by Patrick Rothfuss, recounting the life of Kvothe, a gifted musician and magician.',
    price: 18.99,
    stock_quantity: 90,
    categoryId: 1,
    authorId: 5,
    publisherId: 1,
    originalPrice: 22.99,
  },
  {
    name: 'The Way of Kings',
    description:
      'The Way of Kings is the first book in The Stormlight Archive by Brandon Sanderson.',
    price: 22.99,
    stock_quantity: 60,
    categoryId: 1,
    authorId: 4,
    publisherId: 4,
    originalPrice: null,
  },
  {
    name: 'Eragon',
    description:
      'Eragon is the first book in the Inheritance Cycle series by Christopher Paolini.',
    price: 14.49,
    stock_quantity: 120,
    categoryId: 1,
    authorId: 6,
    publisherId: 5,
    originalPrice: null,
  },
  {
    name: 'The Chronicles of Narnia: The Lion, the Witch and the Wardrobe',
    description:
      'A fantasy classic by C.S. Lewis, set in the magical world of Narnia.',
    price: 13.99,
    stock_quantity: 200,
    categoryId: 1,
    authorId: 7,
    publisherId: 6,
    originalPrice: 17.99,
  },
  {
    name: 'The Blade Itself',
    description:
      'The Blade Itself is the first book in The First Law series by Joe Abercrombie.',
    price: 17.99,
    stock_quantity: 100,
    categoryId: 1,
    authorId: 8,
    publisherId: 7,
    originalPrice: null,
  },
  {
    name: 'The Black Prism',
    description:
      'The Black Prism is the first book in the Lightbringer series by Brent Weeks.',
    price: 18.49,
    stock_quantity: 95,
    categoryId: 1,
    authorId: 9,
    publisherId: 4,
    originalPrice: null,
  },
  // Health and Fitness Category
  {
    name: 'The Fitness Mindset',
    description:
      'A book by Brian Keane that guides you on building mental toughness and achieving fitness goals.',
    price: 15.99,
    stock_quantity: 150,
    categoryId: 2,
    authorId: 10,
    publisherId: 8,
    originalPrice: null,
  },
  {
    name: 'Can’t Hurt Me',
    description:
      'David Goggins shares his inspiring journey and lessons in mental toughness and fitness.',
    price: 20.99,
    stock_quantity: 180,
    categoryId: 2,
    authorId: 11,
    publisherId: 9,
    originalPrice: 25.99,
  },
  {
    name: 'The 4-Hour Body',
    description:
      'Tim Ferriss shares unconventional advice on diet, fitness, and human performance.',
    price: 19.49,
    stock_quantity: 120,
    categoryId: 2,
    authorId: 12,
    publisherId: 10,
    originalPrice: null,
  },
  {
    name: 'Atomic Habits',
    description:
      'James Clear explores how small habits lead to big changes in fitness and health.',
    price: 21.99,
    stock_quantity: 200,
    categoryId: 2,
    authorId: 13,
    publisherId: 11,
    originalPrice: null,
  },
  {
    name: 'You Are Your Own Gym',
    description:
      'A book by Mark Lauren that provides no-equipment bodyweight exercises.',
    price: 17.99,
    stock_quantity: 130,
    categoryId: 2,
    authorId: 14,
    publisherId: 12,
    originalPrice: 19.99,
  },
  {
    name: 'Thinner Leaner Stronger',
    description:
      "Michael Matthews provides a simple and effective guide to women's fitness.",
    price: 18.99,
    stock_quantity: 100,
    categoryId: 2,
    authorId: 15,
    publisherId: 13,
    originalPrice: 22.49,
  },
  {
    name: 'Burn',
    description:
      'Herman Pontzer explains the science of metabolism and weight loss.',
    price: 14.99,
    stock_quantity: 110,
    categoryId: 2,
    authorId: 16,
    publisherId: 14,
    originalPrice: null,
  },
  {
    name: 'Eat to Live',
    description:
      'Joel Fuhrman provides a six-week plan for health and weight loss.',
    price: 13.49,
    stock_quantity: 140,
    categoryId: 2,
    authorId: 17,
    publisherId: 15,
    originalPrice: null,
  },
  {
    name: 'The New Rules of Lifting',
    description:
      'Lou Schuler and Alwyn Cosgrove offer a comprehensive guide to strength training.',
    price: 16.99,
    stock_quantity: 90,
    categoryId: 2,
    authorId: 18,
    publisherId: 16,
    originalPrice: 20.99,
  },
  {
    name: 'Wheat Belly',
    description:
      'William Davis discusses the impact of wheat on health and fitness.',
    price: 12.99,
    stock_quantity: 170,
    categoryId: 2,
    authorId: 19,
    publisherId: 17,
    originalPrice: null,
  },
  // Personalized Gifts
  {
    name: 'Customized Mug',
    description:
      'A mug with your custom text or photo, perfect for gifting loved ones.',
    price: 9.99,
    stock_quantity: 50,
    categoryId: 3,
    authorId: null, // Not applicable
    publisherId: 18, // Placeholder for manufacturer or brand
    originalPrice: 12.99,
  },
  {
    name: 'Engraved Keychain',
    description: 'A metallic keychain with personalized engraving options.',
    price: 7.99,
    stock_quantity: 100,
    categoryId: 3,
    authorId: null,
    publisherId: 19,
    originalPrice: null,
  },
  // Corporate Gifts
  {
    name: 'Luxury Pen Set',
    description: 'A high-quality pen set ideal for corporate gifting.',
    price: 29.99,
    stock_quantity: 40,
    categoryId: 4,
    authorId: null,
    publisherId: 20,
    originalPrice: 34.99,
  },
  {
    name: 'Desk Organizer',
    description: 'A sleek wooden desk organizer, perfect for professional use.',
    price: 24.99,
    stock_quantity: 60,
    categoryId: 4,
    authorId: null,
    publisherId: 21,
    originalPrice: null,
  },
];

const authors: Omit<IAuthor, 'created_at' | 'updated_at'>[] = [
  { id: 1, name: 'George R. R. Martin' },
  { id: 2, name: 'John R. R. Tolkien' },
  { id: 3, name: 'J.K. Rowling' },
  { id: 4, name: 'Brandon Sanderson' },
  { id: 5, name: 'Patrick Rothfuss' },
  { id: 6, name: 'Christopher Paolini' },
  { id: 7, name: 'C.S. Lewis' },
  { id: 8, name: 'Joe Abercrombie' },
  { id: 9, name: 'Brent Weeks' },
  { id: 10, name: 'Brian Keane' },
  { id: 11, name: 'David Goggins' },
  { id: 12, name: 'Tim Ferriss' },
  { id: 13, name: 'James Clear' },
  { id: 14, name: 'Mark Lauren' },
  { id: 15, name: 'Michael Matthews' },
  { id: 16, name: 'Herman Pontzer' },
  { id: 17, name: 'Joel Fuhrman' },
  { id: 18, name: 'Lou Schuler' },
  { id: 19, name: 'William Davis' },
];

const publishers: Omit<IPublisher, 'created_at' | 'updated_at'>[] = [
  { id: 1, name: 'Bantam Books' },
  { id: 2, name: 'HarperCollins' },
  { id: 3, name: 'Bloomsbury' },
  { id: 4, name: 'Tor Books' },
  { id: 5, name: 'Knopf' },
  { id: 6, name: 'Macmillan' },
  { id: 7, name: 'Gollancz' },
  { id: 8, name: 'Vermilion' },
  { id: 9, name: 'Lioncrest Publishing' },
  { id: 10, name: 'Crown Publishing' },
  { id: 11, name: 'Avery' },
  { id: 12, name: 'Ballantine Books' },
  { id: 13, name: 'Waterbury Publications' },
  { id: 14, name: 'Penguin Random House' },
  { id: 15, name: 'HarperOne' },
  { id: 16, name: 'Rodale Books' },
  { id: 17, name: 'Hay House' },
  { id: 18, name: 'MugCraft Studio' },
  { id: 19, name: 'EngraveIt Co.' },
  { id: 20, name: 'Elegant Pens' },
  { id: 21, name: 'WoodWorks Designs' },
];

const productTags = {
  '1': [4, 1],
  '2': [4, 1, 7],
  '3': [4, 7],
  '4': [4, 1, 5],
  '5': [4, 1, 12],
  '6': [4, 1, 15],
  '7': [4, 7, 16],
  '8': [4, 1],
  '9': [4, 1, 14],
  '10': [4, 1, 13],
  '11': [1],
  '12': [10, 11],
  '13': [10, 13],
  '14': [10, 16],
  '15': [10, 15],
  '16': [10, 12],
  '17': [10, 14],
  '18': [10, 11],
  '19': [10, 19],
  '20': [10, 13],
  '21': [18, 17],
  '22': [18, 19],
  '23': [19],
  '24': [17],
};

export class DefaultProducts1735215946937 implements MigrationInterface {
  // name = 'DefaultProducts1735215946937';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // insert Books department
    await queryRunner.query(
      `insert into departments (id, name, description) values (1, 'Books', 'Books description')`,
    );

    // insert Gifts department
    await queryRunner.query(
      `insert into departments (id, name, description) values (2, 'Gifts', 'Gifts description')`,
    );

    // insert Fantasy books category
    await queryRunner.query(
      `insert into categories (id, name, description, departmentId) values (1, 'Fantasy', 'Fantasy books', 1)`,
    );
    // insert Health and Fitness books category
    await queryRunner.query(
      `insert into categories (id, name, description, departmentId) values (2, 'Fitness and Health', 'Fitness and Health books', 1)`,
    );

    // insert Personalized Gifts category
    await queryRunner.query(
      `insert into categories (id, name, description, departmentId) values (3, 'Personalized Gifts', 'Personalized Gifts category', 2)`,
    );
    // insert Corporate Gifts category
    await queryRunner.query(
      `insert into categories (id, name, description, departmentId) values (4, 'Corporate Gifts', 'Corporate Gifts category', 2)`,
    );

    // Insert all authors from above
    for await (let { id, name } of authors) {
      await queryRunner.query(
        `insert into authors (id, name) values (${id}, '${name}')`,
      );
    }

    // Insert all publishers from above
    for await (let { id, name } of publishers) {
      await queryRunner.query(
        `insert into publishers (id, name) values (${id}, '${name}')`,
      );
    }

    // Insert all products from above
    for await (let {
      name,
      description,
      price,
      stock_quantity,
      categoryId,
      authorId,
      publisherId,
      originalPrice,
    } of products) {
      await queryRunner.query(
        `insert into products (name, description, price, stock_quantity, originalPrice, categoryId, authorId, publisherId) values ('${name.replaceAll("'", "''")}', '${description.replaceAll("'", "''")}', ${price}, ${stock_quantity}, ${originalPrice},${categoryId}, ${authorId}, ${publisherId})`,
      );
    }

    // Insert tags
    await queryRunner.query(
      `insert into tags (name) values ('Fiction'), ('Non-Fiction'), ('Science Fiction'), ('Fantasy'), ('Mystery & Thriller'), ('Romance'), ('Young Adult'), ('Children’s Books'), ('Historical Fiction'), ('Self-Help'), ('Biographies & Memoirs'), ('Art & Photography'), ('Cookbooks'), ('Graphic Novels & Comics'), ('Poetry'), ('Travel Guides'), ('Home Decor Gifts'), ('Personalized Gifts'), ('Stationery'), ('Unique Handmade Items')`,
    );

    for await (let productId of Object.keys(productTags)) {
      for (let tagId of productTags[productId]) {
        await queryRunner.query(
          `insert into products_tags_tags (productIds, tagIds) values (${productId}, ${tagId})`,
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`delete from departments`);
    await queryRunner.query(`delete from authors`);
    await queryRunner.query(`delete from publishers`);
    await queryRunner.query(`delete from images`);
    await queryRunner.query(`delete from orders`);
    await queryRunner.query(`delete from addresses`);
    await queryRunner.query(`delete from tags`);
  }
}
