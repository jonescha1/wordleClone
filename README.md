# wordleClone

My attempt at building the game wordle for a class project.

HOW THE GAME WORKS:
Upon loading the page, the game will fetch a random word from an API. After the random word has been fetched, the page will draw the 5 by 6 blocks on the page which will then begin the start of the game. The user has 6 attempts to guess the correct word. If the user does not enter in a 5 letter word, the window alert will pop up on top of the page notifying the user that they must enter in a 5 letter word. If the guessed word contains a letter that is in the correct word, they board will flip the block and change the color to either yellow(shows the letter is within the correct word but not in the right location) or green(the letter is within the correct word and in the correct position). After 6 attempts and the user does not guess the correct word, the page will overlay with a message which will show them what the correct word was and then timeout for 5 seconds before restarting the game. If the users guesses the correct word within the given amount of trys, the page will overlay with a message stating they won and then timeout for 5 seconds before restarting the game.

NOTE:
This project has been a great learning experience for me and I am well aware there are more efficient ways to go about creating this game. However, given the alotted timeframe as well as my current experience, I hope to dive back into this task in the future in order to complete it with no bugs as well as adding additional touches like keeping the current users score, giving the user the option to make the game easier or harder etc.

BUGS TO FIX: 1. The if the user enters in a word that has more than 2 of the same characters, the code will still execute and show BOTH of those characters as being in the correct word and if they are in the correct position. In other words, the code does not check to see how many duplicates of the same character are in the correct word. 2. The code does not check to see if the entered word IS a word or within the word list therefore allowing the user to enter random characters or even 5 of the same letters.
