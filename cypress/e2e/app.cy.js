describe('Zero Looper - Tests E2E', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8181');
  });

  describe('Charger une vidéo', () => {
    it('should load the page', () => {
      cy.get('h1').should('contain', 'Zero Looper');
      cy.get('#youtubeUrl').should('exist');
      cy.get('#loadVideoBtn').should('exist');
    });

    it('should show error when URL is empty', () => {
      cy.get('#loadVideoBtn').click();
      cy.get('#errorMessage').should('be.visible').should('contain', 'Veuillez entrer une URL YouTube');
    });

    it('should show error for invalid YouTube URL', () => {
      cy.get('#youtubeUrl').type('https://www.google.com');
      cy.get('#loadVideoBtn').click();
      cy.get('#errorMessage').should('be.visible').should('contain', 'invalide');
    });

    it('should load a valid YouTube video', () => {
      const validUrl = 'https://www.youtube.com/watch?v=jNQXAC9IVRw';
      cy.get('#youtubeUrl').type(validUrl);
      cy.get('#loadVideoBtn').click();
      cy.get('#successMessage').should('be.visible').should('contain', 'chargée');
      cy.get('#youtubeUrl').should('have.value', validUrl);
    });

    it('should support keyboard Enter to load video', () => {
      const validUrl = 'https://www.youtube.com/watch?v=jNQXAC9IVRw';
      cy.get('#youtubeUrl').type(validUrl + '{enter}');
      cy.get('#successMessage').should('be.visible');
    });

    it('should clear loops when loading new video', () => {
      const validUrl = 'https://www.youtube.com/watch?v=jNQXAC9IVRw';
      
      // Load video
      cy.get('#youtubeUrl').type(validUrl);
      cy.get('#loadVideoBtn').click();
      
      // Add loop
      cy.get('#loopName').type('Test Loop');
      cy.get('#loopStart').type('10');
      cy.get('#loopEnd').type('30');
      cy.get('form').contains('button', 'Ajouter').click();
      
      cy.get('#loopsList').should('contain', 'Test Loop');
      
      // Load new video
      cy.get('#youtubeUrl').clear().type('https://www.youtube.com/watch?v=jNQXAC9IVRw');
      cy.get('#loadVideoBtn').click();
      
      // Loops should be cleared
      cy.get('#emptyState').should('be.visible');
    });
  });

  describe('Ajouter des boucles', () => {
    beforeEach(() => {
      // Load a video first
      cy.get('#youtubeUrl').type('https://www.youtube.com/watch?v=jNQXAC9IVRw');
      cy.get('#loadVideoBtn').click();
      cy.get('#successMessage').should('be.visible');
    });

    it('should show error when loop name is empty', () => {
      cy.get('#loopStart').type('10');
      cy.get('#loopEnd').type('30');
      cy.get('form').contains('button', 'Ajouter').click();
      cy.get('#errorMessage').should('be.visible');
    });

    it('should show error when start >= end', () => {
      cy.get('#loopName').type('Test');
      cy.get('#loopStart').type('30');
      cy.get('#loopEnd').type('10');
      cy.get('form').contains('button', 'Ajouter').click();
      cy.get('#errorMessage').should('be.visible').should('contain', 'avant la fin');
    });

    it('should add a valid loop', () => {
      cy.get('#loopName').type('Solo');
      cy.get('#loopStart').type('10');
      cy.get('#loopEnd').type('30');
      cy.get('form').contains('button', 'Ajouter').click();
      
      cy.get('#loopsList').should('contain', 'Solo');
      cy.get('#loopsList').should('contain', '10s - 30s');
      cy.get('#successMessage').should('be.visible');
    });

    it('should add multiple loops', () => {
      // Add first loop
      cy.get('#loopName').type('Solo');
      cy.get('#loopStart').type('10');
      cy.get('#loopEnd').type('30');
      cy.get('form').contains('button', 'Ajouter').click();
      
      // Add second loop
      cy.get('#loopName').type('Refrain');
      cy.get('#loopStart').type('45');
      cy.get('#loopEnd').type('75');
      cy.get('form').contains('button', 'Ajouter').click();
      
      cy.get('#loopsList').should('contain', 'Solo');
      cy.get('#loopsList').should('contain', 'Refrain');
    });

    it('should clear form after adding loop', () => {
      cy.get('#loopName').type('Solo');
      cy.get('#loopStart').type('10');
      cy.get('#loopEnd').type('30');
      cy.get('form').contains('button', 'Ajouter').click();
      
      cy.get('#loopName').should('have.value', '');
      cy.get('#loopStart').should('have.value', '');
      cy.get('#loopEnd').should('have.value', '');
    });
  });

  describe('Supprimer les boucles', () => {
    beforeEach(() => {
      // Load a video
      cy.get('#youtubeUrl').type('https://www.youtube.com/watch?v=jNQXAC9IVRw');
      cy.get('#loadVideoBtn').click();
      
      // Add loops
      cy.get('#loopName').type('Solo');
      cy.get('#loopStart').type('10');
      cy.get('#loopEnd').type('30');
      cy.get('form').contains('button', 'Ajouter').click();
    });

    it('should delete a loop', () => {
      cy.get('#loopsList').should('contain', 'Solo');
      cy.get('#loopsList').contains('button', '✕').click();
      cy.get('#loopsList').should('not.contain', 'Solo');
      cy.get('#emptyState').should('be.visible');
    });
  });

  describe('URL et partage', () => {
    it('should update URL hash when video is loaded', () => {
      cy.get('#youtubeUrl').type('https://www.youtube.com/watch?v=jNQXAC9IVRw');
      cy.get('#loadVideoBtn').click();
      
      cy.location('hash').should('not.be.empty');
    });

    it('should display full URL in footer', () => {
      cy.get('#youtubeUrl').type('https://www.youtube.com/watch?v=jNQXAC9IVRw');
      cy.get('#loadVideoBtn').click();
      
      cy.get('#urlDisplay').invoke('val').should('include', 'http');
      cy.get('#urlDisplay').invoke('val').should('include', '#');
    });

    it('should copy URL to clipboard', () => {
      cy.get('#youtubeUrl').type('https://www.youtube.com/watch?v=jNQXAC9IVRw');
      cy.get('#loadVideoBtn').click();
      
      cy.get('#copyBtn').click();
      cy.get('#copyFeedback').should('be.visible').should('contain', 'copié');
    });

    it('should load from hash URL', () => {
      // Create encoded data
      const data = {
        url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
        loops: [
          { name: 'Solo', start: 10, end: 30 }
        ]
      };
      const encoded = encodeURIComponent(btoa(JSON.stringify(data)));

      cy.window().then((win) => {
        win.location.hash = encoded;
        win.location.reload();
      });

      cy.get('#youtubeUrl', { timeout: 10000 }).should('have.value', data.url);
      cy.get('#loopsList').should('contain', 'Solo');
    });
  });

  describe('UI et UX', () => {
    it('should show empty state initially', () => {
      cy.get('#emptyState').should('be.visible');
    });

    it('should hide empty state after adding loop', () => {
      cy.get('#youtubeUrl').type('https://www.youtube.com/watch?v=jNQXAC9IVRw');
      cy.get('#loadVideoBtn').click();
      
      cy.get('#loopName').type('Solo');
      cy.get('#loopStart').type('10');
      cy.get('#loopEnd').type('30');
      cy.get('form').contains('button', 'Ajouter').click();
      
      cy.get('#emptyState').should('not.be.visible');
    });

    it('should be responsive on mobile', () => {
      cy.viewport('iphone-x');
      cy.get('h1').should('contain', 'Zero Looper');
      cy.get('#youtubeUrl').should('be.visible');
    });
  });
});
