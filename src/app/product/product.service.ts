import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private baseUrl = 'https://dummyjson.com/products';

    constructor(private http: HttpClient) { }

    getUser(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    saveProduct(add: Object): Observable<Object> {
        return this.http.post(`${this.baseUrl}/'add'`, add);
    }

    updateProduct(id: number, value: any): Observable<Object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    getUserList(): Observable<any> {
        return this.http.get(`${this.baseUrl}`);
    }
}