import { Component, Injectable, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environment.development';
import { PageListComponent } from '../../pages/page-list/page-list.component';
import { read, utils } from 'xlsx';


@Component({
  selector: 'cer-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  allData: any[] = []; // Agrega una referencia a todos los datos
  data: any[] = [];
  totalRecords = 0;
  title = sessionStorage.getItem('selectedCursoNom');

  metaDataColumns: MetaDataColumn[] = [
    { field: 'ced_par', title: 'CEDULA' },
    { field: 'nom_pat_par', title: '1ER NOMBRE' },
    { field: 'nom_mat_par', title: '2DO NOMBRE' },
    { field: 'ape_pat_par', title: '1ER APELLIDO' },
    { field: 'ape_mat_par', title: '2DO APELLIDO' },
    { field: 'email_par', title: 'EMAIL' },
    { field: 'telf_par', title: 'TELEFONO' },
  ];

  constructor(
    private snackBar: MatSnackBar,
    private pageListComponent: PageListComponent
  ) {}

  ngOnInit(): void {
    // Puedes agregar lógica de inicialización si es necesario
    // this.loadParticipantes();
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
  users: any[] = [];
  csvImport($event: any) {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const row = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          this.data = row;
          console.log('DATA : ', this.data);
        }
      };
      reader.readAsArrayBuffer(file);
    }
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
