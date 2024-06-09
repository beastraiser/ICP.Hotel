import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Categoria, TipoCama } from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() {}

  obtenerCategorias(): Observable<Categoria[]> {
    const url = `${this.baseUrl}/categorias`;
    return this.http.get<Categoria[]>(url);
  }

  obtenerCategoriaPorId(id: number): Observable<Categoria> {
    const url = `${this.baseUrl}/categorias/${id}`;
    return this.http.get<Categoria>(url);
  }

  actualizarCategoria(
    id: number,
    tipoCamas: TipoCama[],
    tipo: string,
    numeroCamas: number,
    maximoPersonas: number,
    costeNoche: number,
    foto: File | null
  ): Observable<boolean> {
    const url = `${this.baseUrl}/categorias/${id}`;
    const formData = new FormData();
    if (foto) {
      formData.append('foto', foto);
    }
    formData.append('tipo', tipo);
    formData.append('numeroCamas', numeroCamas.toString());
    formData.append('maximoPersonas', maximoPersonas.toString());
    formData.append('costeNoche', costeNoche.toString());
    formData.append('tipoCamas', JSON.stringify(tipoCamas));

    return this.http.put<boolean>(url, formData).pipe(
      map(() => true),
      tap(() => console.log('Categoria actualizada')),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  borrarCategoria(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/categorias/${id}`;

    return this.http.delete<boolean>(url).pipe(
      map(() => true),
      tap(() => console.log('Categoria borrada')),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  crearCategoria(
    tipoCamas: TipoCama[],
    tipo: string,
    numeroCamas: number,
    maximoPersonas: number,
    costeNoche: number,
    foto: File | null
  ): Observable<Categoria> {
    const url = `${this.baseUrl}/categorias`;
    const formData = new FormData();
    if (foto) {
      formData.append('foto', foto);
    }
    formData.append('tipo', tipo);
    formData.append('numeroCamas', numeroCamas.toString());
    formData.append('maximoPersonas', maximoPersonas.toString());
    formData.append('costeNoche', costeNoche.toString());
    formData.append('tipoCamas', JSON.stringify(tipoCamas));

    return this.http.post<Categoria>(url, formData).pipe(
      tap(() => console.log('Categoria creada')),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  // urlToFile(url: string): Promise<File> {
  //   return fetch(url)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const filename = url.substring(url.lastIndexOf('/') + 1);
  //       const mimeType = blob.type;
  //       return new File([blob], filename, { type: mimeType });
  //     });
  // }

  onImageEdit = async (imgUrl: string) => {
    var imgExt = this.getUrlExtension(imgUrl);

    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const file = new File([blob], this.getImgName(imgUrl) + imgExt, {
      type: blob.type,
    });

    return file;
  };

  private getUrlExtension = (url: string) => {
    return url.split(/[#?]/)[0].split('.').pop()!.trim();
  };

  private getImgName = (url: string) => {
    return url.substring(url.lastIndexOf('/') + 1);
  };

  // urlToFile(url: string): Promise<File> {
  //   const filename = url.substring(url.lastIndexOf('/') + 1);
  //   const mimeType = this.getMimeType(filename);

  //   return fetch(url)
  //     .then((response) => response.arrayBuffer())
  //     .then((buffer) => new File([buffer], filename, { type: mimeType }));
  // }

  // private getMimeType(filename: string): string {
  //   const extension = filename
  //     .substring(filename.lastIndexOf('.') + 1)
  //     .toLowerCase();
  //   switch (extension) {
  //     case 'jpg':
  //     case 'jpeg':
  //       return 'image/jpeg';
  //     case 'png':
  //       return 'image/png';
  //     case 'gif':
  //       return 'image/gif';
  //     default:
  //       return 'application/octet-stream';
  //   }
  // }
}
