export class SmartTablePage {
    editRowAgeByName(name, age){
        cy.get('tbody').contains('tr', name).then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[ng-reflect-name="age"]').clear().type(age)
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', age)
        })
    }

    addNewTableItemWithNameAndSurname(name, surname){
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type(name)
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type(surname)
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })

        cy.get('tbody tr').eq(0).find('td').then(tableColumn =>{
            cy.wrap(tableColumn).eq(2).should('contain', 'Anna')
            cy.wrap(tableColumn).eq(3).should('contain', 'Smith')
        })
    }

    deleteTableItemByIndex(index){
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').eq(index).find('.ng2-smart-action-delete-delete').click().then(() => {
            cy.expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })
    }
}

export const onSmartTablePage = new SmartTablePage()