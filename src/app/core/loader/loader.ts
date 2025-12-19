import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div class="loader-container">
      <div class="spinner"></div>
      <p class="loader-text">Loading...</p>
    </div>
  `,
  styles: `
        .loader-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .spinner {
            width: 48px;
            height: 48px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .loader-text {
            margin: 0;
            color: #333;
            font-size: 0.875rem;
            font-weight: 500;
        }
    `,
})
export class Loader {}
