describe('Sipariş Formu', () => {
    it('ad soyad alanına metin girmelidir', () => {
      cy.visit('http://localhost:5173/siparis-formu');
  
      cy.get('[data-cy="ad-input"]').type('Melis Gizem Ozdemir')
        .should('have.value', 'Melis Gizem Ozdemir');
    });
  });

  describe('Sipariş Formu', () => {
    it('birden fazla malzeme seçilebilmelidir', () => {
      cy.visit('http://localhost:5173/siparis-formu');
  
      cy.get('[data-cy="malzeme-checkbox-Pepperoni"]').check();
      cy.get('[data-cy="malzeme-checkbox-Pepperoni"]').should('be.checked');
  
      cy.get('[data-cy="malzeme-checkbox-Mantar"]').check();
      cy.get('[data-cy="malzeme-checkbox-Mantar"]').should('be.checked');
  
      cy.get('[data-cy="malzeme-checkbox-Sosis"]').check();
      cy.get('[data-cy="malzeme-checkbox-Sosis"]').should('be.checked');
  
      cy.get('[data-cy="malzeme-checkbox-Jalapeno"]').check();
      cy.get('[data-cy="malzeme-checkbox-Jalapeno"]').should('be.checked');
  
      cy.get('[data-cy="malzeme-checkbox-Ananas"]').check();
      cy.get('[data-cy="malzeme-checkbox-Ananas"]').should('be.checked');
  
    });
});


describe('Sipariş Formu Gönderme', () => {
    it('formu göndermeli ve başarılı bir yanıt almalı', () => {
        cy.visit('http://localhost:5173/siparis-formu');

        cy.get('[data-cy="ad-input"]').type('Melis Gizem Ozdemir').should('have.value', 'Melis Gizem Ozdemir');

        cy.get('[name="hamur"]').select('ince');

        cy.get('[name="boyut"]').check('kucuk');

        cy.get('[data-cy="malzeme-checkbox-Pepperoni"]').check();
        cy.get('[data-cy="malzeme-checkbox-Mantar"]').check();
        cy.get('[data-cy="malzeme-checkbox-Jalapeno"]').check();
        cy.get('[data-cy="malzeme-checkbox-Ananas"]').check();

        cy.get('[name="notlar"]').type('Lütfen acı sos ekleme.');

        cy.get('form').submit();

        cy.location('pathname').should('include', '/siparis-onayi');

    });
});
