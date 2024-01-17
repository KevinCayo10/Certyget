import { TestBed } from '@angular/core/testing';

import { UsuariosService } from './usuarios.service';

describe('UsuariosService', () => {
  let service: UsuariosService;
  // Antes de cada prueba, configura el módulo de pruebas y obtiene una instancia del servicio
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosService);
  });
  // Prueba: Verifica que el servicio haya sido creado exitosamente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
