const goldSymbols = new Map([
    ['$', 3],
    ['&', 1],
    ['@', 5],
]);

const wallsSymbols = new Map([
    ['#', true],
    ['☼', false],
]);

const pillSymbol = 'S';

const heroSymbols = ['Ѡ', 'Я', 'R', 'Y', '◄', '►', ']', '[', '{', '}', '⊰', '⊱', '⍬', '⊲', '⊳', '⊅', '⊄', '⋜', '⋝']
const hunterSymbols = ['Q', '«', '»', '<', '>', 'X', 'Ѡ', 'Z', '⋈']
const playerSymbols = ['Z', ')', '(', 'U', 'Э', 'Є', '⋈', '⋊', '⋉', '⋕', '⊣', '⊢', '⊐', '⊏']

const ladderSymbols = ['H', '⋕', 'U', '⍬', 'Y'];
const pipeSymbols = ['~', '{', '}', '⋜', '⋝', 'Э', 'Є', '⊣', '⊢'];
const portalSymbol = '⊛';
const pitSymbols = ['*', '1', '2', '3', '4', 'X'];

module.exports = {
    goldSymbols,
    heroSymbols,
    hunterSymbols,
    playerSymbols,
    ladderSymbols,
    pipeSymbols,
    portalSymbol,
    pillSymbol,
    wallsSymbols,
    pitSymbols,
}

