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
          tags: ['Swift', 'Machine Learning', 'Chess']
        },
        {
          title: 'Gasoprice',
          description: 'Built a PWA that fetches real-time gas prices for all Spanish gas stations and then displays the closest ones to the user, ' +
                       'allowing for fine-grained filtering by fuel type, brand and prices. It also allows users to see a map view of the stations.',
          link: 'https://gasoprice.com',
          tags: ['PWA', 'Flask', 'Python', 'API']
        },
		{
		  title: 'API',
		  description: 'Developed using the [Vapor](https://vapor.codes/) framework an API to replace my old inefficient Flask API, with various endpoints ' +
					   'such as: Retrieving bus times, fetching my favorite stations, grabbing the song I am currently listening to and a few other more ' +
					   '(such as serving the .js used to display this very list)',
		  link: 'https://api.intron014.com',
		  tags: ['Swift', 'API', 'Vapor']
		}
    ]
};
window.addEventListener('load', () => populateCV(cvData));