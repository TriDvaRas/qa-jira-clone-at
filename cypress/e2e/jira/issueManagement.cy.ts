import * as data from '../../fixtures/data.json'
import * as selectors from '../../fixtures/selectors.json'

describe('Dashboard', () => {
  beforeEach(() => {
    cy.goToDashboardPage()
  })

  it('Should create new issue', () => {
    // Verify that issue with new issue name does not exist in the backlog.
    cy.get(selectors.backlogContainer)
      .children()
      .should('not.contain', data.createIssueSummary);
    // Click on the create issue button.
    cy.get(selectors.createIssueButton).click();

    // Verify that the create issue dialog is visible.
    cy.get(selectors.createIssueModal).should('be.visible');

    // Enter the issue title.
    cy.get(selectors.createIssueSummaryField).type(data.createIssueSummary);

    // Click on the create issue button.
    cy.get(selectors.submitIssueButton).click();

    // wait for issue to be created
    cy.wait(15000)

    // Verify that the create issue dialog is not visible.
    cy.get(selectors.createIssueModal).should('not.exist');

    // wait for dashboard to update (showcase version ui updates are very slow...)
    cy.wait(20000)

    // Verify that the issue is visible in the backlog.
    cy.get(selectors.backlogContainer)
      .children()
      .should('contain', data.createIssueSummary);
  })
  
  it('Should edit existing issue', () => {
    // Verify that issue with new issue name does not exist in the backlog.
    cy.get(selectors.backlogContainer)
      .children()
      .should('not.contain', data.createIssueSummary);
    // open issue detailed view
    cy.openDetailedIssueView()

    // clear issue title
    cy.get(selectors.editIssueSummaryField).click().clear()

    // change the issue title.
    cy.get(selectors.editIssueSummaryField).click().type(data.createIssueSummary);

    // Close detailde view
    cy.get(selectors.closeIssueEditButton).click();

    // Verify that the edit issue dialog is not visible.
    cy.get(selectors.detailsViewModal).should('not.exist');

    // Verify that the issue is visible in the backlog.
    cy.get(selectors.backlogContainer)
      .children()
      .should('contain', data.createIssueSummary);
  })

})






