const faker = require('faker')

const randomNumber = (num) => Math.floor(Math.random() * Math.floor(num) + 1)


const seedNotebooks = (numby) => {
    let i = 0

    while (i < numby) {
        const note1 = {
            noteBookId: randomNumber(29),
            body: faker.lorem.paragraphs(8),
        }
        const note2 = {
            noteBookId: randomNumber(29),
            body: faker.lorem.paragraphs(10),
        }
        const note3 = {
            noteBookId: randomNumber(29),
            body: faker.lorem.paragraphs(12),
        }
        console.log(note1, ',')
        console.log(note2, ',')
        console.log(note3, ',')
        i++
    }
}

seedNotebooks(300)