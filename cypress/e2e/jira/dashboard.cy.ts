import * as data from '../../fixtures/data.json'
import * as selectors from '../../fixtures/selectors.json'

describe('Dashboard', () => {
  beforeEach(() => {
    cy.goToDashboardPage()
  })

  it('Should open issue detailed view', () => {
    cy.openDetailedIssueView()
  })

  it('Should search for issue by text', () => {
    // Enter search text into the search field.
    cy.get(selectors.dashboardTextSearchField).type(data.dashboardSearchText);

    // Verify that the inProgressContainer, selectedContainer, and backlogContainer have 0 children.
    cy.get(selectors.inProgressContainer).children().should('have.length', 0);
    cy.get(selectors.selectedContainer).children().should('have.length', 0);
    cy.get(selectors.backlogContainer).children().should('have.length', 0);

    // Verify that the doneContainer has only one child that contains the search text.
    cy.get(selectors.doneContainer)
      .children()
      .should('have.length', 1)
      .and('contain', data.dashboardSearchText);
  })

  it('Should search for issue by user', () => {
    // Select the user by clicking on their avatar.
    cy.get(selectors.dashboardUserSearchGabenAvatar).click();

    // Verify that the inProgressContainer, doneContainer have 0 children.
    cy.get(selectors.inProgressContainer).children().should('have.length', 0);
    cy.get(selectors.doneContainer).children().should('have.length', 0);

    // Verify that the selectedContainer and backlogContainer have only one child that contains the selected user's avatar.
    cy.get(selectors.backlogContainer)
      .children()
      .should('have.length', 1)
      .find(selectors.gabenAvatar)
      .should('exist');
    cy.get(selectors.selectedContainer)
      .children()
      .should('have.length', 1)
      .find(selectors.gabenAvatar)
      .should('exist');
  })
})






