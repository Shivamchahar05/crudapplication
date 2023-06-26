import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
   providedIn: 'root'
})
export class FormserviceService {
   url="https://reqres.in/api/users/"
   constructor(private http: HttpClient) { }

   postdata(data: any) {
      return this.http.post<any>(this.url , data)
         .pipe(map((res: any) => {
            console.log(res.data, "service");
            return res;
         }))
         

   }
   getdata() {
      return this.http.get<any>(this.url)
         .pipe(map((res: any) => {
            return res.data;
         }))
   }


   updatedata(data: any, id: number) {
      return this.http.put<any>(this.url + id, data)
         .pipe(map((res: any) => {
            return res;
         }))
   }

   deletedata(id: number) {
      return this.http.delete<any>(this.url + id)
         .pipe(map((res: any) => {
            return res;
         }))
   }

}
