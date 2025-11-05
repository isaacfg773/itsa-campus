import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatbotComponent } from '../../shared/chatbot/chatbot.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,ChatbotComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
