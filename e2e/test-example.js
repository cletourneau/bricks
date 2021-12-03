import {Selector} from 'testcafe';

fixture`The home page`
    .page`http://localhost:1234`;

test('contains a title', async t => {
    await t
        .expect(Selector('h1').innerText).eql('Game of Bricks!')
});

test('contains a canvas to draw the game on', async t => {
    const canvas = Selector('#gameCanvas');
    await t
        .expect(canvas.getAttribute('width')).eql('1600')
        .expect(canvas.getAttribute('height')).eql('900')
})