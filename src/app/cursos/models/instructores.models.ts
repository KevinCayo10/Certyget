export class Instructores {
  ced_inst: string;
  nom_pat_inst: string;
  nom_mat_inst: string;
  ape_pat_inst: string;
  ape_mat_inst: string;
  telf_inst: string;
  dir_inst: string;
  ciud_inst: string;
  tit_inst: string;
  puesto_ins: string;
  url_firma: string;

  constructor(
    ced_inst: string,
    nom_pat_inst: string,
    nom_mat_inst: string,
    ape_pat_inst: string,
    ape_mat_inst: string,
    telf_inst: string,
    dir_inst: string,
    ciud_inst: string,
    tit_inst: string,
    puesto_ins: string,
    url_firma: string
  ) {
    (this.ced_inst = ced_inst),
      (this.nom_pat_inst = nom_pat_inst),
      (this.nom_mat_inst = nom_mat_inst),
      (this.ape_pat_inst = ape_pat_inst),
      (this.ape_mat_inst = ape_mat_inst),
      (this.telf_inst = telf_inst),
      (this.dir_inst = dir_inst),
      (this.ciud_inst = ciud_inst);
    this.tit_inst = tit_inst;
    this.puesto_ins = puesto_ins;
    this.url_firma = url_firma;
  }
}
