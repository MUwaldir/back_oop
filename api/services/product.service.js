const boom = require('@hapi/boom');
const faker = require('faker');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  create(data) {
    // const {name, price, image } = req.body;
    const newProduct = { id:faker.datatype.uuid(), ...data };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    // console.log(this.products.slice(0,10))
    // return this.products;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    })
  }
  async findOne(id) {
    const product =  this.products.find(item => item.id === id);
    if(!product){
      // throw new Error("Product not found");
      throw boom.notFound("Product not found")
    }
    if(product.isBlock){
      throw boom.conflict("product is blocked")
    }
    return product;
  }
  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1) {
      // throw new Error("Product not found");
      throw boom.notFound("Product not found")

    }
    const product = this.products[index];
    this.products[index] = {...product,...changes };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1) {
      // throw new Error("Product not found");
      throw new boom.notFound("Product not found");
    }
    this.products.splice(index, 1);
    return true;
  }
}

module.exports = ProductsService;
