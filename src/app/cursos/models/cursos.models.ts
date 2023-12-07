/*
export class Cursos {
  id_cur: string;
  nom_cur: string;
  fecha_inicio_cur: string;
  fecha_fin_cur: string;
  dur_cur: string;
  id_cate_cur: string;
  nom_cate: string;
  id_cur_cer: string;
  url_cer: string;

  constructor(
    id_cur: string,
    nom_cur: string,
    fecha_inicio_cur: string,
    fecha_fin_cur: string,
    dur_cur: string,
    id_cate_cur: string,
    nom_cate: string,
    id_cur_cer: string,
    url_cer: string
  ) {
    (this.id_cur = id_cur),
      (this.nom_cur = nom_cur),
      (this.fecha_inicio_cur = fecha_inicio_cur),
      (this.fecha_fin_cur = fecha_fin_cur),
      (this.dur_cur = dur_cur),
      (this.id_cate_cur = id_cate_cur),
      (this.nom_cate = nom_cate),
      (this.id_cur_cer = id_cur_cer),
      (this.url_cer = url_cer);
  }
}
*/
export class Cursos {
  success: number;
  data: Cursos[];

  constructor(success: number, data: Cursos[]) {
    this.success = success;
    this.data = data;
  }
}
