export class Categoria {
    id_cate: number;
    nom_cate: string;
    desc_cate: string;
  
    constructor(id_cate: number, nom_cate: string, desc_cate: string) {
      this.id_cate = id_cate;
      this.nom_cate = nom_cate;
      this.desc_cate = desc_cate;
    }
  }