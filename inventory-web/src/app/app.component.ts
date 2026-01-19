import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div dir="rtl" class="container">
      <header>
        <div class="header-content">
          <h1>📦 ניהול מלאי חכם</h1>
          <button class="open-btn" (click)="openAddModal()">➕ הוספת מוצר חדש</button>
        </div>
      </header>

      <div class="modal-overlay" *ngIf="showModal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>{{ isEditMode ? 'עריכת מוצר' : 'הוספת מוצר חדש' }}</h3>
            <button class="close-x" (click)="closeModal()">×</button>
          </div>
          
          <div class="form-body">
            <div class="input-group">
              <label>שם המוצר</label>
              <input [(ngModel)]="newProduct.productName" placeholder="שם מוצר">
            </div>
            <div class="input-group">
              <label>קטגוריה</label>
              <input [(ngModel)]="newProduct.category" placeholder="קטגוריה">
            </div>
            <div class="input-group">
              <label>מחיר ליחידה</label>
              <input type="number" [(ngModel)]="newProduct.price">
            </div>
            <div class="input-group">
              <label>כמות במלאי</label>
              <input type="number" [(ngModel)]="newProduct.stockQuantity">
            </div>
          </div>

          <div class="modal-footer">
            <button class="cancel-btn" (click)="closeModal()">ביטול</button>
            <button 
              class="save-btn" 
              [disabled]="!isFormValid()" 
              (click)="saveProduct()">
              {{ isEditMode ? 'עדכן מוצר' : 'שמור מוצר' }}
            </button>
          </div>
        </div>
      </div>

      <section class="table-section">
        <h3>📊 רשימת מלאי נוכחית</h3>
        <table>
          <thead>
            <tr>
              <th>שם מוצר</th>
              <th>קטגוריה</th>
              <th>מחיר</th>
              <th>כמות</th>
              <th>סטטוס</th>
              <th>פעולות</th> </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of products">
              <td><strong>{{ p.productName }}</strong></td>
              <td><span class="badge">{{ p.category }}</span></td>
              <td>{{ p.price }} ₪</td>
              <td>{{ p.stockQuantity }}</td>
              <td>
                <span [class]="p.stockQuantity > 5 ? 'status-ok' : 'status-low'">
                  {{ p.stockQuantity > 5 ? 'במלאי' : 'מלאי נמוך!' }}
                </span>
              </td>
              <td>
                <div class="actions">
                  <button class="edit-btn" (click)="openEditModal(p)" title="ערוך">✏️</button>
                  <button class="delete-btn" (click)="onDelete(p.id)" title="מחק">🗑️</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
  styles: [`
    .container { max-width: 1000px; margin: 0 auto; font-family: sans-serif; color: #333; }
    header { 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
      color: white; padding: 30px; border-radius: 0 0 20px 20px; margin-bottom: 30px;
    }
    .header-content { display: flex; justify-content: space-between; align-items: center; }
    
    .open-btn { 
      background: white; color: #764ba2; border: none; padding: 12px 20px; 
      border-radius: 50px; font-weight: bold; cursor: pointer; transition: 0.3s;
    }

    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; z-index: 1000;
    }
    .modal-content { background: white; padding: 25px; border-radius: 15px; width: 450px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .modal-header { display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 10px; }
    .close-x { background: none; border: none; font-size: 24px; cursor: pointer; }

    .form-body { display: flex; flex-direction: column; gap: 15px; margin-top: 20px; }
    .input-group label { display: block; margin-bottom: 5px; font-weight: bold; font-size: 0.9em; }
    input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }

    .modal-footer { display: flex; justify-content: flex-end; gap: 10px; margin-top: 25px; }
    .cancel-btn { background: #f0f0f0; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
    .save-btn { background: #28a745; color: white; border: none; padding: 10px 25px; border-radius: 6px; cursor: pointer; font-weight: bold; }
    .save-btn:disabled { background: #ccc; cursor: not-allowed; }

    .table-section { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    table { width: 100%; border-collapse: collapse; text-align: right; }
    th, td { padding: 15px; border-bottom: 1px solid #eee; }
    
    .actions { display: flex; gap: 10px; }
    .edit-btn, .delete-btn { background: none; border: none; font-size: 1.2rem; cursor: pointer; transition: 0.2s; }
    .edit-btn:hover { transform: scale(1.2); }
    .delete-btn:hover { transform: scale(1.2); }

    .badge { background: #f0f2f5; padding: 5px 10px; border-radius: 4px; font-size: 0.8em; }
    .status-ok { color: #28a745; font-weight: bold; }
    .status-low { color: #dc3545; font-weight: bold; }
  `]
})
export class AppComponent implements OnInit {
  products: any[] = [];
  showModal = false;
  isEditMode = false;
  currentProductId: number | null = null;
  
  newProduct = {
    productName: '',
    category: '',
    price: 0,
    stockQuantity: 0
  };

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentProductId = null;
    this.newProduct = { productName: '', category: '', price: 0, stockQuantity: 0 };
    this.showModal = true;
  }

  openEditModal(product: any) {
    this.isEditMode = true;
    this.currentProductId = product.id;
    // משתמשים ב-spread operator כדי ליצור עותק ולא לשנות את המקור בטעות
    this.newProduct = { ...product }; 
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  isFormValid(): boolean {
    return !!(
      this.newProduct.productName && 
      this.newProduct.category && 
      this.newProduct.price > 0 && 
      this.newProduct.stockQuantity >= 0
    );
  }

  saveProduct() {
    if (this.isEditMode && this.currentProductId) {
      // עדכון מוצר קיים
      this.productService.updateProduct(this.currentProductId, this.newProduct).subscribe(() => {
        this.loadProducts();
        this.closeModal();
      });
    } else {
      // הוספת מוצר חדש
      this.productService.addProduct(this.newProduct).subscribe(() => {
        this.loadProducts();
        this.closeModal();
      });
    }
  }

  onDelete(id: number) {
    if (confirm('האם את בטוחה שברצונך למחוק מוצר זה מהמלאי?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }
}