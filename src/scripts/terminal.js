class Terminal {
  constructor() {
    this.commandInput = document.getElementById('commandInput');
    this.output = document.getElementById('output');
    this.commandHistory = [];
    this.historyIndex = -1;
    this.init();
  }

  init() {
    this.addWelcomeMessage();
    this.commandInput.addEventListener('keydown', this.handleInput.bind(this));
    this.commandInput.focus();
  }

  addWelcomeMessage() {
    const welcomeMessage = `Welcome to Terminal v1.0.0
Type 'help' to see available commands.
`;
    this.addOutput(welcomeMessage);
  }

  handleInput(e) {
    if (e.key === 'Enter') {
      const command = this.commandInput.value.trim();
      if (command) {
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;
        this.executeCommand(command);
        this.commandInput.value = '';
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.commandInput.value = this.commandHistory[this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.commandHistory.length - 1) {
        this.historyIndex++;
        this.commandInput.value = this.commandHistory[this.historyIndex];
      } else {
        this.historyIndex = this.commandHistory.length;
        this.commandInput.value = '';
      }
    }
  }

  executeCommand(command) {
    this.addOutput(`$ ${command}`);
    
    const commands = {
      help: () => `Available commands:
- help: Show this help message
- clear: Clear the terminal
- echo [text]: Display text
- date: Show current date and time
- whoami: Display current user
- ls: List directory contents`,
      
      clear: () => {
        this.output.innerHTML = '';
        return '';
      },
      
      echo: (args) => args.join(' '),
      
      date: () => new Date().toString(),
      
      whoami: () => 'guest@terminal',
      
      ls: () => `Documents
Downloads
Pictures
Music
Videos`
    };

    const [cmd, ...args] = command.split(' ');
    
    if (commands[cmd]) {
      const output = commands[cmd](args);
      if (output) this.addOutput(output);
    } else {
      this.addOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
    }
  }

  addOutput(text, type = '') {
    const line = document.createElement('div');
    line.className = `output-line ${type}`;
    line.textContent = text;
    this.output.appendChild(line);
    this.output.scrollTop = this.output.scrollHeight;
  }
}

// Initialize the terminal
new Terminal();