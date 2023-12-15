import { Component, Injectable, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environment.development';
import { PageListComponent } from '../../pages/page-list/page-list.component';

@Component({
  selector: 'cer-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  allData: any[] = []; // Agrega una referencia a todos los datos
  data: any[] = [
    {
      id_cate: 1,
      fecha_gen_cer: '2023-01-01',
      ced_par: '1234567890',
      email_par: 'example@email.com',
      url_gen_cer: 'certificado1.pdf',
      estado_cer: 'Aprobado',
    },
    {
      id_cate: 2,
      fecha_gen_cer: '2023-01-02',
      ced_par: '9876543210',
      email_par: 'another@example.com',
      url_gen_cer: 'certificado2.pdf',
      estado_cer: 'Pendiente',
    },
    {
      id_cate: 2,
      fecha_gen_cer: '2023-01-02',
      ced_par: '9876543210',
      email_par: 'another@example.com',
      url_gen_cer: 'certificado2.pdf',
      estado_cer: 'Pendiente',
    },
    {
      id_cate: 2,
      fecha_gen_cer: '2023-01-02',
      ced_par: '9876543210',
      email_par: 'another@example.com',
      url_gen_cer: 'certificado2.pdf',
      estado_cer: 'Pendiente',
    },
    {
      id_cate: 2,
      fecha_gen_cer: '2023-01-02',
      ced_par: '9876543210',
      email_par: 'another@example.com',
      url_gen_cer: 'certificado2.pdf',
      estado_cer: 'Pendiente',
    },
    {
      id_cate: 2,
      fecha_gen_cer: '2023-01-02',
      ced_par: '9876543210',
      email_par: 'another@example.com',
      url_gen_cer: 'certificado2.pdf',
      estado_cer: 'Pendiente',
    },
    {
      id_cate: 2,
      fecha_gen_cer: '2023-01-02',
      ced_par: '9876543210',
      email_par: 'another@example.com',
      url_gen_cer: 'certificado2.pdf',
      estado_cer: 'Pendiente',
    },

    // Agrega más objetos según sea necesario
  ];
  totalRecords = 0;
  title = sessionStorage.getItem('selectedCursoNom');

  metaDataColumns: MetaDataColumn[] = [
    { field: 'id_cate', title: 'ID' },
    { field: 'fecha_gen_cer', title: 'FECHA EMITIDA' },
    { field: 'ced_par', title: 'CEDULA PARTICIPANTE' },
    { field: 'email_par', title: 'EMAIL PARTICIPANTE' },
    { field: 'url_gen_cer', title: 'CERTIFICADO' },
    { field: 'estado_cer', title: 'ESTADO' },
  ];

  constructor(
    private snackBar: MatSnackBar,
    private pageListComponent: PageListComponent
  ) {}

  ngOnInit(): void {
    // Puedes agregar lógica de inicialización si es necesario
    this.loadParticipantes();
  }

  saveData() {
    // Puedes agregar lógica de guardado si es necesario
  }

  showMessage(message: string, duration: number = 5000, action: string = 'Ok') {
    this.snackBar.open(message, action, { duration, verticalPosition: 'top' });
  }

  changePage(page: number) {
    let tamReg = environment.PAGE_SIZE;
    tamReg = 4;
    const pageSize = tamReg;
    const startIndex = pageSize * page;

    // Hace referencia a 'allData' en lugar de 'data'
    this.data = this.allData.slice(startIndex, startIndex + pageSize);
    this.totalRecords = this.allData.length;
  }

  loadParticipantes() {
    console.log(sessionStorage.getItem('selectedCursoId'));
    // Puedes cargar datos dinámicamente si es necesario
    // this.certificadoService.loadCertificadosByCursos('19').subscribe({
    //   next: (res) => {
    //     this.allData = res.data;
    //     this.changePage(0);
    //   },
    //   error: (err) => this.showMessage('Error al cargar los participantes'),
    // });

    // Carga datos estáticos (simulación)
    this.allData = [
      {
        id_cate: 1,
        fecha_gen_cer: '2023-01-01',
        ced_par: '1234567890',
        email_par: 'example@email.com',
        url_gen_cer: 'certificado1.pdf',
        estado_cer: 'Aprobado',
      },
      {
        id_cate: 2,
        fecha_gen_cer: '2023-01-02',
        ced_par: '9876543210',
        email_par: 'another@example.com',
        url_gen_cer: 'certificado2.pdf',
        estado_cer: 'Pendiente',
      },
      {
        id_cate: 2,
        fecha_gen_cer: '2023-01-02',
        ced_par: '9876543210',
        email_par: 'another@example.com',
        url_gen_cer: 'certificado2.pdf',
        estado_cer: 'Pendiente',
      },
      {
        id_cate: 2,
        fecha_gen_cer: '2023-01-02',
        ced_par: '9876543210',
        email_par: 'another@example.com',
        url_gen_cer: 'certificado2.pdf',
        estado_cer: 'Pendiente',
      },
      {
        id_cate: 2,
        fecha_gen_cer: '2023-01-02',
        ced_par: '9876543210',
        email_par: 'another@example.com',
        url_gen_cer: 'certificado2.pdf',
        estado_cer: 'Pendiente',
      },
      // ... Agrega más objetos según sea necesario
    ];

    this.changePage(0);
  }
}
