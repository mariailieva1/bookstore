import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';
import { AddressService } from 'src/app/services/address/address.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthorService } from 'src/app/services/author/author.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { DepartmentService } from 'src/app/services/department/department.service';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { PublisherService } from 'src/app/services/publisher/publisher.service';

type EntityType =
  | 'department'
  | 'categories'
  | 'products'
  | 'users'
  | 'orders'
  | 'publishers'
  | 'authors'
  | 'addresses';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule, ImageUploadComponent],
  providers: [
    DepartmentService,
    CategoryService,
    ProductsService,
    OrderService,
    PublisherService,
    AuthorService,
    AddressService,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  data: any[] = [];
  properties: {
    property: string;
    type: 'string' | 'date' | 'number' | 'object' | 'boolean';
  }[] = [];
  entityType: EntityType = 'department';
  currentItem: any;
  currentItemId?: number;
  isEditing = false;
  entityToService: {
    [entity: string]: {
      updateEntityAsAdmin(entity: any): Observable<any>;
      deleteEntityAsAdmin(entityId: number): Observable<any>;
      createEntityAsAdmin(entity: any): Observable<any>;
    };
  } = {};
  currentItemStringified?: string;

  constructor(
    private departmentService: DepartmentService,
    private categoryService: CategoryService,
    private productsService: ProductsService,
    private authService: AuthService,
    private orderService: OrderService,
    private publisherService: PublisherService,
    private authorsService: AuthorService,
    private addressService: AddressService
  ) {}

  ngOnInit() {
    this.loadDepartments();

    this.entityToService['department'] = this.departmentService;
    this.entityToService['categories'] = this.categoryService;
    this.entityToService['products'] = this.productsService;
    this.entityToService['users'] = this.authService;
    this.entityToService['publishers'] = this.publisherService;
    this.entityToService['authors'] = this.authorsService;
    this.entityToService['addresses'] = this.addressService;
  }

  editItem(item: any) {
    this.updateCurrentItem(item);
  }

  async deleteItem(id: any) {
    await lastValueFrom(
      this.entityToService[this.entityType].deleteEntityAsAdmin(id)
    );
    this.loadByEntityType();
  }

  async saveItem() {
    if (!this.currentItemStringified) return;
    if (this.isEditing) {
      confirm('Are you sure you want to edit this item?');
      const entry = this.data.find((entry) => entry.id === this.currentItemId);
      const updatedItem = JSON.parse(this.currentItemStringified);
      await lastValueFrom(
        this.entityToService[this.entityType].updateEntityAsAdmin({
          ...updatedItem,
          id: entry.id,
        })
      );

      this.loadByEntityType();
    } else {
      confirm('Are you sure you want to add this item?');
      const newItem = JSON.parse(this.currentItemStringified);

      await lastValueFrom(
        this.entityToService[this.entityType].createEntityAsAdmin(newItem)
      );

      this.loadByEntityType();
    }
  }

  loadByEntityType() {
    switch (this.entityType) {
      case 'addresses':
        return this.getAddresses();
      case 'authors':
        return this.getAuthors();
      case 'categories':
        return this.getCategories();
      case 'department':
        return this.loadDepartments();
      case 'orders':
        return this.getOrders();
      case 'products':
        return this.getProducts();
      case 'publishers':
        return this.getPublishers();
      case 'users':
        return this.getUsers();
    }
  }

  loadDepartments() {
    this.departmentService.getDepartmentsAdmin().subscribe((departments) => {
      this.data = departments ?? [];
      this.generateProperties('department');
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.data = categories;
      this.generateProperties('categories');
    });
  }

  getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      this.data = products!;
      this.generateProperties('products');
    });
  }

  getUsers() {
    this.authService.getUsers().subscribe((users) => {
      this.data = users;
      this.generateProperties('users');
    });
  }

  getOrders() {
    this.orderService.getUserOrders().subscribe((orders) => {
      this.data = orders;
      this.generateProperties('orders');
    });
  }

  getPublishers() {
    this.publisherService.getPublishers().subscribe((publishers) => {
      this.data = publishers!;
      this.generateProperties('publishers');
    });
  }
  getAuthors() {
    this.authorsService.getAuthors().subscribe((authors) => {
      this.data = authors!;
      this.generateProperties('authors');
    });
  }

  getAddresses() {
    this.addressService.getAllAddressesAdmin().subscribe((addresses) => {
      this.data = addresses;
      this.generateProperties('addresses');
    });
  }

  updateCurrentItem(item?: any) {
    if (item) {
      this.currentItem = { ...item };

      this.isEditing = true;
    } else {
      this.currentItem = {};
      this.isEditing = false;

      this.properties.forEach((prop) => {
        this.currentItem[prop.property] = prop.type;
      });
    }
    this.currentItemId = this.currentItem['id'];
    delete this.currentItem['id'];
    delete this.currentItem['created_at'];
    delete this.currentItem['updated_at'];
    delete this.currentItem['password'];

    this.currentItemStringified = JSON.stringify(this.currentItem, null, 4);
  }

  private generateProperties(type: EntityType) {
    this.entityType = type;
    switch (type) {
      case 'department':
        this.properties = [
          { property: 'id', type: 'number' },
          { property: 'created_at', type: 'date' },
          { property: 'updated_at', type: 'date' },
          { property: 'name', type: 'string' },
          { property: 'description', type: 'string' },
        ];
        break;
      case 'categories':
        this.properties = [
          { property: 'id', type: 'number' },
          { property: 'created_at', type: 'date' },
          { property: 'updated_at', type: 'date' },
          { property: 'name', type: 'string' },
          { property: 'description', type: 'string' },
          { property: 'departmentId', type: 'number' },
        ];
        break;
      case 'products':
        this.properties = [
          { property: 'id', type: 'number' },
          { property: 'created_at', type: 'date' },
          { property: 'updated_at', type: 'date' },
          { property: 'name', type: 'string' },
          { property: 'description', type: 'string' },
          { property: 'price', type: 'number' },
          { property: 'originalPrice', type: 'number' },
          { property: 'stock_quantity', type: 'number' },
          { property: 'categoryId', type: 'number' },
          { property: 'authorId', type: 'number' },
          { property: 'publisherId', type: 'number' },
        ];
        break;
      case 'users':
        this.properties = [
          { property: 'id', type: 'number' },
          { property: 'created_at', type: 'date' },
          { property: 'updated_at', type: 'date' },
          { property: 'name', type: 'string' },
          { property: 'email', type: 'string' },
          { property: 'isAdmin', type: 'boolean' },
        ];
        break;
      case 'orders':
        this.properties = [
          { property: 'id', type: 'number' },
          { property: 'created_at', type: 'date' },
          { property: 'updated_at', type: 'date' },
          { property: 'checkoutSessionId', type: 'string' },
          { property: 'addressId', type: 'number' },
          { property: 'userId', type: 'number' },
        ];
        break;
      case 'publishers':
      case 'authors':
        this.properties = [
          { property: 'id', type: 'number' },
          { property: 'created_at', type: 'date' },
          { property: 'updated_at', type: 'date' },
          { property: 'name', type: 'string' },
        ];
        break;
      case 'addresses':
        this.properties = [
          { property: 'id', type: 'number' },
          { property: 'created_at', type: 'date' },
          { property: 'updated_at', type: 'date' },
          { property: 'name', type: 'string' },
          { property: 'country', type: 'string' },
          { property: 'city', type: 'string' },
          { property: 'addressLine', type: 'string' },
          { property: 'additionalAddressLine', type: 'string' },
          { property: 'postCode', type: 'string' },
          { property: 'phoneNumber', type: 'string' },
          { property: 'userId', type: 'number' },
        ];

        break;
    }

    this.updateCurrentItem();
  }
}
