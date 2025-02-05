import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-desktopui',
  imports: [],
  templateUrl: './desktopui.component.html',
  styleUrl: './desktopui.component.scss'
})
export class DesktopuiComponent implements OnInit {

  // The computers selection
  computerChoice: string = '';
  // The users selection
  userChoice: string = '';
  // The number of wins and losses
  wins: number = 0;
  losses: number = 0;


  constructor() { }

  @HostListener('click')
  click() {
    console.log(event);
  }

  ngOnInit(): void {
  }
  
  // Function to clear the game result display
  clearResult(): void {
    const resultSpan = document.getElementById('gameresults')?.querySelector('span');
    if (resultSpan) {
      resultSpan.innerHTML = ''; // Clear any previous result
    }
    
  }


  rockEvent(event: Event){
    console.log('rock');
    event.preventDefault(); // Prevent page refresh
    // Clear previous games results from UI
    this.clearResult();
    // Get the users selection
    this.userChoice = 'rock';
    // Update the user's selection on the UI
    this.updateUserSelection('rock');
    // Get the computer's selection
    this.computerChoice = this.getComputerChoice();
    // Start computer selection animation
    this.animateComputerChoice();
  }



  paperEvent(event: MouseEvent){
    console.log('paper');
    event.preventDefault(); // Prevent page refresh
    // Clear previous games results from UI
    this.clearResult();
    // Get the users selection
    this.userChoice = 'paper';
    // Update the user's selection on the UI
    this.updateUserSelection('paper');
    // Start computer selection animation
    this.animateComputerChoice();
  }

  scissorEvent(event: MouseEvent){
    console.log('scissors');
    event.preventDefault(); // Prevent page refresh
    // Clear previous games results from UI
    this.clearResult();
    // Get the users selection
    this.userChoice = 'scissors';
    // Update the user's selection on the UI
    this.updateUserSelection('scissors');
    // Start computer selection animation
    this.animateComputerChoice();
  }

  // Function to update the user's selection on the UI
  updateUserSelection(choice: string): void {
    const selectionSpan = document.getElementById('selection')?.querySelector('span');
    if (selectionSpan) {
      let imgSrc = '';
      switch (choice) {
        case 'rock':
          imgSrc = '../../assets/img/rock-256.png';
          break;
        case 'paper':
          imgSrc = '../../assets/img/paper-256.png';
          break;
        case 'scissors':
          imgSrc = '../../assets/img/scissor-256.png';
          break;
      }
      selectionSpan.innerHTML = `<img src="${imgSrc}" alt="${choice}">`;
    }
    
  }



  // Function to get the computer's random choice (rock, paper, or scissors)
  getComputerChoice(): string {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  // Function to update the computer's choice on the UI
  updateComputerSelection(choice: string): void {
    const computerSpan = document.getElementById('aiselection')?.querySelector('span');
    if (computerSpan) {
      let imgSrc = '';
      switch (choice) {
        case 'rock':
          imgSrc = '../../assets/img/rock-256.png';
          break;
        case 'paper':
          imgSrc = '../../assets/img/paper-256.png';
          break;
        case 'scissors':
          imgSrc = '../../assets/img/scissor-256.png';
          break;
      }
      computerSpan.innerHTML = `<img src="${imgSrc}" alt="Computer's ${choice}">`;
    }
    
  }

   // Function to animate the computer's selection
   animateComputerChoice(): void {
    const computerSpan = document.getElementById('aiselection')?.querySelector('span');
    if (computerSpan) {
      let choices = ['rock', 'paper', 'scissors'];
      let counter = 0;

      // Interval to switch between choices
      const interval = setInterval(() => {
        const choice = choices[counter % 3]; // Loop through rock, paper, scissors
        let imgSrc = '';
        
        switch (choice) {
          case 'rock':
            imgSrc = '../../assets/img/rock-64.png';
            break;
          case 'paper':
            imgSrc = '../../assets/img/paper-64.png';
            break;
          case 'scissors':
            imgSrc = '../../assets/img/scissor-64.png';
            break;
        }

        computerSpan.innerHTML = `<img src="${imgSrc}" alt="Computer's ${choice}">`;

        // Increase the counter to switch to the next choice
        counter++;

        // After 3 seconds, stop the animation and make the final selection
        if (counter >= 20) { // 9 iterations will take 3 seconds (3 choices * 300ms)
          clearInterval(interval);
          this.computerChoice = this.getComputerChoice(); // Final selection
          this.updateComputerSelection(this.computerChoice);
          // Determine the winner and display results
          this.displayResult(); 
        }
      }, 100); // Change every 300ms
    }
  }

  // Function to calculate and display the result (win, lose, draw)
  displayResult(): void {
    const resultText = this.calculateResult();
    const resultSpan = document.getElementById('gameresults')?.querySelector('span');
    if (resultSpan) {
      resultSpan.innerHTML = resultText;
    }
    // Update the result log
    this.updateResultLog();
  }

  // Function to calculate the result of the game
  calculateResult(): string {
    if (this.userChoice === this.computerChoice) {
      return "It's a draw!";
    }
    if (
      (this.userChoice === 'rock' && this.computerChoice === 'scissors') ||
      (this.userChoice === 'paper' && this.computerChoice === 'rock') ||
      (this.userChoice === 'scissors' && this.computerChoice === 'paper')
    ) {
      this.wins++; // Increment win count
      return 'You win!';
    }
    this.losses++; // Increment loss count
    return 'You lose!';
  }

  // Update result log by appending images
  updateResultLog() {
    // Get the game results text element
    const resulttxt = document.getElementById('gameresults')?.querySelector('span');
    // Get the result log element
    const resultLog = document.getElementById('resultlog');
    // Create new image element for the result (green check or red check)
    const resultImage = document.createElement('img');
    // Check the game result text for match
    if (resulttxt?.textContent?.includes('win')) {
      // Set the image source based on the result
      resultImage.src = '../../assets/img/checked-32.png'; // Make sure this path is correct
      // Append the image to the result log
      resultLog?.appendChild(resultImage);
    } else if (resulttxt?.textContent?.includes('lose')) {
      // Set the image source based on the result
      resultImage.src = '../../assets/img/cross-32.png'; // Make sure this path is correct
      // Append the image to the result log
      resultLog?.appendChild(resultImage);
    }
  }


}
