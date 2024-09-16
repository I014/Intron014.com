const cvData = {
    education: [
    
    ],
    experience: [
    
    ],
    skills: [
    
    ],
    projects: [
        {
          title: 'Reldus',
          description: 'Developed a chess engine in Swift that leverages an AI decision tree with alpha-beta pruning to predict optimal moves. ' + 
                      'The engine communicates using the standard [UCI protocol](https://www.chessprogramming.org/UCI) and supports advanced chess rules including castling, en passant, threefold repetition, and pawn promotion.',
          link: 'https://github.com/Intron014/Reldus',
          tags: ['Swift', 'AI', 'Chess']
        },
        {
          title: 'Gasoprice',
          description: 'Built a PWA that fetches real-time gas prices for all Spanish gas stations and then displays the closest ones to the user, ' +
                      'allowing for fine-grained filtering by fuel type, brand and prices. It also allows users to see a map view of the stations.',
          link: 'https://gasoprice.com',
          tags: ['PWA', 'Flask', 'Python', 'API']
        }
    ]
};
window.addEventListener('load', () => populateCV(cvData));