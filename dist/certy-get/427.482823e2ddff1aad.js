"use strict";(self.webpackChunkCertyGet=self.webpackChunkCertyGet||[]).push([[427],{6427:(V,Z,i)=>{i.r(Z),i.d(Z,{InstructoresModule:()=>H});var h=i(6814),v=i(1896),C=i(5516),x=i(5861),s=i(6223),c=i(9347),t=i(5879),b=i(2939),I=i(6593),P=i(9862);let A=(()=>{class a{constructor(e){this.http=e,this.myAppUrl=C.N.endpoint,this.myApiUrl="/api/instructor"}loadInstructores(){return this.http.get(`${this.myAppUrl}${this.myApiUrl}`)}addInstructor(e){return this.http.post(`${this.myAppUrl}${this.myApiUrl}`,e)}updateInstructor(e,o){return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${e}`,o)}deleteInstructor(e){return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${e}`)}static#t=this.\u0275fac=function(o){return new(o||a)(t.LFG(P.eN))};static#e=this.\u0275prov=t.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"})}return a})();var f=i(2296),y=i(617),M=i(1274),g=i(9157),N=i(2032),T=i(3814),F=i(8525),D=i(3680);function O(a,d){if(1&a&&(t.TgZ(0,"mat-option",25),t._uU(1),t.qZA()),2&a){const e=d.$implicit;t.Q6J("value",e),t.xp6(1),t.hij(" ",e," ")}}function E(a,d){if(1&a&&(t.TgZ(0,"div",26),t._UZ(1,"img",27),t.qZA()),2&a){const e=t.oxw();t.xp6(1),t.Q6J("src",e.previsualizacion,t.LSH)}}let J=(()=>{class a{constructor(e,o,n,r,l,K){var W=this;this.reference=e,this.formBuilder=o,this.snackBar=n,this.sanitizer=r,this.instructoresService=l,this.data=K,this.archivos=[],this.title="",this.isEdit=!1,this.puestos=["Decano","Coordinador de Carrera","Docente","Coordinador de Unidad de Investigaci\xf3n"],this.extraerBase64=function(){var j=(0,x.Z)(function*(p){return new Promise(_=>{try{const U=window.URL.createObjectURL(p),X=W.sanitizer.bypassSecurityTrustUrl(U),u=new FileReader;u.readAsDataURL(p),u.onload=()=>{_({blob:p,image:X,base:u.result})},u.onerror=()=>{_({blob:null,image:null,base:null})}}catch{_({blob:null,image:null,base:null})}})});return function(p){return j.apply(this,arguments)}}()}ngOnInit(){this.title=this.data?"EDITAR USUARIO":"NUEVO USUARIO",this.isEdit=!!this.data,this.loadForm()}loadForm(){this.emp_form=this.formBuilder.group({ced_inst:[this.data?.ced_inst||"",s.kI.required],nom_pat_inst:[this.data?.nom_pat_inst||"",s.kI.required],nom_mat_inst:[this.data?.nom_mat_inst||"",s.kI.required],ape_pat_inst:[this.data?.ape_pat_inst||"",s.kI.required],ape_mat_inst:[this.data?.ape_mat_inst||"",s.kI.required],telf_inst:[this.data?.telf_inst||"",s.kI.required],dir_inst:[this.data?.dir_inst||"",s.kI.required],ciud_inst:[this.data?.ciud_inst||"",s.kI.required],tit_inst:[this.data?.tit_inst||"",s.kI.required],puesto_inst:[this.data?.puesto_inst||"",s.kI.required],url_firma:[this.data?.url_firma||""]}),this.previsualizacion=this.data?.url_firma||""}saveData(){if(this.emp_form.valid){const e=this.buildFormData();if(this.data)console.log(e),this.instructoresService.updateInstructor(this.data.ced_inst,e).subscribe(()=>{this.showMessage("Registro editado correctamente"),console.log("editando"+this.data.id+e),this.reference.close()},o=>{this.showMessage(o.error.message),console.log(o)});else try{const o=this.buildFormData();this.instructoresService.addInstructor(o).subscribe(()=>{this.showMessage("Registro ingresado correctamente"),this.reference.close()},n=>{this.showMessage(n.error.message)})}catch(o){console.log(o)}}}buildFormData(){const e=new FormData;e.append("ced_inst",this.emp_form.value.ced_inst),e.append("nom_pat_inst",this.emp_form.value.nom_pat_inst),e.append("nom_mat_inst",this.emp_form.value.nom_mat_inst),e.append("ape_pat_inst",this.emp_form.value.ape_pat_inst),e.append("ape_mat_inst",this.emp_form.value.ape_mat_inst),e.append("telf_inst",this.emp_form.value.telf_inst),e.append("dir_inst",this.emp_form.value.dir_inst),e.append("ciud_inst",this.emp_form.value.ciud_inst),e.append("tit_inst",this.emp_form.value.tit_inst),e.append("puesto_inst",this.emp_form.value.puesto_inst);const o=this.archivos[0];if(o)e.append("url_firma",o);else{const n=this.data?.url_firma;n&&(console.log(n),e.append("url_firma",n))}return e}showMessage(e,o=5e3,n="Ok"){this.snackBar.open(e,n,{duration:o,verticalPosition:"top"})}capturarFile(e){const o=e.target.files[0];this.extraerBase64(o).then(n=>{this.previsualizacion=n.base,console.log(n)}),this.archivos.push(o)}static#t=this.\u0275fac=function(o){return new(o||a)(t.Y36(c.so),t.Y36(s.qu),t.Y36(b.ux),t.Y36(I.H7),t.Y36(A),t.Y36(c.WI))};static#e=this.\u0275cmp=t.Xpm({type:a,selectors:[["cer-form"]],decls:83,vars:6,consts:[["mat-dialog-title",""],["fxLayout","","fxLayoutAlign","space-between center"],["mat-icon-button","","mat-dialog-close",""],[3,"formGroup","ngSubmit"],["mat-dialog-content","",1,"content"],[1,"outline"],["matInput","","type","text","placeholder","C\xe9dula","formControlName","ced_inst",3,"readonly"],["matSuffix",""],[1,"row"],["matInput","","type","text","placeholder","Nombre Paterno","formControlName","nom_pat_inst"],["matInput","","type","text","placeholder","Nombre Materno","formControlName","nom_mat_inst"],["matInput","","type","text","placeholder","Apellido Paterno","formControlName","ape_pat_inst"],["matInput","","type","text","placeholder","Apellido Materno","formControlName","ape_mat_inst"],["matInput","","type","text","placeholder","Tel\xe9fono","formControlName","telf_inst"],["matInput","","type","text","placeholder","Direcci\xf3n","formControlName","dir_inst"],["matInput","","type","text","placeholder","Ciudad","formControlName","ciud_inst"],["matInput","","type","text","placeholder","T\xedtulo","formControlName","tit_inst"],["placeholder","Selecciona un puesto","formControlName","puesto_inst"],[3,"value",4,"ngFor","ngForOf"],["for","fileInput",1,"custom-upload-btn"],["type","file","id","fileInput",3,"change"],["class","preview-container",4,"ngIf"],["mat-dialog-actions","",1,"action"],["mat-button","","color","primary","type","button","mat-dialog-close",""],["mat-raised-button","","color","primary","type","submit",3,"disabled"],[3,"value"],[1,"preview-container"],["alt","","width","250px","height","250px",1,"imgp",3,"src"]],template:function(o,n){1&o&&(t.TgZ(0,"div",0)(1,"mat-toolbar",1)(2,"h3"),t._uU(3),t.qZA(),t.TgZ(4,"button",2)(5,"mat-icon"),t._uU(6,"close"),t.qZA()()()(),t.TgZ(7,"form",3),t.NdJ("ngSubmit",function(){return n.saveData()}),t.TgZ(8,"div",4)(9,"mat-form-field",5)(10,"mat-label"),t._uU(11,"C\xe9dula"),t.qZA(),t._UZ(12,"input",6),t.TgZ(13,"mat-icon",7),t._uU(14,"credit_card"),t.qZA()(),t.TgZ(15,"div",8)(16,"mat-form-field",5)(17,"mat-label"),t._uU(18,"Nombre Paterno"),t.qZA(),t._UZ(19,"input",9),t.TgZ(20,"mat-icon",7),t._uU(21,"person"),t.qZA()(),t.TgZ(22,"mat-form-field",5)(23,"mat-label"),t._uU(24,"Nombre Materno"),t.qZA(),t._UZ(25,"input",10),t.TgZ(26,"mat-icon",7),t._uU(27,"person"),t.qZA()()(),t.TgZ(28,"div",8)(29,"mat-form-field",5)(30,"mat-label"),t._uU(31,"Apellido Paterno"),t.qZA(),t._UZ(32,"input",11),t.TgZ(33,"mat-icon",7),t._uU(34,"person"),t.qZA()(),t.TgZ(35,"mat-form-field",5)(36,"mat-label"),t._uU(37,"Apellido Materno"),t.qZA(),t._UZ(38,"input",12),t.TgZ(39,"mat-icon",7),t._uU(40,"person"),t.qZA()()(),t.TgZ(41,"div",8)(42,"mat-form-field",5)(43,"mat-label"),t._uU(44,"Tel\xe9fono"),t.qZA(),t._UZ(45,"input",13),t.TgZ(46,"mat-icon",7),t._uU(47,"phone"),t.qZA()(),t.TgZ(48,"mat-form-field",5)(49,"mat-label"),t._uU(50,"Direcci\xf3n"),t.qZA(),t._UZ(51,"input",14),t.TgZ(52,"mat-icon",7),t._uU(53,"location_on"),t.qZA()()(),t.TgZ(54,"div",8)(55,"mat-form-field",5)(56,"mat-label"),t._uU(57,"Ciudad"),t.qZA(),t._UZ(58,"input",15),t.TgZ(59,"mat-icon",7),t._uU(60,"location_city"),t.qZA()(),t.TgZ(61,"mat-form-field",5)(62,"mat-label"),t._uU(63,"T\xedtulo"),t.qZA(),t._UZ(64,"input",16),t.TgZ(65,"mat-icon",7),t._uU(66,"school"),t.qZA()()(),t.TgZ(67,"div",8)(68,"mat-form-field",5)(69,"mat-label"),t._uU(70,"Puesto"),t.qZA(),t.TgZ(71,"mat-select",17),t.YNc(72,O,2,2,"mat-option",18),t.qZA()()(),t.TgZ(73,"div",8)(74,"label",19),t._uU(75,"Subir Archivo"),t.qZA(),t.TgZ(76,"input",20),t.NdJ("change",function(l){return n.capturarFile(l)}),t.qZA()(),t.YNc(77,E,2,1,"div",21),t.qZA(),t.TgZ(78,"div",22)(79,"button",23),t._uU(80," Cancelar "),t.qZA(),t.TgZ(81,"button",24),t._uU(82," Grabar "),t.qZA()()()),2&o&&(t.xp6(3),t.Oqu(n.title),t.xp6(4),t.Q6J("formGroup",n.emp_form),t.xp6(5),t.Q6J("readonly",n.isEdit),t.xp6(60),t.Q6J("ngForOf",n.puestos),t.xp6(5),t.Q6J("ngIf",n.previsualizacion),t.xp6(4),t.Q6J("disabled",n.emp_form.invalid))},dependencies:[h.sg,h.O5,f.lW,f.RK,y.Hw,M.Ye,c.ZT,c.uh,c.xY,c.H8,g.KE,g.hX,g.R9,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u,N.Nt,T.xw,T.Wh,F.gD,D.ey],styles:[".content[_ngcontent-%COMP%]{padding-top:10px}.row[_ngcontent-%COMP%]{display:flex;gap:10px}mat-form-field[_ngcontent-%COMP%]{width:100%}.action[_ngcontent-%COMP%]{padding:0 25px 20px}.action[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex:1}mat-toolbar[_ngcontent-%COMP%]{background:rgba(0,0,0,.8);color:#f5f5f5;border-bottom:1px solid #ccc;border-radius:0 60px 0 0}.row[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%]{display:none}.custom-upload-btn[_ngcontent-%COMP%]{background-color:#2196f3;color:#fff;padding:10px 15px;border:none;border-radius:4px;cursor:pointer;transition:background-color .3s ease;display:inline-block}.custom-upload-btn[_ngcontent-%COMP%]:hover{background-color:#1565c0}.preview-container[_ngcontent-%COMP%]{border:1px solid #ccc;padding:10px;margin-top:10px}.row[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;max-height:150px;margin:0 auto}"]})}return a})();var S=i(4860),B=i(2580),R=i(9711),q=i(2823),L=i(3471),k=i(2596),m=i(5313),w=i(1586);function Y(a,d){1&a&&(t.TgZ(0,"th",7),t._uU(1,"Acciones"),t.qZA())}function z(a,d){if(1&a){const e=t.EpF();t.TgZ(0,"td",8)(1,"button",9),t.NdJ("click",function(){const r=t.CHM(e).$implicit,l=t.oxw();return t.KtG(l.openForm(r))}),t.TgZ(2,"mat-icon"),t._uU(3,"edit"),t.qZA()(),t.TgZ(4,"button",10),t.NdJ("click",function(){const r=t.CHM(e).$implicit,l=t.oxw();return t.KtG(l.delete(r.ced_inst))}),t.TgZ(5,"mat-icon"),t._uU(6,"delete"),t.qZA()()()}}const G=[{path:"",component:(()=>{class a{constructor(e,o,n){this.dialog=e,this.instructoresService=o,this.snackBar=n,this.data=[],this.metaDataColumns=[{field:"ced_inst",title:"C\xe9dula"},{field:"nom_pat_inst",title:"Nombre Paterno"},{field:"nom_mat_inst",title:"Nombre Materno"},{field:"ape_pat_inst",title:"Apellido Paterno"},{field:"ape_mat_inst",title:"Apellido Materno"},{field:"telf_inst",title:"Tel\xe9fono"},{field:"dir_inst",title:"Direcci\xf3n"},{field:"ciud_inst",title:"Ciudad"},{field:"tit_inst",title:"T\xedtulo"},{field:"puesto_inst",title:"Puesto"},{field:"url_firma",title:"URL Firma"}],this.keypadButtons=[{icon:"add",tooltip:"AGREGAR",color:"primary",action:"NEW"}],this.totalRecords=this.data.length,this.loadInstructores()}changePage(e){const o=C.N.PAGE_SIZE,n=o*e;this.data=this.data.slice(n,n+o),console.log("aqui",this.data)}loadInstructores(){this.instructoresService.loadInstructores().subscribe(e=>{this.data=e.data,this.totalRecords=this.data.length,this.changePage(0)})}doAction(e){switch(e){case"DOWNLOAD":break;case"NEW":this.openForm()}}showBottonSheet(e,o,n,r){}openForm(e=null){this.dialog.open(J,{panelClass:"panel-container",disableClose:!0,data:e}).afterClosed().subscribe(r=>{this.loadInstructores()})}delete(e){this.instructoresService.deleteInstructor(e).subscribe({next:o=>{this.showMessage("Instructor eliminado exitosamente"),this.loadInstructores()},error:o=>{this.showMessage("Error al eliminar el instructor"),console.log(o)}})}showMessage(e,o=3e3,n="Cerrar"){this.snackBar.open(e,n,{duration:o,verticalPosition:"top"})}static#t=this.\u0275fac=function(o){return new(o||a)(t.Y36(c.uw),t.Y36(A),t.Y36(b.ux))};static#e=this.\u0275cmp=t.Xpm({type:a,selectors:[["cer-page-list"]],decls:9,vars:4,consts:[[1,"heightMaxScrollBar"],[3,"data","metaDataColumns"],["matColumnDef","actions"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","","class","alignButton",4,"matCellDef"],[3,"length","onChangePage"],[3,"keypadButtons","onClick"],["mat-header-cell",""],["mat-cell","",1,"alignButton"],["mat-icon-button","","color","primary","matTooltip","EDITAR",3,"click"],["mat-icon-button","","color","accent","matTooltip","ELIMINAR",3,"click"]],template:function(o,n){1&o&&(t._UZ(0,"cer-title"),t.TgZ(1,"cer-container")(2,"ng-scrollbar",0)(3,"cer-table",1),t.ynx(4,2),t.YNc(5,Y,2,0,"th",3),t.YNc(6,z,7,0,"td",4),t.BQk(),t.qZA()(),t.TgZ(7,"cer-paginator",5),t.NdJ("onChangePage",function(l){return n.changePage(l)}),t.qZA()(),t.TgZ(8,"cer-keypad-button",6),t.NdJ("onClick",function(l){return n.doAction(l)}),t.qZA()),2&o&&(t.xp6(3),t.Q6J("data",n.data)("metaDataColumns",n.metaDataColumns),t.xp6(4),t.Q6J("length",n.totalRecords),t.xp6(1),t.Q6J("keypadButtons",n.keypadButtons))},dependencies:[S.r,B.e,R.a,q.KC,f.RK,y.Hw,L.o,k.gM,m.fO,m.w1,m.Dz,m.ge,m.ev,w.J],styles:["mat-form-field[_ngcontent-%COMP%]{width:100%}"]})}return a})()}];let Q=(()=>{class a{static#t=this.\u0275fac=function(o){return new(o||a)};static#e=this.\u0275mod=t.oAB({type:a});static#o=this.\u0275inj=t.cJS({imports:[v.Bz.forChild(G),v.Bz]})}return a})();var $=i(2820);let H=(()=>{class a{static#t=this.\u0275fac=function(o){return new(o||a)};static#e=this.\u0275mod=t.oAB({type:a});static#o=this.\u0275inj=t.cJS({imports:[h.ez,Q,$.m]})}return a})()}}]);