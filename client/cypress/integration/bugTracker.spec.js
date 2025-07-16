describe('Bug Tracker', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('displays the app title', () => {
    cy.contains('h1', 'Bug Tracker');
  });

  it('can create a new bug', () => {
    cy.get('input[name="title"]').type('New Bug');
    cy.get('textarea[name="description"]').type('Bug description');
    cy.get('button[type="submit"]').click();
    
    cy.contains('.bug-item', 'New Bug').should('exist');
  });

  it('shows validation errors for empty form', () => {
    cy.get('button[type="submit"]').click();
    
    cy.contains('Title is required').should('exist');
    cy.contains('Description is required').should('exist');
  });

  it('can update a bug status', () => {
    // First create a bug
    cy.get('input[name="title"]').type('Bug to update');
    cy.get('textarea[name="description"]').type('Will be updated');
    cy.get('button[type="submit"]').click();
    
    // Update the status
    cy.contains('.bug-item', 'Bug to update')
      .find('select')
      .select('in-progress');
    
    cy.contains('.bug-item', 'Bug to update')
      .contains('in-progress')
      .should('exist');
  });

  it('can delete a bug', () => {
    // First create a bug
    cy.get('input[name="title"]').type('Bug to delete');
    cy.get('textarea[name="description"]').type('Will be deleted');
    cy.get('button[type="submit"]').click();
    
    // Delete the bug
    cy.contains('.bug-item', 'Bug to delete')
      .find('button')
      .contains('Delete')
      .click();
    
    cy.contains('.bug-item', 'Bug to delete').should('not.exist');
  });
});