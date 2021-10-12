import { catchError, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Product } from "./product.model";
import { EMPTY, Observable } from "rxjs";

//esse service é um SINGLETON
@Injectable({
  providedIn: "root",
})
export class ProductService {
  baseUrl = "http://localhost:3000/products";
  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}
  //Snackbar mostra mensagem no canto superior direito
  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }
  //req. dentro do back para criar o produto
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }


  //req. dentro do back para criar o produto
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e)));
  }

  //req. dentro do back para criar o produto
  readById(id: string | null): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e)));
  }

  //req. dentro do back para criar o produto
  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;

    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e)));
  }

  delete(id: number | undefined): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e)));
  }

    errorHandler(err: any): Observable<any> {
    this.showMessage('Erro insperado!', true);
    return EMPTY;
  }
}

