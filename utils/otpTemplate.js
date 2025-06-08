export default function generateOtpEmailTemplate(otpCode, userEmail, userName) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <title>Your OTP Verification Code</title>
      <style>
          * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
          }
          
          body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: #1a1a1a;
              line-height: 1.6;
              padding: 20px 0;
              min-height: 100vh;
          }
          
          .email-wrapper {
              max-width: 600px;
              margin: 0 auto;
              background: rgba(255, 255, 255, 0.95);
              backdrop-filter: blur(10px);
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
              border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .email-header {
              background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%);
              padding: 40px 30px;
              text-align: center;
              position: relative;
              overflow: hidden;
          }
          
          .email-header::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
              animation: shimmer 3s ease-in-out infinite;
          }
          
          @keyframes shimmer {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(180deg); }
          }
          
          .security-icon {
              width: 80px;
              height: 80px;
              margin: 0 auto 20px;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              z-index: 2;
              animation: pulse 2s ease-in-out infinite;
          }
          
          @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
          }
          
          .security-icon svg {
              width: 40px;
              height: 40px;
              fill: white;
          }
          
          .email-header h1 {
              color: white;
              font-size: 28px;
              font-weight: 700;
              margin: 0;
              position: relative;
              z-index: 2;
              text-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .email-header p {
              color: rgba(255, 255, 255, 0.9);
              font-size: 16px;
              margin-top: 8px;
              font-weight: 400;
              position: relative;
              z-index: 2;
          }
          
          .email-body {
              padding: 40px 30px;
              background: white;
              text-align: center;
          }
          
          .greeting {
              font-size: 18px;
              color: #374151;
              margin-bottom: 25px;
              font-weight: 500;
          }
          
          .message {
              font-size: 16px;
              color: #6b7280;
              margin-bottom: 35px;
              line-height: 1.7;
          }
          
          .otp-container {
              margin: 30px 0;
              padding: 30px;
              background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
              border-radius: 20px;
              border: 2px solid #e5e7eb;
              position: relative;
              overflow: hidden;
          }
          
          .otp-container::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent);
              animation: slideGlow 3s ease-in-out infinite;
          }
          
          @keyframes slideGlow {
              0% { left: -100%; }
              50% { left: 100%; }
              100% { left: -100%; }
          }
          
          .otp-label {
              font-size: 14px;
              color: #6b7280;
              font-weight: 500;
              margin-bottom: 15px;
              text-transform: uppercase;
              letter-spacing: 1px;
          }
          
          .otp-code {
              font-size: 48px;
              font-weight: 800;
              letter-spacing: 12px;
              background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              display: inline-block;
              padding: 15px 25px;
              border-radius: 16px;
              background-color: white;
              border: 3px solid transparent;
              background-image: linear-gradient(white, white), linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
              background-origin: border-box;
              background-clip: padding-box, border-box;
              user-select: all;
              cursor: pointer;
              transition: all 0.3s ease;
              position: relative;
              z-index: 2;
          }
          
          .otp-code:hover {
              transform: scale(1.05);
              box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
          }
          
          .copy-instruction {
              font-size: 12px;
              color: #9ca3af;
              margin-top: 10px;
              font-style: italic;
          }
          
          .expiry-info {
              background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
              border: 1px solid #3b82f6;
              border-radius: 12px;
              padding: 20px;
              margin: 25px 0;
              text-align: center;
          }
          
          .expiry-info .time-left {
              font-size: 24px;
              font-weight: 700;
              color: #1d4ed8;
              margin-bottom: 5px;
          }
          
          .expiry-info .time-label {
              color: #3730a3;
              font-size: 14px;
              font-weight: 500;
          }
          
          .security-notice {
              background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
              border: 1px solid #f59e0b;
              border-radius: 12px;
              padding: 20px;
              margin: 25px 0;
              position: relative;
              text-align: left;
          }
          
          .security-notice::before {
              content: '🛡️';
              font-size: 20px;
              position: absolute;
              top: 20px;
              left: 20px;
          }
          
          .security-notice-content {
              margin-left: 35px;
          }
          
          .security-notice h3 {
              color: #92400e;
              font-size: 16px;
              font-weight: 600;
              margin-bottom: 8px;
          }
          
          .security-notice p {
              color: #b45309;
              font-size: 14px;
              margin: 0;
              line-height: 1.5;
          }
          
          .usage-steps {
              background: #f9fafb;
              border-radius: 12px;
              padding: 25px;
              margin: 25px 0;
              border-left: 4px solid #6366f1;
              text-align: left;
          }
          
          .usage-steps h3 {
              color: #374151;
              font-size: 16px;
              font-weight: 600;
              margin-bottom: 15px;
              display: flex;
              align-items: center;
          }
          
          .usage-steps h3::before {
              content: '📋';
              margin-right: 8px;
          }
          
          .steps-list {
              list-style: none;
              padding: 0;
          }
          
          .steps-list li {
              color: #6b7280;
              font-size: 14px;
              margin-bottom: 8px;
              padding-left: 25px;
              position: relative;
              line-height: 1.5;
          }
          
          .steps-list li::before {
              content: counter(step-counter);
              counter-increment: step-counter;
              position: absolute;
              left: 0;
              top: 0;
              background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
              color: white;
              width: 18px;
              height: 18px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 11px;
              font-weight: 600;
          }
          
          .steps-list {
              counter-reset: step-counter;
          }
          
          .email-footer {
              background: #f8fafc;
              padding: 30px;
              text-align: center;
              border-top: 1px solid #e5e7eb;
          }
          
          .footer-content {
              max-width: 400px;
              margin: 0 auto;
          }
          
          .company-info {
              margin-bottom: 20px;
          }
          
          .company-name {
              font-size: 18px;
              font-weight: 600;
              color: #374151;
              margin-bottom: 5px;
          }
          
          .company-tagline {
              font-size: 14px;
              color: #9ca3af;
          }
          
          .social-links {
              margin: 20px 0;
          }
          
          .social-links a {
              display: inline-block;
              margin: 0 10px;
              color: #6b7280;
              text-decoration: none;
              font-size: 14px;
              transition: color 0.3s ease;
          }
          
          .social-links a:hover {
              color: #6366f1;
          }
          
          .copyright {
              font-size: 12px;
              color: #9ca3af;
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
          }
          
          /* Mobile Responsiveness */
          @media only screen and (max-width: 600px) {
              body {
                  padding: 10px 0;
              }
              
              .email-wrapper {
                  margin: 0 10px;
                  border-radius: 16px;
              }
              
              .email-header {
                  padding: 30px 20px;
              }
              
              .email-header h1 {
                  font-size: 24px;
              }
              
              .security-icon {
                  width: 60px;
                  height: 60px;
              }
              
              .security-icon svg {
                  width: 30px;
                  height: 30px;
              }
              
              .email-body, .email-footer {
                  padding: 30px 20px;
              }
              
              .otp-container {
                  padding: 20px;
                  margin: 20px 0;
              }
              
              .otp-code {
                  font-size: 36px;
                  letter-spacing: 8px;
                  padding: 12px 20px;
              }
              
              .security-notice, .expiry-info, .usage-steps {
                  padding: 15px;
              }
              
              .security-notice-content {
                  margin-left: 30px;
              }
          }
          
          /* Dark mode support */
          @media (prefers-color-scheme: dark) {
              .email-body {
                  background: #1f2937;
                  color: #f9fafb;
              }
              
              .greeting {
                  color: #f3f4f6;
              }
              
              .message {
                  color: #d1d5db;
              }
              
              .otp-container {
                  background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
                  border-color: #6b7280;
              }
              
              .otp-code {
                  background-color: #1f2937;
                  background-image: linear-gradient(#1f2937, #1f2937), linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
              }
              
              .usage-steps {
                  background: #374151;
                  border-left-color: #8b5cf6;
              }
              
              .usage-steps h3 {
                  color: #f3f4f6;
              }
              
              .steps-list li {
                  color: #d1d5db;
              }
              
              .email-footer {
                  background: #111827;
                  border-top-color: #374151;
              }
              
              .company-name {
                  color: #f3f4f6;
              }
              
              .company-tagline, .copyright {
                  color: #9ca3af;
              }
          }
      </style>
  </head>
  <body>
      <div class="email-wrapper">
          <!-- Header Section -->
          <div class="email-header">
              <div class="security-icon">
                <div 
                    className="security-icon" 
                    style={{
                    width: '60px',
                    height: '60px',
                    margin: '0 auto',
                    borderRadius: '50%',
                    backgroundColor: '#0070f3',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '32px',
                    userSelect: 'none'
                    }}
                >
                    @
                </div>
              </div>
              <h1>Verification Code</h1>
              <p>Secure access authentication</p>
          </div>
          
          <!-- Body Section -->
          <div class="email-body">
              <div class="greeting">
                  Hello <strong>${userName}</strong>,
              </div>
              
              <div class="message">
                  We've generated a secure verification code for your account <strong>${userEmail}</strong>. Use this code to complete your login or registration process.
              </div>
              
              <!-- OTP Code Display -->
              <div class="otp-container">
                  <div class="otp-label">Your Verification Code</div>
                  <div class="otp-code">${otpCode}</div>
                  <div class="copy-instruction">Click to select and copy</div>
              </div>
              
              <!-- Expiry Information -->
              <div class="expiry-info">
                  <div class="time-left">5 Minutes</div>
                  <div class="time-label">Code expires in</div>
              </div>
              
              <!-- Usage Instructions -->
              <div class="usage-steps">
                  <h3>How to use this code</h3>
                  <ol class="steps-list">
                      <li>Return to the application or website</li>
                      <li>Enter the verification code above</li>
                      <li>Complete your authentication process</li>
                  </ol>
              </div>
              
              <!-- Security Notice -->
              <div class="security-notice">
                  <div class="security-notice-content">
                      <h3>Security Notice</h3>
                      <p>Never share this code with anyone. If you didn't request this verification, please ignore this email and ensure your account is secure.</p>
                  </div>
              </div>
          </div>
          
          <!-- Footer Section -->
          <div class="email-footer">
              <div class="footer-content">
                  <div class="company-info">
                      <div class="company-name">@MDEditor</div>
                      <div class="company-tagline">Empowering your digital experience</div>
                  </div>
                  
                  <div class="social-links">
                      <a href="#">Privacy Policy</a>
                      <a href="#">Terms of Service</a>
                      <a href="#">Contact Support</a>
                  </div>
                  
                  <div class="copyright">
                      &copy; ${new Date().getFullYear()} @MDEditor. All rights reserved.<br>
                      This email was sent to ${userEmail}
                  </div>
              </div>
          </div>
      </div>
  </body>
  </html>
      `;
}
