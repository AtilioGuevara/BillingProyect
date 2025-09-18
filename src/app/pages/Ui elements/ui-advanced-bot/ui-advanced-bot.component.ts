import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ui-advanced-bot',
  imports: [
    PageTitleComponent,
    CommonModule,
    SimplebarAngularModule,
    LucideAngularModule,
    FormsModule,
  ],
  templateUrl: './ui-advanced-bot.component.html',
  styleUrls: ['./ui-advanced-bot.component.scss']
})
export class UiAdvancedBotComponent {
  messages = [{ from: 'bot', text: 'Hello! I am a Domiex chatbot. How can I assist you today?' }];
  messages1 = [{ from: 'bot', text: 'Hello! I am a Domiex chatbot. How can I assist you today?' }];
  messages2 = [{ from: 'bot', text: 'Hello! I am a Domiex chatbot. How can I assist you today?' }];
  messages3 = [{ from: 'bot', text: 'Hello! I am a Domiex chatbot. How can I assist you today?' }];

  prompts = [
    ["hi", "hey", "hello", "good morning", "good afternoon", "hy"],
    ["how are you", "how is life", "how are things"],
    ["what are you doing", "what is going on", "what is up"],
    ["how old are you"],
    ["who are you", "are you human", "are you bot", "are you human or bot"],
    ["who created you", "who made you"],
    ["your name please", "your name", "may i know your name", "what is your name", "what call yourself"],
    ["i love you"],
    ["happy", "good", "fun", "wonderful", "fantastic", "cool"],
    ["bad", "bored", "tired"],
    ["help me", "tell me story", "tell me joke"],
    ["ah", "yes", "ok", "okay", "nice"],
    ["bye", "good bye", "goodbye", "see you later"],
    ["what should i eat today"],
    ["bro"],
    ["what", "why", "how", "where", "when"],
    ["no", "not sure", "maybe", "no thanks"],
    [""],
    ["haha", "ha", "lol", "hehe", "funny", "joke"],
    ["flip a coin", "heads or tails", "tails or heads", "head or tails", "head or tail", "tail or heads", "tail or head"],
    ["beer", "buy me a beer", "want a beer"]
  ];

  replies = [
    ["Hello!", "Hi!", "Hey!", "Hi there!", "Howdy", "hey!"],
    ["Fine... how are you?", "Pretty well, how are you?", "Fantastic, how are you?"],
    ["Nothing much", "About to go to sleep", "Can you guess?", "I don't know actually"],
    ["I am infinite"],
    ["I am just a bot", "I am a bot. What are you?"],
    ["The one true God, JavaScript"],
    ["I am nameless", "I don't have a name"],
    ["I love you too", "Me too"],
    ["Have you ever felt bad?", "Glad to hear it"],
    ["Why?", "Why? You shouldn't!", "Try watching TV"],
    ["What about?", "Once upon a time..."],
    ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
    ["Bye", "Goodbye", "See you later"],
    ["Sushi", "Pizza"],
    ["Bro!"],
    ["Great question"],
    ["That's ok", "I understand", "What do you want to talk about?"],
    ["Please say something :("],
    ["Haha!", "Good one!"],
    ["Heads", "Tails"],
    ["You can buy me a beer at: <a href=\"https://www.buymeacoffee.com/scottwindon\" target=\"_blank\" style=\"text-decoration:underline;\">https://www.buymeacoffee.com/scottwindon</a>"]
  ];

  alternative = ["Try again", "I don't understand :/"];
  coronavirus = ["Please stay home", "Wear a mask", "Fortunately, I don't have COVID", "These are uncertain times"];

  botTyping1 = false;
  botTyping2 = false;
  botTyping3 = false;
  isChatboxVisible = false;
  botTyping = false;
  newMessage = '';

  updateChat(inputElement: HTMLInputElement) {
    const message = inputElement.value.toLowerCase().trim();
    if (message) {
      this.messages.push({ from: 'user', text: message });
      this.botTyping1 = true;

      // Simulate bot response delay
      setTimeout(() => {
        this.botTyping1 = false;
        const reply = this.getBotReply(message);
        this.messages.push({ from: 'bot', text: reply });
      }, 1000);
    }
    // Clear the input field
    inputElement.value = '';
  }

  getBotReply(message: string): string {
    for (let i = 0; i < this.prompts.length; i++) {
      if (this.prompts[i].some(prompt => message.includes(prompt))) {
        const repliesForPrompt = this.replies[i];
        return repliesForPrompt[Math.floor(Math.random() * repliesForPrompt.length)];
      }
    }
    return this.alternative[Math.floor(Math.random() * this.alternative.length)];
  }

  updateChat2(inputElement: HTMLInputElement) {
    const message = inputElement.value;
    if (message.trim()) {
      this.messages1.push({ from: 'user', text: message });
      this.botTyping2 = true;
      // Simulate bot response delay
      setTimeout(() => {
        this.botTyping2 = false;
        this.messages1.push({ from: 'bot', text: 'I am here to help!' });
      }, 1000);
    }
    // Clear the input field
    inputElement.value = '';
  }

  updateChat3(inputElement: HTMLInputElement) {
    const message = inputElement.value;
    if (message.trim()) {
      this.messages2.push({ from: 'user', text: message });
      this.botTyping3 = true;
      // Simulate bot response delay
      setTimeout(() => {
        this.botTyping3 = false;
        this.messages2.push({ from: 'bot', text: 'I am here to help!' });
      }, 1000);
    }
    // Clear the input field
    inputElement.value = '';
  }

  toggleChatbox() {
    this.isChatboxVisible = !this.isChatboxVisible;
  }

  simulateBotResponse() {
    this.botTyping = true;
    setTimeout(() => {
      this.messages3.push({
        from: 'bot',
        text: 'Thank you for your message. I am still learning!',
      });
      this.botTyping = false;
    }, 1000);
  }

  updateChatmodal() {
    if (this.newMessage.trim()) {
      this.messages3.push({ from: 'user', text: this.newMessage });
      this.newMessage = '';
      this.simulateBotResponse();
    }
  }
}
