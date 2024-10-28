import 'cypress-xpath';

describe('Pruebas para buscar propiedades en BN Venta de bienes', function() {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  beforeEach(function() {
    cy.visit('https://www.bnventadebienes.com/properties/search');
  });
  
  afterEach(function() {
    cy.reload();
  });

/*
    Caso 1: Búsqueda de propiedades según provincia
    Objetivo: Verificar que se pueden buscar propiedades por provincia.
    Datos de prueba: Provincia seleccionada: 'Alajuela'.
    Resultado esperado: Las propiedades devueltas deben contener 'Alajuela' en su descripción.
*/
  it('Buscar propiedad por provincia', () => {
    cy.xpath('/html/body/div[3]/div[4]/form/div/div[1]/div[3]/div/select').select('Alajuela');
    cy.xpath('/html/body/div[3]/div[4]/form/div/div[2]/div[2]/button').click();

    cy.xpath('/html/body/div[3]/div[5]/div/div[2]/div[1]/a').each(($el) => {
      cy.wrap($el).find('div > div > div:nth-child(2) > div:nth-child(2)').should('contain', 'Alajuela');
    });
  });

/*
    Caso 2: Búsqueda de propiedades al incluir filtro de descuento
    Objetivo: Verificar que se pueden buscar propiedades al incluir el filtro de descuento
    Datos de prueba: Checkbox de descuento marcado
    Resultado esperado: Las propiedades devueltas deben mostrar información sobre el descuento.
*/
  it('Buscar propiedad al incluir filtro de descuento', () => {
    cy.xpath('/html/body/div[3]/div[4]/form/div/div[2]/div[1]/div/div[2]/input[1]').check();
    cy.xpath('/html/body/div[3]/div[4]/form/div/div[2]/div[2]/button').click();

    cy.xpath('/html/body/div[3]/div[5]/div/div[2]/div[1]/a').each(($el) => {
      cy.wrap($el).xpath('./div/div/div[1]/div/div/strong').should('exist');
    });
  });

/*
    Caso 3: Búsqueda sin filtros
    Objetivo: Verificar el comportamiento de la búsqueda cuando no se selecciona ningún filtro
    Datos de prueba: NA
    Resultado esperado: Debe mostrarse una lista de propiedades disponibles
*/
  it('Buscar sin seleccionar o ingresar un filtro ', () => {
    cy.xpath('/html/body/div[3]/div[4]/form/div/div[2]/div[2]/button').click();
    cy.xpath('/html/body/div[3]/div[5]/div/div[2]/div[1]').should('exist');
  });

/*
    Caso 4: Búsqueda de propiedades al incluir filtro de Novedad
    Objetivo: Verificar que se pueden buscar propiedades al incluir el filtro de novedad.
    Datos de prueba: Checkbox de novedad marcado.
    Resultado esperado: Las propiedades devueltas deben estar marcadas como Nuevo Ingeso.
*/
  it('Buscar propiedad al incluir filtro de novedad', () => {
    cy.xpath('/html/body/div[3]/div[4]/form/div/div[2]/div[1]/div/div[4]/input[1]').check();
    cy.xpath('/html/body/div[3]/div[4]/form/div/div[2]/div[2]/button').click();

    cy.xpath('/html/body/div[3]/div[5]/div/div[2]/div[1]/a').each(($el) => {
      cy.wrap($el).xpath('/html/body/div[3]/div[5]/div/div[2]/div[1]/a[2]/div/div/div[1]/div/strong').should('exist');
    });
  });

});
