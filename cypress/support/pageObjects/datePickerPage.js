function selectTestDay(day){
    let date = new Date()
    date.setDate(date.getDate() - day)
    let testDate = date.getDate()
    let previousMonth = date.toLocaleDateString('en-US', {month: 'short'})
    let previousYear = date.getFullYear()
    let assertDate = `${previousMonth} ${testDate}, ${previousYear}`
    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute =>{
        if(!dateAttribute.includes(previousMonth) || !dateAttribute.includes(previousYear)){
            cy.get('nb-calendar-pageable-navigation').find('[data-name="chevron-left"]').click()
            selectTestDay(day)
        }
        else {
            cy.get('.day-cell').not('.bounding-month').contains(testDate).click()
        }
    })
    return assertDate
}

export class DatePickerPage {
    selectCommonDatePickerDateFromToday(testDay){

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()

            const assertDate = selectTestDay(testDay)
            cy.wrap(input).invoke('prop', 'value').should('contain', assertDate)
            cy.wrap(input).should('have.value', assertDate) 
        })
         
    }

    selectDatePickerWithRange(testDay1, testDay2){
        cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
            cy.wrap(input).click()

            const assertDate1 = selectTestDay(testDay1)
            const assertDate2 = selectTestDay(testDay2)
            cy.wrap(input).invoke('prop', 'value').should('contain', assertDate1)
            cy.wrap(input).invoke('prop', 'value').should('contain', assertDate2)
            cy.wrap(input).should('contain.value', assertDate1) 
            cy.wrap(input).should('contain.value', assertDate2) 
        })
    }

}

export const onDatePickerPage = new DatePickerPage()