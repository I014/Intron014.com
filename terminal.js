class Terminal {
    constructor() {
        this.commands = {
            help: () => this.showHelp(),
            clear: () => this.clear(),
            cv: () => this.showCV(),
            whoami: () => this.showWhoami(),
            projects: () => this.showProjects(),
            contact: () => this.showContact(),
            exit: () => this.exitTerminal(),
            sl: () => this.showTrain()
        };
        this.trainFrames = [
            `
                                        ++      +------ 
                                        ||      |+-+ |  
                                      /---------|| | |  
                                     + ========  +-+ |  
                                    _|--/~\\------/~\\-+  
                                   //// \\_/      \\_/    
`,
            `
                              ++      +------ 
                              ||      |+-+ |  
                            /---------|| | |  
                           + ========  +-+ |  
                          _|--/~\\------/~\\-+  
                         //// \\_/      \\_/    
`,
            `
                    ++      +------ 
                    ||      |+-+ |  
                  /---------|| | |  
                 + ========  +-+ |  
                _|--/~\\------/~\\-+  
               //// \\_/      \\_/    
`,
            `
          ++      +------ 
          ||      |+-+ |  
        /---------|| | |  
       + ========  +-+ |  
      _|--/~\\------/~\\-+  
     //// \\_/      \\_/    
`
        ];
    }

    init() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 't' && !this.isActive()) {
                e.preventDefault(); 
                this.activate();
            }
        });
        this.historyIndex = -1;
        this.commandHistory = [];
    }

    isActive() {
        return document.querySelector('.terminal-mode').style.display === 'block';
    }

    activate() {
        document.querySelector('main').style.display = 'none';
        document.querySelector('footer').style.display = 'none';
        document.querySelector('.terminal-mode').style.display = 'block';
        this.focusInput();
        this.print('Welcome to Terminal OS v1.0');
        this.print('Type "help" for available commands\n');
    }

    exitTerminal() {
        document.querySelector('.terminal-mode').style.display = 'none';
        document.querySelector('main').style.display = 'block';
        document.querySelector('footer').style.display = 'block';
    }

    print(text, isError = false) {
        const output = document.createElement('div');
        output.className = isError ? 'terminal-error' : 'terminal-output';
        output.textContent = text;
        document.querySelector('.terminal-content').appendChild(output);
    }

    clear() {
        document.querySelector('.terminal-content').innerHTML = '';
    }

    showHelp() {
        const help = `
Available commands:
    help     - Show this help message
    clear    - Clear the terminal
    cv       - Show my CV
    whoami   - Show information about me
    projects - List my projects
    contact  - Show contact information
    exit     - Exit terminal mode
`;
        this.print(help);
    }

    showWhoami() {
        this.print("Intron014 (Jorge)\nSoftware Developer & Hardware Engineering Student\nLocated in Madrid, Spain");
    }

    showCV() {
        if (typeof cvData !== 'undefined') {
            if (cvData.education && cvData.education.length > 0) {
                this.print("\n=== Education ===");
                cvData.education.forEach(edu => {
                    this.print(`${edu.degree} - ${edu.institution} (${edu.year})`);
                });
            }

            if (cvData.experience && cvData.experience.length > 0) {
                this.print("\n=== Experience ===");
                cvData.experience.forEach(exp => {
                    this.print(`${exp.position} at ${exp.company} (${exp.year})`);
                });
            }

            if (cvData.skills && cvData.skills.length > 0) {
                this.print("\n=== Skills ===");
                cvData.skills.forEach(skill => {
                    this.print(`- ${skill}`);
                });
            }

            if ((!cvData.education || cvData.education.length === 0) && 
                (!cvData.experience || cvData.experience.length === 0) && 
                (!cvData.skills || cvData.skills.length === 0)) {
                this.print("No CV data available");
            }
        } else {
            this.print("CV data not available", true);
        }
    }

    showProjects() {
        if (typeof cvData !== 'undefined') {
            this.print("\n=== Projects ===");
            cvData.projects.forEach(project => {
                this.print(`\n${cvData.projects.indexOf(project) + 1}. ${project.name || project.title.replace(/<[^>]*>/g, '')}`);
                this.print(`Description: ${project.description}`);
                this.print(`Tags: ${project.tags.join(', ')}`);
                if (project.link) this.print(`Link: ${project.link}`);
            });
        } else {
            this.print("Project data not available", true);
        }
    }

    showContact() {
        this.print(`
Contact Information:
    Email:    me@intron014.com
    Mastodon: @intron014@x.intron014.com
    Twitter:  @intron014
    Telegram: @intron014
    GitHub:   @Intron014
`);
    }

    focusInput() {
        document.querySelector('.terminal-input').focus();
    }

    async showTrain() {
        const frames = 50;
        const delay = 100;
        
        for (let i = 0; i < frames; i++) {
            this.clear();
            const frameIndex = i % this.trainFrames.length;
            this.print(this.trainFrames[frameIndex]);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
        this.print('\nChoo choo!');
    }

    executeCommand(cmd) {
        const command = cmd.trim().toLowerCase();
        if (command) {
            this.commandHistory.push(command);
            this.historyIndex = this.commandHistory.length;
            
            if (this.commands[command]) {
                const result = this.commands[command]();
                if (result instanceof Promise) {
                    result.catch(error => {
                        this.print(`Error: ${error.message}`, true);
                    });
                }
            } else {
                this.print(`Command not found: ${command}`, true);
            }
        }
    }
}

// Initialize terminal
const terminal = new Terminal();
window.addEventListener('load', () => {
    terminal.init();
    
    const input = document.querySelector('.terminal-input');
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value;
            terminal.print(`> ${cmd}`);
            terminal.executeCommand(cmd);
            input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (terminal.historyIndex > 0) {
                terminal.historyIndex--;
                input.value = terminal.commandHistory[terminal.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (terminal.historyIndex < terminal.commandHistory.length - 1) {
                terminal.historyIndex++;
                input.value = terminal.commandHistory[terminal.historyIndex];
            } else {
                terminal.historyIndex = terminal.commandHistory.length;
                input.value = '';
            }
        }
    });
});
