describe('İsim Alanı Testi', () => {
    it('İsim alanına metin girildiğinde doğru değeri almalıdır', () => {
      cy.visit('http://localhost:5175/siparis-formu');
      const isim = 'Melis Gizem Ozdemir';
      cy.get('input[name="isim"]').type(isim).should('have.value', isim);
    });
  });
  
  describe('Malzeme Seçimi Testi', () => {
    it('Birden fazla malzeme seçilebilmelidir', () => {
      cy.visit('http://localhost:5175/siparis-formu');
      cy.get('.checkbox-container input[type="checkbox"]').check(['Pepperoni', 'Mantar']);
      cy.get('.checkbox-container input[type="checkbox"]').each($el => {
        expect($el).to.be.checked;
      });
    });
  });

  describe('Form Gönderme Testi', () => {
    it('Formu göndermeli ve başarılı mesajı almalıdır', () => {
      cy.visit('http://localhost:5175/siparis-formu');
      const isim = 'Melis Gizem Ozdemir';
      const malzemeler = ['Pepperoni', 'Mantar'];
      cy.get('input[name="isim"]').type(isim);
      cy.get('.checkbox-container input[type="checkbox"]').check(malzemeler);
      cy.get('button[type="submit"]').click();
      cy.contains('Siparişiniz başarıyla alındı').should('be.visible');
    });
  });
  
  